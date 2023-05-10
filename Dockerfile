FROM node:16 AS build-stage

WORKDIR /frontend
COPY frontend/. .

# You have to set this because it should be set during build time.
# ENV REACT_APP_BASE_URL="https://adventure--time.herokuapp.com/"
# ENV REACT_APP_BASE_URL="https://adventure-time-api-2.onrender.com/"

# Build our React App
RUN npm install
RUN npm run build

# Create app directory
# WORKDIR /usr/src/app
COPY package*.json ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

EXPOSE 8080

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/



RUN npm install

CMD [ "node", "server.js" ]