FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma generate
RUN npm run build

CMD ["node", "dist/server.js"]