f
  "use strict";

  var isNode = typeof module !== "undefined" && module.exports,

      request,

      requestDefaults = {

        port : 5984,

        path : "/",

        method : "GET",

        headers : {

          "Content-Type" : "application/json"

        }

      };

  

  // Extend an object

  function extend(obj, base) {

    for (var name in base) {

      if (base.hasOwnProperty(name)) {

        if (typeof obj[name] === "object") {

          extend(obj[name], base[name]);

        } else if (typeof obj[name] === "undefined") {

          obj[name] = base[name];

        }

      }

    }

    return obj;

  }

  

  // Generate a Query string

  function queryString(params) {

    var query = "?", p;

    for (p in params) {

      if (params.hasOwnProperty(p)) {

        if (query.slice(-1) !== "?") {

          query += "&";

        }

        query += p + "=";

        switch (typeof params[p]) {

        case "number":

          query += params[p];

          break;

        case "string":

          query += "\"" + params[p] + "\"";

          break;

        case "boolean":

          query += params[p] ? "true" : "false";

          break;

        default:

          query += JSON.stringify(params[p]);

          break;

        }

      }

    }

    return query;

  }

  

  if (isNode) {



    //// NodeJS Setup ////

    var http = require("http"),

        sys  = require("sys");

    request = function (options) {

      extend(options, requestDefaults);

      

      // Make HTTP Request

      var req = http.request(options, function (res) {

        var body = "";

        res.setEncoding("utf8");

        

        // Recieve data and add it to the body

        res.on("data", function (chunk) {

          body += chunk;

        });

        

        // Finish recieving data and send it to the callback

        res.on("end", function () {

          if (body.slice(0, 1) === "{" || body.slice(0, 1) === "[") {

            // If the response is JSON, parse it

            options.callback(JSON.parse(body));

          } else {

            // Otherwise return the response text as is

            options.callback(body);

          }

        });

      });

      

      req.on("error", function (connectionException) {

        if (connectionException.errno === process.ECONNREFUSED) {

          sys.log('ECONNREFUSED: connection refused.');

        } else {

          sys.log(connectionException);

        }

      });



      

      if (options.data) {

        req.write(JSON.stringify(options.data));

      }

      req.end();

    };

    //// End of NodeJS Setup



  } else {



    //// Browser Setup ////

    if (typeof JSON === "undefined") {

      console.error("JSON is undefined, json2.js or equivalent needs to be loaded.");

    }



    request = function (options) {

      extend(options, requestDefaults);

      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

      

      // Build the URL

      var path = "http://";

      if (options.user && options.pass) {

        path += options.user + ":" + options.pass + "@";

      }

      path += options.host + options.path;

      

      // Open the XHR and set the Headers

      xhr.open(options.method, path, true);

      for (var header in options.headers) {

        xhr.setRequestHeader(header, options.headers[header]);

      }

      

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

          if (xhr.responseText.slice(0, 1) === "{" || xhr.responseText.slice(0, 1) === "[") {

            // If the response is JSON, parse it

            options.callback(JSON.parse(xhr.responseText));

          } else {

            // Otherwise return the response text as is

            options.callback(xhr.responseText);

          }

        }

      };

      

      if (options.data) {

        xhr.send(JSON.stringify(options.data));

      } else {

        xhr.send();

      }

    };

    //// End of Browser Setup ////



  }

  

  // Sofa Namespace

  var Sofa = {};

  

  //

  // Sofa Server Constructor

  //

  Sofa.Server = function (options) {

    if (options.host.slice(-1) === "/") {

      options.host = options.host.slice(0, options.host.length - 2);

    }

    if (isNode && options.user && options.pass) {

      options.headers = options.headers || {

        "Content-Type" : "application/json",

        "Authorization" : "Basic " + (new Buffer(options.user + ":" + options.pass)).toString("base64")

      };

    }

    this.options = options;

  };

  

  //

  // Get the CouchDB Server Status

  //

  Sofa.Server.prototype.status = function (cb) {

    request(extend({

      callback : cb

    }, this.options));

  };

  

  //

  // Generate UUIDs

  //

  Sofa.Server.prototype.uuids = function (num, cb) {

    if (num > 0) {

      request(extend({

        path : (num < 2) ? "/_uuids" : "/_uuids?count=" + num,

        callback : cb

      }, this.options));

    }

  };

  

  //

  // Shortcut for Server.uuids with the first parameter of 1

  //

  Sofa.Server.prototype.uuid = function (cb) {

    request(extend({

      path : "/_uuids",

      callback : function (res) {

        res.uuid = res.uuids[0];

        cb(res);

      }

    }, this.options));

  };

  

  //

  // Database Constructor

  //

  Sofa.Database = function (server, name) {

    this.server = server;

    this.name = name;

    this.path = "/" + this.name;

  };

  

  // Only create the next 3 methods in Node, for security reasons

  if (isNode) {

    //

    // Create a Database

    //

    Sofa.Database.prototype.create = function (cb) {

      request(extend({

        method : "PUT",

        path : this.path,

        callback : cb

      }, this.server.options));

    };

    

    //

    // Delete a Database

    //

    Sofa.Database.prototype.del = function (cb) {

      request(extend({

        method : "DELETE",

        path : this.path,

        callback : cb

      }, this.server.options));

    };

    

    //

    // Replicate a Database

    //

    Sofa.Database.prototype.replicate = function (trgt, cb) {

      request(extend({

        method : "POST",

        path : "/_replicate",

        data : {

          source : this.name,

          target : trgt

        },

        callback : cb

      }, this.server.options));

    };

  }

  

  //

  // Get all the Documents in the Database

  //

  Sofa.Database.prototype.all = function (cb) {

    request(extend({

      path : this.path + "/_all_docs",

      callback : cb

    }, this.server.options));

  };

  

  //

  // Get a Document

  //

  Sofa.Database.prototype.get = function (id, cb) {

    request(extend({

      path : this.path + "/" + id,

      callback : cb

    }, this.server.options));

  };

  

  //

  // Save a Document

  //

  Sofa.Database.prototype.save = function (doc, cb) {

    var m, p;

    if (doc._id) {

      m = "PUT";

      p = this.path + "/" + doc._id;

    } else {

      m = "POST";

      p = this.path;

    }

    request(extend({

      method : m,

      path : p,

      data : doc,

      callback : function (res) {

        doc._id = res.id;

        doc._rev = res.rev;

        cb(res);

      }

    }, this.server.options));

  };

  

  //

  // Execute a View

  //

  Sofa.Database.prototype.view = function (options) {

    var viewPath = this.path + "/_design/" + options.doc + "/_view/" + options.view;

    if (options.params) {

      viewPath += queryString(options.params);

    }

    request(extend({

      path : viewPath,

      callback : function (res) {

        options.callback(res.rows, res);

      }

    }, this.server.options));

  };

  

  //

  // Execute a Show

  //

  Sofa.Database.prototype.show = function (options) {

    var showPath = this.path + "/_design/" + options.doc + "/_show/" + options.show;

    if (options.id) {

      showPath += "/" + options.id;

    }

    if (options.params) {

      showPath += queryString(options.params);

    }

    request(extend({

      path : showPath,

      callback : options.callback

    }, this.server.options));

  };



  // Expose SofaJS

  if (isNode) {

    module.exports = Sofa;

  } else {

    window.Sofa = Sofa;

  }

  

}());
