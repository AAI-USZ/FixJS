function ()
{
  log.debug('Database_Redis.construct()');

  //create
  this.client = redis.createClient(config.db.redis.port, config.db.redis.host);
  this.prefix = config.db.prefix;

  if (!this.client) {
    log.error('Database_Redis: Redis client null');
    throw new Error('Redis client null');
  }

  //auth
  if (config.db.redis.auth) {
    this.client.auth(config.db.redis.auth, function() {
      log.debug('Database_Redis: Redis client auth finished');
    });
  }

  //set error handling (when it is triggered?!)
  this.client.on("error", function (err) {
    log.error("Database_Redis: Redis Error: " + err);
//    console.log("Database_Redis: Redis Error: " + err);
  });

  this._saveObject = function (obj, callback) {
    log.debug('Database_Redis._saveObject()');

    if (!obj.getId()) {
      return callback(error(500, 'Trying to save with no id'), null);
    }

    var
      classname = obj.getClassName(),
      uniqValues = [],
      uniqKeys = obj.getUniqeKeys(),
      mset = ['mset'];    //TODO or HMSET??

    //iterate all preperties
    for (var k in obj) {
      if (obj.hasOwnProperty(k) && typeof(obj[k]) !== "function") {
        mset.push(this._createFieldKey(classname, obj.getId(), k));
        mset.push(obj[k]);
      }
    }

    //if uniq keys present then get uniq values from object
    if (uniqKeys.length > 0) {
      for (var k in uniqKeys) {
        if (obj.hasOwnProperty(uniqKeys[k])) {
          uniqValues.push(obj[uniqKeys[k]]);
        }
      }

      mset.push(this._createUniqKey(classname, uniqKeys, uniqValues));  //add key
      mset.push(obj.getId()); //add value
    }

    this.client.multi([mset]).exec(function (err, result) {
      return callback(err, obj); //call by hand beacuse in result will be OK string
    });
  };


  this._createUniqKey = function (classname, uniqKeys, uniqValues) {

    var
      uniq_key = this.prefix + ':' + classname + ':uniq';

    //iterate all preperties
    for (var lp in uniqKeys) {
      if (uniqKeys.hasOwnProperty(lp)) {
        uniq_key += util.format(':%s:%s', uniqKeys[lp], uniqValues[lp]);
      }
    }

    return uniq_key;
  };

  this._createFieldKey = function (classname, id, field) {
    return this.prefix + ':' + classname + ':' + id + ':' + field;
  };

  this._createSetNameKey = function (setName) {
    return this.prefix + ':' + setName;
  };

  this._createListNameKey = function (listName) {
    return this.prefix + ':' + listName;
  };

  this._createScoreSetNameKey = function (scoreSetName) {
    return this.prefix + ':' + scoreSetName;
  };

}