# Stage 1: Build Angular app
FROM node:14 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Deploy to NGINX
FROM nginx:1.21-alpine
COPY --from=builder /app/dist/igfront /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
