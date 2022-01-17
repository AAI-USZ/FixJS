function(name, args) {
  var util;
  if(name === 'http-response') {
    util = require('./HTTPResponseUtil');
    return new util.HTTPResponseUtil(args);
  } else if(name === 'http-request') {
    util = require('./HTTPRequestUtil');
    return new util.HTTPRequestUtil(args);
  } else if(name === 'mongo-factory') {
    util = require('./MongoFactory');
    return new util.MongoFactory(args);
  } else if(name === 'sitemap-factory') {
    util = require('./SitemapFactory');
    return new util.SitemapFactory(args);
  } else {
    throw "unkonwn util " + name;
  }
}