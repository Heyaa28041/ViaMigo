# Stage 1: Build backend
FROM node:20-slim AS builder

WORKDIR /app

# Install system dependencies required for bcrypt (make, g++, python3)
RUN apt-get update && apt-get install -y python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Explicitly tell node-gyp where Python is
ENV PYTHON=/usr/bin/python3

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Run backend
FROM node:20-slim

WORKDIR /app

# Install minimal system dependencies again (for native modules like bcrypt)
RUN apt-get update && apt-get install -y python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHON=/usr/bin/python3

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000
CMD ["node", "dist/index.js"]
