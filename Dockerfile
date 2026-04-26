FROM node:18.19.1 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/todo-list-ui/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
