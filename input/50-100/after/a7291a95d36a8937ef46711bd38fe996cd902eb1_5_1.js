function(obj) {
		var meta =  jQuery.extend(true, {}, obj);
		return {
                    Content: {placeholder : 'placeholder'},
                    Type: 'normal',
                    Author: this.author,
                    Meta: meta
                };
            }