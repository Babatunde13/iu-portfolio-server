FROM node

WORKDIR /app

COPY package* /app/

RUN npm install

COPY . /app/

EXPOSE 5001

ENV PORT=5001


RUN npm run build

CMD ["node", "dist/src/index.js"]
