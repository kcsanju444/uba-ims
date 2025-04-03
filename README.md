UBA IMS is a simple CLI tool for managing users. It allows you to create, list, update, and delete users stored in a users.json file. 

Steps to Run the File
1. Navigate to the project folder and install all necessary dependencies using npm.
2. 
        npm install
3. Running the Application
   
           node index.js
4. Available Features/Commands
   
  a. Create a new user
     
     uba-ims user:create --fname <FirstName> --lname <LastName>
     
  b. List all users
     
     uba-ims user:list
     
  c. Delete a user
     
     uba-ims user:delete --fname <FirstName> --all
     
  d. Update a user's information
     
     uba-ims user:update --fname <OldFirstName> --lname <OldLastName> --newfname <NewFirstName> --newlname <NewLastName>

