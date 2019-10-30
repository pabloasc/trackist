FROM golang:1.12

WORKDIR /go/src/app
COPY /server .

RUN go get -d -u github.com/gorilla/mux
RUN go get -d -u go.mongodb.org/mongo-driver/mongo

COPY /server/main.go .

EXPOSE 8080

# Add wait-for-it
COPY /server/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["/wait-for-it.sh mongo:27017"]
CMD ["--"]
CMD ["go run /go/src/app/main.go"]
