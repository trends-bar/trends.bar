import {Cruncher} from "./assistants/cruncher-assistant";

const logger = require('eh_logger');
const globalConfig = require("eh_config");

import * as authController from "eh_auth_and_auth/controllers/authController";
import {gqlSchema} from "./graphql/schemas/graphql_master_schema"
import {gqlResolvers} from "./graphql/resolvers/resolvers";
import {MongoDataSourceExtended, TrendGraphDataSource} from "./graphql/datasources/datasources";
import {crawlingScriptModel, trendGraphsModel, trendLayoutModel, trendsModel} from "./models/models";

const usersModel = require("eh_auth_and_auth/models/user");
const usersRoute = require("eh_auth_and_auth/routes/usersRoute");
const tokenRoute = require("eh_auth_and_auth/routes/tokenRoute");

const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const {ApolloServer} = require('apollo-server-express');

const dbi = require("./db");
dbi.initDB();

const PORT = 4500;
const app = express();

const server = new ApolloServer(
  {
    typeDefs : gqlSchema,
    resolvers: gqlResolvers,
    dataSources: () => ({
      trends: new MongoDataSourceExtended(trendsModel),
      users: new MongoDataSourceExtended(usersModel),
      scripts: new MongoDataSourceExtended(crawlingScriptModel),
      trendGraphs: new TrendGraphDataSource(trendGraphsModel),
      trendLayouts: new MongoDataSourceExtended(trendLayoutModel)
    }),
    context: async ({req, connection}) => {
      if (connection) {
        return connection.context; // Subscription connection
      } else {
        try {
          const user = await authController.getUserFromRequest(req);
          return {user: user};
        } catch (ex) {
          logger.error("Reading of signed cookies failed because: ", ex);
          return {
            user: null
          };
        }
      }
    }
  }
);

authController.initializeAuthentication();

app.use(bodyParser.raw({limit: "500mb", type: 'application/octet-stream'}));
app.use(bodyParser.text({limit: "500mb"}));
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true}));
app.use(cookieParser(globalConfig.mJWTSecret));

server.applyMiddleware({app});
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.use("/", tokenRoute);
app.use("/user", usersRoute);

app.use(authController.authenticate);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
});
