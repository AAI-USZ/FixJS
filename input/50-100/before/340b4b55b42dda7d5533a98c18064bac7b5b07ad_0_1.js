function (msg, line, id) {
      var fileName = id.split('/');
      // format the output message with filename, line number and message
      // weird gotcha: phantom only uses the first console.log argument it gets :(
      console.log(fileName[fileName.length-1]+', '+ line +': '+ msg);
    }