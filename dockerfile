FROM node:latest AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:latest
COPY --from=builder /app/dist/projektstudium /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]