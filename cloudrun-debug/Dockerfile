FROM node:18-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY server.js /app/server.js

ENV NODE_ENV=production

CMD ["npm", "start"]
