function () {
        console.log("Calipso version: ".green + app.about.version);
        console.log("Calipso configured for: ".green + (global.process.env.NODE_ENV || 'development') + " environment.".green);
        console.log("Calipso server listening on port: ".green + app.address().port);
      }