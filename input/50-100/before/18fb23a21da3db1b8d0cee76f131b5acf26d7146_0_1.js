function(full, script) {
      var flashvars = exports.stripFlashvars(script);
      if(!flashvars) return full;
      console.log(flashvars);
      flashvars.flvurl = flashvars.url_encoded_fmt_stream_map.url;
      // flashvars.flvurl = 'https://ssl.nowall.be' + utils.encodeSymboUrl(flashvars.flvurl);
      flashvars.vid = vid;
      flashvars.thumbnail = 'https://i3.ytimg.com/vi/' + vid + '/default.jpg';
      return template.render(player, flashvars);
  }