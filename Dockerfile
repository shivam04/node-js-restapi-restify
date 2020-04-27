FROM node:12
# Create app directory
RUN mkdir -p /usr/src/rest-api-mongo-app

WORKDIR /usr/src/rest-api-mongo-app
# Install app dependencies
COPY package.json /usr/src/rest-api-mongo-app

RUN npm install
# Copy app source code
COPY . /usr/src/rest-api-mongo-app
#Expose port and start application
EXPOSE 3000

CMD [ "npm", "start" ]
