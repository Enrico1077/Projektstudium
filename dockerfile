FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production


FROM nginx:alpine
COPY --from=build /app/dist/projektstudium /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]