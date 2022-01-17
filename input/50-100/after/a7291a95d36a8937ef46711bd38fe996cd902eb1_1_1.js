function(obj) {
		var meta =  jQuery.extend(true, {}, obj);                
		return {
                    Content: {title : meta.title},
                    Type: 'normal',
                    Author: this.author,
                    Meta: meta
                };
            }