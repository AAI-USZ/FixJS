function(title) {
				if(!title && title !== '') title = strings.fieldTitle;
				
				this.find('.treedropdownfield-title').val(title);
			}