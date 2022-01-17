function(buffer) {

    var pos, result;
    // TODO: Because Readable Streams do not guarantee flush one row by row, we should keep track of rows better
    var datas = buffer.toString().split("\n\r");

    for(var i in datas) {
      var data = datas[i]

      // check if video is uploading so script can start
      // calling the download progress function
      if (state === 'download' && (result = regex.exec(data))) {

        // if this is the first progress display, grab file size
        if (!size) {
          emitter.emit(state, {
              filename : filename
            , size     : size = result[2]
          });
        }

        if (result[3] !== '---b/s') {
          speed.push(toBytes(result[3].substring(0, result[3].length - 2)));
        }
        emitter.emit('progress', {
            percent : result[1]
          , speed   : result[3]
          , eta     : result[4]
        });

      // about to start downloading video
      } else if ((pos = data.indexOf('[download] ')) === 0) {
        state = 'download';
        filename = data.substring(24, data.length - 1);

      // check if this is any other state
      } else if ((pos = data.indexOf(']')) !== -1) {
        state = data.substring(pos + 2, data.length - 1);
        emitter.emit(state);
      }
    }
  }