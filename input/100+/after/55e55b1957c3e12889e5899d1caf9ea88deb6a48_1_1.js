function(sql, values, response, callback)
{
  console.log("UPDATE: " + sql);
  var pg = require('pg');
  var conString = "tcp://postgres:2b4bfcb57739@127.0.0.1:6543/template1";

  pg.connect(conString, function(err, client)
  {
		if (err !== null) {
      console.log("CONN ERROR: " + err);
			console.log(new Error().stack);
			callback = null;
			return;
		}
	 
    console.log("UPDATE connected");
    client.query(sql, values, function(err) {
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
        response.end();
    });
  });
}