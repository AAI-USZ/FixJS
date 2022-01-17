function queryCredDb(check) {
    console.log("checkPass value before queryCredDb call: " + check);
    
    client.query(
    'SELECT pass FROM ' + credTb + ' WHERE pass = SHA1(\'' + check + '\')',
    function selectCb(err, results, fields) {
      if(err) {
        throw err;
      }
      
      select = results[0].pass;
      
      console.log("queryCredDb results: " + select);
      
      if(select === results[0].pass)
      {
        console.log("all good");
        return true;
      }
      else
      {
        console.log("Username password combo incorrect");
        return false;
      }
    }
  );
}