FROM golang:1.12 AS build-env

WORKDIR /go/src/app
COPY / .

RUN go get -d -u github.com/gorilla/mux
RUN go get -d -u go.mongodb.org/mongo-driver/mongo

RUN cd /go/src/app && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/src/app/build

# EXPOSE 8080
# CMD ["go run /go/src/app/main.go"]

# final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=build-env /go/src/app/build /build
CMD ["./build"]
