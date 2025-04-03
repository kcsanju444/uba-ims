#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const usersFile = "users.json";

// Initialize the user file if it doesn't exist
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, "[]", "utf8");
}

// Load existing users
const loadUsers = () => JSON.parse(fs.readFileSync(usersFile, "utf8"));

// Save users to file
const saveUsers = (users) => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");

// Create user
program
  .command("user:create")
  .description("Create a new user")
  .requiredOption("--fname <Name>", "First Name")
  .requiredOption("--lname <Surname>", "Last Name")
  .action((options) => {
    const users = loadUsers();
    users.push({ fname: options.fname, lname: options.lname });
    saveUsers(users);
    console.log(`User ${options.fname} ${options.lname} created.`);
  });

// List all users
program
  .command("user:list")
  .description("List all users")
  .action(() => {
    const users = loadUsers();
    if (users.length === 0) {
      console.log("No users found.");
    } else {
      console.table(users);
    }
  });

// Delete user by first name
program
  .command("user:delete")
  .description("Delete a user by first name")
  .requiredOption("--fname <Name>", "First Name")
  .option("--all", "Delete all users with this first name")
  .action((options) => {
    let users = loadUsers();
    const originalCount = users.length;

    if (options.all) {
      users = users.filter(user => user.fname !== options.fname);
    } else {
      const index = users.findIndex(user => user.fname === options.fname);
      if (index !== -1) users.splice(index, 1);
    }

    if (users.length === originalCount) {
      console.log(`No user found with first name: ${options.fname}`);
    } else {
      saveUsers(users);
      console.log(`User(s) with first name '${options.fname}' deleted.`);
    }
  });

// Set up version and parsing
program.version("1.0.0").parse(process.argv);
