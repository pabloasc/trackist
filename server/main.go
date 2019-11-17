package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"./router"
)

func main() {
	r := router.Router()
	// fs := http.FileServer(http.Dir("build"))
	// http.Handle("/", fs)
	port := os.Getenv("PORT") // Heroku provides the port to bind to

	if port == "" {
		port = "8080"
	}

	fmt.Println("Starting server on the port" + port);

	log.Fatal(http.ListenAndServe(":" + port, r))
}
