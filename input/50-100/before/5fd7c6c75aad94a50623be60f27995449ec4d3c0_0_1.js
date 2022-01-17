function(method, parameters){
    return $.ajax({
      url:'/api/v1/web/',
      type:'POST',
      contentType:'application/json',
      dataType:'json',
      data: JSON.stringify({
        "id":_.uniqueId(),
        "method":method,
        "params":parameters
      }),
      success:function(response){
        console.log(['api', response]);
      }
    });
  }