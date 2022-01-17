function (msg, line, id) {
      var composedMsg = '';
      var fileName = id ? id.split('/') : null;
      // format the output message with filename, line number and message
      // weird gotcha: phantom only uses the first console.log argument it gets :(
      composedMsg = fileName ? fileName[fileName.length-1]+', ' : '';
      composedMsg = line ? line +': ' : '';
      composedMsg = msg;
      console.log(composedMsg);
    }