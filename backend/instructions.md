# docker image for mongodb
# This image inclues EXPOSE 27017
# so standard container linking will make it
# automatically avaliable to the linked containers
docker run -p 27017:27017 --name badbank -d mongo