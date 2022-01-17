function handleQuery(req, res) {

    // extract input
    var body      = (req.body) ? req.body : {};
    var sql       = req.query.q || body.q; // HTTP GET and POST store in different vars
    var api_key   = req.query.api_key || body.api_key;
    var database  = req.query.database; // TODO: Depricate
    var limit     = parseInt(req.query.rows_per_page);
    var offset    = parseInt(req.query.page);
    var format    = req.query.format;
    var dp        = req.query.dp;

    // sanitize and apply defaults to input
    dp        = (dp       === "" || _.isUndefined(dp))       ? '6'  : dp;
    format    = (format   === "" || _.isUndefined(format))   ? null : format;
    sql       = (sql      === "" || _.isUndefined(sql))      ? null : sql;
    database  = (database === "" || _.isUndefined(database)) ? null : database;
    limit     = (_.isNumber(limit))  ? limit : null;
    offset    = (_.isNumber(offset)) ? offset * limit : null;

    // setup step run
    var start = new Date().getTime();

    try {
        if (!_.isString(sql)) throw new Error("You must indicate a sql query");

        // initialise MD5 key of sql for cache lookups
        var sql_md5 = generateMD5(sql);

        // placeholder for connection
        var pg;

        // 1. Get database from redis via the username stored in the host header subdomain
        // 2. Run the request through OAuth to get R/W user id if signed
        // 3. Get the list of tables affected by the query
        // 4. Run query with r/w or public user
        // 5. package results and send back
        Step(
            function getDatabaseName() {
                if (_.isNull(database)) {
                    Meta.getDatabase(req, this);
                } else {
                    // database hardcoded in query string (deprecated??): don't use redis
                    return database;
                }
            },
            function setDBGetUser(err, data) {
                if (err) throw err;

                database = (data === "" || _.isNull(data) || _.isUndefined(data)) ? database : data;

                // If the database could not be found, the user is non-existant
                if (_.isNull(database)) {
                    var msg = "Sorry, we can't find this CartoDB. Please check that you have entered the correct domain.";
                    err = new Error(msg);
                    err.http_status = 404;
                    throw err;
                }

                if(api_key) {
                    ApiKeyAuth.verifyRequest(req, this);
                } else {
                    oAuth.verifyRequest(req, this);
                }
            },
            function queryExplain(err, user_id){
                if (err) throw err;
                // store postgres connection
                pg = new PSQL(user_id, database, limit, offset);

                // get all the tables from Cache or SQL
                if (!_.isNull(tableCache[sql_md5]) && !_.isUndefined(tableCache[sql_md5])){
                   tableCache[sql_md5].hits++;
                   return true;
                } else{
                    pg.query("SELECT CDB_QueryTables($quotesql$" + sql + "$quotesql$)", this);
                }
            },
            function queryResult(err, result){
                if (err) throw err;

                // store explain result in local Cache
                if (_.isUndefined(tableCache[sql_md5])){
                    tableCache[sql_md5] = result;
                    tableCache[sql_md5].hits = 1; //initialise hit counter
                }

                // TODO: refactor formats to external object
                if (format === 'geojson'){
                    sql = ['SELECT *, ST_AsGeoJSON(the_geom,',dp,') as the_geom FROM (', sql, ') as foo'].join("");
                }

                pg.query(sql, this);
            },
            function setHeaders(err, result){
                if (err) throw err;

                // configure headers for geojson/CSV
                res.header("Content-Disposition", getContentDisposition(format));
                res.header("Content-Type", getContentType(format));

                // allow cross site post
                setCrossDomain(res);

                // set cache headers
                res.header('Last-Modified', new Date().toUTCString());
                res.header('Cache-Control', 'no-cache,max-age=3600,must-revalidate, public');
                res.header('X-Cache-Channel', generateCacheKey(database, tableCache[sql_md5]));

                return result;
            },
            function packageResults(err, result){
                if (err) throw err;

                // TODO: refactor formats to external object
                if (format === 'geojson'){
                    toGeoJSON(result, res, this);
                } else if (format === 'csv'){
                    toCSV(result, res, this);
                } else {
                    var end = new Date().getTime();

                    var json_result = {'time' : (end - start)/1000};

                    if (result.command === 'SELECT') {
                        json_result.total_rows = result.rows.length;
                        json_result.rows = result.rows;
                    } else {
                        json_result.total_rows = result.rowCount;
                    }
                    
                    return json_result;
                }
            },
            function sendResults(err, out){
                if (err) throw err;

                // return to browser
                res.send(out);
            },
            function errorHandle(err, result){
                handleException(err, res);
            }
        );
    } catch (err) {
        console.log('[ERROR]\n' + err);
        handleException(err, res);
    }
}