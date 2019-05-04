# install node modules
FROM node:10.15.3 as install
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn install

# build
FROM install as build
RUN yarn build

# run
FROM keymetrics/pm2:latest-alpine
COPY --from=build /usr/src/app /src
COPY --from=build /usr/src/app/pm2.json .
EXPOSE 3000
CMD [ "pm2-runtime", "start", "pm2.json" ]