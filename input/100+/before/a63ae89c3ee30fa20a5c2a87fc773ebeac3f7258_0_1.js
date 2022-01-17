function (responseObject, next) {
    responseObject.queryEntitiesResult = null;
    responseObject.queryEntitiesResultContinuation = null;
    if (!responseObject.error) {
      // Entities
      responseObject.queryEntitiesResult = [];

      var entries = [];
      if (responseObject.response.body.entry) {
        entries = responseObject.response.body.entry;
        if (!Array.isArray(entries)) {
          entries = [entries];
        }
      } else if (responseObject.response.body.content && responseObject.response.body.content['m:properties']) {
        entries = [responseObject.response.body];
      }

      //TODO this should probably be moved somewhere else since this is a "globally" default function
      var newEntity = function() {
        return {};
      };

      //TODO not the best check for function but for now will suffice
      if (options && options.entityFactoryFunction && typeof(options.entityFactoryFunction) === 'Function')
        newEntity = options.entityFactoryFunction;

      entries.forEach(function (currentEntry) {
        var newEntityInstance = newEntity();
        var tableEntry = EntityResult.parse(currentEntry, newEntityInstance);
        responseObject.queryEntitiesResult.push(tableEntry);
      });

      // Continuation iterator
      responseObject.queryEntitiesResultContinuation = QueryEntitiesResultContinuation.parse(self, tableQuery, responseObject.response);
    }

    var finalCallback = function (returnObject) {
      callback(returnObject.error, returnObject.queryEntitiesResult, returnObject.queryEntitiesResultContinuation, returnObject.response);
    };

    next(responseObject, finalCallback);
  }