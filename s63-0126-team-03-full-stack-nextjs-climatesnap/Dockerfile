# Simple production-style Dockerfile for the Next.js app
# (single-stage, beginner-friendly)

FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Next.js app
RUN npm run build

EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
