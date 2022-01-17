function(parts, data){
    if(_.isUndefined(data)){
      data = {};
    }

    var url = 'http://api.deezer.com/'+parts.join('/');
    return $.ajax({
      url:url,
      dataType:'jsonp',
      data:_.extend({}, data, {output:'jsonp'})
    });
  }