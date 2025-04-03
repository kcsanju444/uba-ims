#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const usersFile = "users.json";

if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, "[]", "utf8");
}

const loadUsers = () => JSON.parse(fs.readFileSync(usersFile, "utf8"));

const saveUsers = (users) => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");

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

program
  .command("user:delete")
  .description("Delete a user by first name")
  .requiredOption("--fname <Name>", "First Name")
  .option("--all", "Delete all users with this first name")
  .action((options) => {
    let users = loadUsers();
    const originalCount = users.length;

    if (options.all) {
      users = users.filter(user => user.fname.toLowerCase() !== options.fname.toLowerCase());
    } else {
      const index = users.findIndex(user => user.fname.toLowerCase() === options.fname.toLowerCase());
      if (index !== -1) users.splice(index, 1);
    }

    if (users.length === originalCount) {
      console.log(`No user found with first name: ${options.fname}`);
    } else {
      saveUsers(users);
      console.log(`User(s) with first name '${options.fname}' deleted.`);
    }
  });

program
  .command("user:update")
  .description("Update a user's details by first name")
  .requiredOption("--fname <Name>", "Existing First Name")
  .option("--newFname <NewName>", "New First Name")
  .option("--newLname <NewSurname>", "New Last Name")
  .action((options) => {
    let users = loadUsers();
    const index = users.findIndex(user => user.fname.toLowerCase() === options.fname.toLowerCase());

    if (index === -1) {
      console.log(`No user found with first name: ${options.fname}`);
      return;
    }

    if (options.newFname) users[index].fname = options.newFname;
    if (options.newLname) users[index].lname = options.newLname;

    saveUsers(users);
    console.log(`User updated: ${users[index].fname} ${users[index].lname}`);
  });

program.version("1.0.0");

program.parse(process.argv);
