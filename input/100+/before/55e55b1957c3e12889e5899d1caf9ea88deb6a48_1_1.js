function(sql, response, callback)
{
  console.log("UPDATE: " + sql);
  var pg = require('pg').native;
  var conString = "<insert connection string here>";

  var client = new pg.Client(conString);
  client.connect();

  pg.connect(conString, function(err, client)
  {
		if (err !== null) {
      console.log("CONN ERROR: " + err);
			console.log(new Error().stack);
			callback = null;
			return;
		}
	 
    console.log("UPDATE connected");
    client.query(sql, function(err) {
 			if (err !== null) {
				console.log("QUERY ERROR: " + err);
			  console.log(new Error().stack);
			  callback = null;
			}
      
		  if (callback !== undefined && callback !== null) {
        console.log("UPDATE callback");
        callback(response);
      } 
		  
      console.log("UPDATE finished");
			if (callback !== null)
        response.end();
    });
  });
}