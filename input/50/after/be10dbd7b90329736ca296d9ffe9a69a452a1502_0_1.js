function(){
		var message = {message: $('react_message').value};
		if(message.message.strip() !== ''){
			this.request(this.postMessageUrl, message);
		}
			
	}