function(){
  "use strict";

  var routes = {
    root    : require("./Root.js"),
    menu    : require("./Menu.js"),
    event   : require("./Event.js"),
    dwolla  : require("./Dwolla.js"),
    meetup  : require("./Meetup.js"),
    setupEvent: require("./SetupEvent"),
    pay     : require("./Pay.js"),
    placeOrder : require("./PlaceOrder.js"),
    placeConfirmedOrder: require("./PlaceConfirmedOrder")
  };

  var routeList = [
    ["/",                      routes.root,           ["get"]],
    ["/order/:eid",            routes.menu,           ["get",  "post"]],
    ["/pay",                   routes.pay,            ['get',  "post"]],
    ["/menu/:rid/event/:eid",  routes.setupEvent,     ["get",  "post"]],
    ["/event/:eid",            routes.event,          ["get"]],
    ["/dwolla",                routes.dwolla,         ["get"]],
    ["/meetup",                routes.meetup,         ["get"]],
    ["/placeorder/:eid",       routes.placeOrder,     ["get"]],
    ["/placeorder/:eid/confirmed", routes.placeConfirmedOrder, ["get", "post"]]
  ];

  exports.list = routeList;
}