function (batchData, callback) {
  log.debug('Database_Redis.batch()');

  var
    multiData = [];

  for ( var lp in batchData) {

    if (batchData.hasOwnProperty(lp)) {

      for ( var type in batchData[lp]) {

        if (batchData[lp].hasOwnProperty(type)) {

          for ( var lpp in batchData[lp][type]) {

            if (batchData[lp][type].hasOwnProperty(lpp)) {

              var row = [ type ], key = '', data = batchData[lp][type][lpp];

              switch (type) {
                //TODO
                case 'get':
                  key = this._createFieldKey(data[0], data[1], data[2]);
                  row.push(key);
                  break;
                case 'zscore':
                  key = this._createScoreSetNameKey(data[0]);
                  row.push(key);
                  row.push(data[1]);
                  break;
                case 'lrange':
                  key = this._createListNameKey(data[0]);
                  row.push(key);
                  row.push(data[1]);
                  row.push(data[2]);
                  break;
              }

              multiData.push(row);
            }
          }
        }
      }
    }
  }

  this.client.multi(multiData).exec(function (err, result) {

    if (err) {
      return callback(err, null);
    }

    var
      data = {};

    result.reverse(); //reverse order beacuse we use pop() array method

    for (var lp in batchData) {

      if (batchData.hasOwnProperty(lp)) {

        data[lp] = [];

        for (var type in batchData[lp]) {

          if (batchData[lp].hasOwnProperty(type)) {

            for (var lpp in batchData[lp][type]) {

              if (batchData[lp][type].hasOwnProperty(lpp)) {
                data[lp].push(result.pop());
              }
            }
          }
        }
      }
    }

    return callback(null, data);
  });
}