function (options) {
    options = options || {};
    connect.session.Store.call(this, options);

    var config = app.config.get('db');
    config.database = config.database + '-sessions';

    app.m.Session = resourceful.define('session', function () {
      this.use('couchdb', config);

      this.object('data');

      this.filter('expires', {
        map: function (doc) {
          if (doc.resource == 'Session') {
            emit(doc.data.cookie.expires, {id: doc._id });
          }
        }
      });
    });

    var that = this;
    that.db = app.m.Session.connection.connection;

    that.db.exists(function (err, exists) {
      if (!exists) {
        that.db.create(function () {
          that.db.query({ method: 'PUT', path: '_revs_limit', body: 5 }, function (){});
        });
      } else {
        that.db.query({ method: 'PUT', path: '_revs_limit', body: 5 }, function (){});
      }
    });

    this._compact = setInterval(this.compact, 300000, this);
    this._reap = setInterval(this.reap, 86400000, this);
  }