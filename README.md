**Server: Golang  
Client: React, semantic-ui-react  
Database: Local MongoDB**

# Application Requirement

### golang server requirement

1. golang https://golang.org/dl/
2. gorilla/mux library for router `go get -u github.com/gorilla/mux`
3. mongo-driver library to connect with mongoDB `go get go.mongodb.org/mongo-driver`

### react client

From the Application directory

`create-react-app client`

# Start the application

1. Make sure your mongoDB is started
2. From server directory, open a terminal and run
   `go run main.go`
3. From client directory,  
   a. install all the dependencies using `npm install`  
   b. start client `npm start`

# Walk through the application

Open application at http://localhost:3000
