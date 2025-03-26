# Use Node.js LTS as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using npm
RUN npm ci

# Copy the entire project to the container
COPY . .

# Expose the Vite development port
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]