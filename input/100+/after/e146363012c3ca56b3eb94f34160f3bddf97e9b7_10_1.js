function (url)
{
  log.debug('Video_Youtube.construct()');

  Video.call(this); //call parent constructor

  var
    matches = [];

  //make "classic site" link
  if (matches = url.match(/(https?)\:\/\/m\.youtube\.com\/.*v=(.+)&?/i)) {
    url = util.format('http://www.youtube.com/watch?v=%s', matches[2]);
  }
  
  if (matches = url.match(/http\:\/\/www\.youtube\.com\/watch\?.*v=(.+)&?/i)) {
    this.__url = url;
    
    //get video id
    if (matches = this.__url.match(/http\:\/\/www\.youtube\.com\/.*v=(.+)&?/i)) {
      this.__videoId = matches[1];
    }
  }

  this.getThumbUrl = function (callback) {
    
    if (this.__videoId) {      
      Video_Youtube_Api.video(this.__videoId, function(err, videoInfo) {
        if (err || !videoInfo) {
          return callback(err, null);  
        }

        return callback(null, videoInfo.getThumbUrl());
      });
    }
    else {
      return callback(null, '');  
    }
  };

}