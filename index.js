// Generated by CoffeeScript 2.6.1
(function() {
  var app, attachSCIFunctions, bodyParser, express, listenForRequests, mountMiddleWare, port, routes;

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  //###########################################################
  require('systemd');

  express = require('express');

  bodyParser = require('body-parser');

  //###########################################################
  //region internalProperties
  routes = null;

  port = null;

  //###########################################################
  app = express();

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(bodyParser.json());

  //endregion

  //################################################################
  mountMiddleWare = function(middleWare) {
    var fun, i, len;
    if (typeof middleWare === "function") {
      app.use(middleWare);
      return;
    }
    if (middleWare.length != null) {
      for (i = 0, len = middleWare.length; i < len; i++) {
        fun = middleWare[i];
        app.use(fun);
      }
      return;
    }
  };

  //###########################################################
  attachSCIFunctions = function() {
    var fun, route;
    for (route in routes) {
      fun = routes[route];
      app.post("/" + route, fun);
    }
  };

  //################################################################
  listenForRequests = function() {
    if (process.env.SOCKETMODE) {
      app.listen("systemd");
    } else {
      app.listen(port);
    }
  };

  //###########################################################
  exports.prepareAndExpose = function(middleWare, leRoutes, lePort = 3333) {
    if (typeof leRoutes !== "object") {
      throw new Error("No routes Object provided!");
    }
    routes = leRoutes;
    port = process.env.PORT || lePort;
    if (middleWare != null) {
      mountMiddleWare(middleWare);
    }
    attachSCIFunctions();
    listenForRequests();
  };

}).call(this);
