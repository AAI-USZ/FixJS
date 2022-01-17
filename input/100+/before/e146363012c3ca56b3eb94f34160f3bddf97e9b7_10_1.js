function (url)
{
  log.debug('Video_Youtube.construct()');

  Video.call(this); //call parent constructor

  var
    matches = [];

  console.log(url);
  
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
  else {
    console.log('invalid: ' + url);
  }

  this.getThumbUrl = function (callback) {
    if (this.__videoId) {
      return callback(null, util.format('http://img.youtube.com/vi/%s/hqdefault.jpg', this.__videoId));
    }
    else {
      return callback(null, '');  
    }
  };

}