#-----------------------------------------------------------------------------------
# Stage 1: Build
#-----------------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

#-----------------------------------------------------------------------------------
# Stage 2: Runtime
#-----------------------------------------------------------------------------------
FROM nginx:stable-alpine

# Delete default config and add custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]