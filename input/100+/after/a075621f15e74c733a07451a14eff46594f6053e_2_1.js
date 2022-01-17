function(req, db, id, callback) {
    var key = getHashKey(req);
    callback = callback || utils.noop;
    id = String(id);

    // set up the request to remove child scaffolds
    var childReq = req;
    var singularName = name.substring(0, name.length - 1);

    if (!childReq.params) {
        childReq.params = {};
    }

    // set up the id of the current object being removed for access by child
    // scaffolds
    childReq.params[singularName + 'Id'] = id;

    // statistics for determining when deletion is complete
    var objectsRemoved = 0;
    var numChildrenProcessed = 0;
    var numObjects = 0;

    // remove handler for deleting child scaffold objects
    function removeHandler(err) {
      if (err) {
        callback(err);
      } else {
        objectsRemoved++;
        if (numChildrenProcessed === children.length && 
            objectsRemoved === numObjects) {
          crud.remove(key, id, db, function(err, status) {
            callback(err);
          });
        }
      }
    }

    // if there is nothing to remove, immediately call the remove handler
    if (children.length === 0) {
      // set to one so that the handler thinks it has removed all objects
      numObjects = 1;
      removeHandler(null);
    }

    // remove objects in child scaffolds that correspond to this object
    children.forEach(function(childName) {
      var childScaffold = require('./' + childName);

      // key is in the form project:screen:components; want to get it in
      // the form project:screen:component:elements
      var childKey = key.substr(0, key.length - 1);
      childKey += ':' + id + ':' + childName;

      db.hlen(childKey, function(err, length) {
        numObjects += length;
        numChildrenProcessed++;

        // there are no children to remove
        if (numChildrenProcessed === children.length && numObjects === 0) {
          numObjects = 1;
          removeHandler(null);
        }

        if (err) {
          callback(err);
        } else {
          for (var i = 1; i <= length; i++) {
            childScaffold.remove(childReq, db, i, removeHandler);
          }
        }
      });
    });
  }