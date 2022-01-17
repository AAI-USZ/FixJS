function(chunk) {
    if (chunk) {
      if ("" != partial) {
        chunk = partial + chunk;
        partial = "";
      }
    }

    var pos, result;
    var str = chunk.toString();
    // Bit hack, some rows are prepended with \r and some are appended with \n
    str = str.replace(/\r/g, "\n");
    var datas = str.split("\n");
    if (!str.match(/\n?$/)) {
      partial += datas.pop();
    }

    for (var i in datas) {
      var data = datas[i];
      if(data.length == 0) continue; // Drop empty lines, no need to process

      // check if video is uploading so script can start
      // calling the download progress function, if filename is set
      if (filename && state === 'download' && (result = regex.exec(data))) {

        // if this is the first progress display, grab file size
        if (!size) {
          emitter.emit(state, {
            filename:filename, size:size = result[2]
          });
        }

        if (result[3] !== '---b/s') {
          speed.push(toBytes(result[3].substring(0, result[3].length -2 )));
        }
        emitter.emit('progress', {
          percent:result[1], speed:result[3], eta:result[4]
        });

        // about to start downloading video, only in beginning
      } else if (!filename && (pos = data.indexOf('[download] Destination:')) === 0) {
        state = 'download';
        filename = data.substring(24, data.length);

        // check if this is any other state
      } else if ((pos = data.indexOf(']')) !== -1) {
        state = data.substring(pos + 2, data.length);
        emitter.emit(state);
      }
    }
  }