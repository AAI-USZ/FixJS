function(parts, data){
    if(_.isUndefined(data)){
      data = {};
    }

    var url = 'http://api.deezer.com/'+parts.join('/');
    return $.ajax({
      url:url,
      dataType:'jsonp',
      data:_.extend({}, data, {output:'jsonp'}),
      success:function(response){
        if(_.has(response, 'error')){
          console.log(['error!', response]);
        }
      }
    });
  }