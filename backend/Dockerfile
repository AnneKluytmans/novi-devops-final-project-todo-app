#-----------------------------------------------------------------------------------
# Stage 1: Build
#-----------------------------------------------------------------------------------
FROM node:20-alpine3.19 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


COPY . .

#-----------------------------------------------------------------------------------
# Stage 2: Runtime
#-----------------------------------------------------------------------------------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/src ./src

# Expose port
EXPOSE ${PORT:-3000}

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 -G nodejs
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-3000}/health || exit 1


CMD ["node", "src/server.js"]
