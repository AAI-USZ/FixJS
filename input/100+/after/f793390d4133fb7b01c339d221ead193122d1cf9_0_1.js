function() {
    var redis_pool = new RedisPool(global.environment.redis);


    var me = {
        user_metadata_db: 5,
        table_metadata_db: 0,
        user_key:  "rails:users:<%= username %>",
        map_key:   "rails:users:<%= username %>:map_key",
        table_key: "rails:<%= database_name %>:<%= table_name %>"
    };


    /**
     * Get the database name for this particular subdomain/username
     *
     * @param req - standard express req object. importantly contains host information
     * @param callback - gets called with args(err, dbname) 
     */
    me.getDatabase = function(req, callback) {
        // strip subdomain from header host
        var username = req.headers.host.split('.')[0]
        var redisKey = _.template(this.user_key, {username: username});

        this.retrieve(this.user_metadata_db, redisKey, 'database_name', function(err, dbname) {
          if ( err ) callback(err, null);
          else if ( dbname === null ) {
            callback(new Error("missing " + username + "'s dbname in redis (try CARTODB/script/restore_redis)"), null);
          }
          else callback(err, dbname);
        });
    };



    /**
     * Get the user id for this particular subdomain/username
     *
     * @param req - standard express req object. importantly contains host information
     * @param callback
     */
    me.getId= function(req, callback) {
        // strip subdomain from header host
        var username = req.headers.host.split('.')[0];
        var redisKey = _.template(this.user_key, {username: username});

        this.retrieve(this.user_metadata_db, redisKey, 'id', function(err, dbname) {
          if ( err ) callback(err, null);
          else if ( dbname === null ) {
            callback(new Error("missing " + username + "'s dbuser in redis (try CARTODB/script/restore_redis)"), null);
          }
          else callback(err, dbname);
        });
    };

    /**
     * Check the user map key for this particular subdomain/username
     *
     * @param req - standard express req object. importantly contains host information
     * @param callback
     */
    me.checkMapKey = function(req, callback) {
        // strip subdomain from header host
        var username = req.headers.host.split('.')[0];
        var redisKey = _.template(this.map_key, {username: username});
        this.inSet(this.user_metadata_db, redisKey, req.query.map_key, callback);
    };

    /**
     * Get privacy for cartodb table
     *
     * @param req - standard req object. Importantly contains table and host information
     * @param callback - is the table private or not?
     */
    me.authorize= function(req, callback) {
        var that = this;

        Step(
            function(){
                that.checkMapKey(req, this);
            },
            function checkIfInternal(err, check_result){
                if (err) throw new Error(err);
                if (check_result === 1) {
                    // authorized by key, login as db owner 
                    that.getId(req, function(err, user_id) {
                        if (err) throw new Error(err);
                        var dbuser = _.template(global.settings.postgres.db_user, {user_id: user_id});
                        _.extend(req.params, {dbuser:dbuser});
                        callback(err, true); 
                    });
                } else {
                    // log to db as unprivileged user
                    callback(err, true); 
                }
            }
        );
    };


    /**
     * Get the geometry type for this particular table;
     * @param req - standard req object. Importantly contains table and host information
     * @param callback
     */
    me.getGeometryType = function(req, callback){
        var that = this;

        Step(
            function(){
                that.getDatabase(req, this)
            },
            function(err, data){
                if (err) throw new Error(err);
                var redisKey = _.template(that.table_key, {database_name: data, table_name: req.params.table});

                that.retrieve(that.table_metadata_db, redisKey, 'the_geom_type', this);
            },
            function(err, data){
                if (err) throw new Error(err);
                callback(err, data);
            }
        );
    };


    me.getInfowindow = function(req, callback){
        var that = this;

        Step(
            function(){
                that.getDatabase(req, this);
            },
            function(err, data) {
                if (err) throw new Error(err);
                var redisKey = _.template(that.table_key, {database_name: data, table_name: req.params.table});
                that.retrieve(that.table_metadata_db, redisKey, 'infowindow', this);
            },
            function(err, data){
                if (err) throw new Error(err);
                callback(err, data);
            }
        );
    };


    me.getMapMetadata = function(req, callback){
        var that = this;

        Step(
            function(){
                that.getDatabase(req, this);
            },
            function(err, data) {
                if (err) throw new Error(err);
                var redisKey = _.template(that.table_key, {database_name: data, table_name: req.params.table});

                that.retrieve(that.table_metadata_db, redisKey, 'map_metadata', this);
            },
            function(err, data){
                if (err) throw new Error(err);
                callback(err, data);
            }
        );
    };

    // Redis Hash lookup
    // @param callback will be invoked with args (err, reply)
    //                 note that reply is null when the key is missing
    me.retrieve = function(db, redisKey, hashKey, callback) {
        this.redisCmd(db,'HGET',[redisKey, hashKey], callback);
    };

    // Redis Set member check
    me.inSet = function(db, setKey, member, callback) {
        this.redisCmd(db,'SISMEMBER',[setKey, member], callback);
    };

    /**
     * Use Redis
     *
     * @param db - redis database number
     * @param redisFunc - the redis function to execute
     * @param redisArgs - the arguments for the redis function in an array
     * @param callback - function to pass results too.
     */
    me.redisCmd = function(db, redisFunc, redisArgs, callback) {
        var redisClient;

        Step(
            function getRedisClient() {
                redis_pool.acquire(db, this);
            },
            function executeQuery(err, data) {
                if (err) throw new Error(err);
                redisClient = data;
                redisArgs.push(this);
                redisClient[redisFunc.toUpperCase()].apply(redisClient, redisArgs);
            },
            function releaseRedisClient(err, data) {
                if (err) throw new Error(err);
                redis_pool.release(db, redisClient);
                callback(err, data);
            }
        );
    };

    return me;
}