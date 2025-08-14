FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port (Railway will override)
EXPOSE 5000

# Start command
CMD ["npm", "start"]
