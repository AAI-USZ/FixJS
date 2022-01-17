function compileHandler() {
    var worked = false
    	, outputs;
    	
    console.log('compile');

    try {
      outputs = $.hakadoo.validator.generateOutputs(question, you.getValue());
      socket.emit('compile', {outputs:outputs, worked:true});
    } catch(e) {
      $('#console').prepend('<li>' + e.name + ': ' + e.message + '</li>');
      socket.emit('compile', {
	      worked: false
	    });
    }    
  }