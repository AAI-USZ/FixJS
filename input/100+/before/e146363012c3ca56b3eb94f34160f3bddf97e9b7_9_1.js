function (url)
{
  log.debug('Video_Vimeo.construct()');

  Video.call(this); //call parent constructor

  var
    matches = [];


 
  //make "classic site" link
  if (matches = url.match(/http\:\/\/vimeo\.com\/m\/(.+)\/?/i)) {
    url = util.format('http://vimeo.com/%s', matches[1]); 
  }
  
  //get video id
  if (matches = url.match(/http\:\/\/vimeo\.com\/(.+)\/?/i)) {
    this.__url = url;
    this.__videoId = matches[1];
  }

  this.getThumbUrl = function (callback) {
    
    if (this.__videoId) {      
      vimeoApi(this.__videoId, function(err, data) {

        if (err) {
          return callback(err, null);
        }

        return callback(null, data.thumb.m);  //medium
      });
    }
    else {
      return callback(null, '');  
    }
  };

}