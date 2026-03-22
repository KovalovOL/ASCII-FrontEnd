FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS server
COPY --from=builder /app/dist /usr/share/nginx/html
ENV ASCII_API_URL="http://167.86.126.48:8080/pixelart"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  