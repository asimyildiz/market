/* eslint-disable import/no-dynamic-require */
/**
 * json server implementation to work with multiple json files on same port
 * this acts like a middleware (json-server does not support working with multiple json files)
 * https://github.com/typicode/json-server/issues/45
 * https://github.com/mabihan/json-server-multiple-files (used as a boilerplate for the script below)
 */
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const jsonServer = require("json-server");

console.log("\n");

const port = 3002;
const endpoints = [];
const dbData = {};

// read json data into js objects from db folder
// and create endpoints for every json file inside db folder
const files = fs.readdirSync(path.resolve(`${__dirname}/db/`));
files.forEach((file) => {
  const ext = file.indexOf(".json");
  if (ext > -1) {
    endpoints.push(file.substring(0, ext));
    console.log(`🗒JSON file loaded : ${file}`);
    _.extend(dbData, require(path.resolve(`${__dirname}/db/${file}`)));
  }
});

// create endpoints and routes
const router = jsonServer.router(dbData);
const server = jsonServer.create();
// this endpoint will fetch tags
server.use("/tags", (req, res, next) => {
  const items = router.db.get("items").value();
  const tags = _.concat(items.map((item) => item.tags).flat(1));
  res.jsonp(_.countBy(tags));
  next();
});

// this endpoint will fetch itemTypes
server.use("/types", (req, res, next) => {
  const items = router.db.get("items").value();
  const types = _.union(items.map((item) => item.itemType));
  res.jsonp(types);
  next();
});
server.use(jsonServer.defaults());
server.use(router);

server.listen(port, () => {
  console.log(`\n⛴JSON Server is running at http://localhost:${port}`);
  endpoints.sort();
  endpoints.forEach((endpoint) => {
    console.info(`🥁Endpoint : http://localhost:${port}/${endpoint}`);
  });
});
