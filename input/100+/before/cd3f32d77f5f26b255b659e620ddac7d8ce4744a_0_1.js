function(response) {
				if(typeof response !== "object") response = $.parseJSON(response);
				
				_this.enteredText = '';
			  $.each(response.wordlist, function(index, data) {
					_this.enteredText = _this.enteredText + data + ' ';
				});
				
				_this.processedText = _this.enteredText;
				_this.changeCase();
				_this.trimDiacritics();
				_this.insertNumbers();
				$('#wordlist').html(_this.processedText);
	    }