# Build image will be latest version of node
FROM node:latest

RUN echo "coucou" 

# Create app directory
WORKDIR /usr/src/app

COPY . .

# Run the command npm install 
RUN npm install

# Expose the port 8088
EXPOSE 8088

# Run the command npm start
CMD [ "npm", "start" ]

