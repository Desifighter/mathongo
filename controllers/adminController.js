import fs from "fs";
import csv from "csv-parser";
import User from "../models/userModel.js";
import listModel from "../models/listModel.js";

export const getUsers = async (req,res)=>{
  try {
    const {listid} = req.params; 
    const getUsers = await User.find({ list :listid});

    res.json({
      success: true,
      getUsers,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const getList = async (req,res)=>{
  try {
    
    const list = await listModel.find({admin:req.user._id});

    res.json({
      success: true,
      list
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const addUsersFromCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const results = [];
    const errors = [];
    const { listId } = req.body;
    console.log(listId);

    // Find the list by ID
    const list = await listModel.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Parse CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        const addedUsers = [];
        const existingUsers = await User.find({ list: listId }).select(
          "email name"
        );
        console.log(existingUsers);

        for (const user of results) {
          console.log(user);

          const existingUser = existingUsers.find(
            (u) => u.email === user.email
          );

          if (existingUser) {
            errors.push({ user, error: "Email already exists" });
            continue;
          }
          if (!user.name) {
            errors.push({ user, error: "Name is not available" });
            continue;
          }

          const customProperties = Object.keys(user)
            .filter((key) => key !== "name" && key !== "email" && user[key] !=="")
            .map((key) => ({
              title: key,
              fallbackValue:
                user[key] ||
                list.customProperties.find((prop) => prop.title === key)
                  ?.fallbackValue ||
                "none",
            }));

          console.log(customProperties);

          const newUser = new User({
            name: user.name,
            email: user.email,
            customProperties: customProperties,
            list: listId, // Correct field assignment
            subscribe: true,
          });

          try {
            const savedUser = await newUser.save();
            addedUsers.push(savedUser);
          } catch (err) {
            errors.push({ user, error: err.message });
          }
        }

        fs.unlinkSync(req.file.path); // Delete file after processing

        res.json({
          success: true,
          addedUsersCount: addedUsers.length,
          errorsCount: errors.length,
          errors,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const addList = async (req, res) => {
  try {
    const { title, customProperties } = req.body;

    // Validate input
    if (!title || !Array.isArray(customProperties)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // create sample user
    console.log(req.user._id);
    console.log(customProperties);

    // Create and save the new list
    const newList = new listModel({
      title,
      customProperties,
      admin: req.user._id,
    });
    const savedList = await newList.save();

    // Update the admin document by pushing the new list's ID

    // Return the created list
    res.status(201).json(savedList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
