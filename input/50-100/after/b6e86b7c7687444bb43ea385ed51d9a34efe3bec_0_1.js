function (cusers) {
  var usernames=[];
  for (var i = 0; i < cusers.length; i++){
    nowjs.hasClient(cusers[i], function (bool) { 
      if (bool) { 
        usernames.push(cusers[i]);
      } 
    });
  console.log(cusers.toString());
  }
  }