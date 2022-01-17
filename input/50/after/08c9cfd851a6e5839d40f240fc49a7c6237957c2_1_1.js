function(domMessage, structuredError) {
	this.message = domMessage.textContent || domMessage.innerText;
	this.domMessage = domMessage;
	this.structuredError = JSON.parse(structuredError);
    }