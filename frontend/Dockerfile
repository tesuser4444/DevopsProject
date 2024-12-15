# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app

# Expose the app on port 3000
EXPOSE 8080

# Run the React app
CMD ["npm", "run", "dev", "--", "--host"]
