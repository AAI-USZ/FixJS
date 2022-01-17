function(domMessage) {
	this.message = domMessage.textContent || domMessage.innerText;
	this.domMessage = domMessage;
    }