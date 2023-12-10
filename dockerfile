# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to /app
COPY package.json yarn.lock ./

# Install app dependencies using Yarn
RUN yarn install --production

# Copy the current directory contents to /app
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["yarn", "start"]
