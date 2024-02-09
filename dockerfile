FROM node:latest AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod


FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/projektstudium /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]