FROM node:14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . ./
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]