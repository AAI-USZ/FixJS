function(full, script) {
      var flashvars = exports.stripFlashvars(script);
      if(!flashvars) return full;
      // console.log(flashvars);
      flashvars.flvurl = flashvars.url_encoded_fmt_stream_map.url;
      return template.render(player, flashvars);
  }