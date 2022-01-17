function (properties, headers, progress) {
			
				var xhr = new XMLHttpRequest(), property;
				
				if(progress) this.add(xhr.upload, 'progress', progress);
				
				properties = Object[append]({error: this.failure, abort: this.failure}, properties);
				
				for(property in properties) if(properties.hasOwnProperty(property)) this.add(xhr, property, properties[property]);
				
				xhr.open('POST', this.options.base, true);
				xhr.setRequestHeader('Size', this.size);
				xhr.setRequestHeader('Filename', this.filename);
				xhr.setRequestHeader('Sender', 'XMLHttpRequest');
				
				if(headers != undef) for(property in headers) if(headers.hasOwnProperty(property)) xhr.setRequestHeader(property, headers[property]);
				
				return xhr
			}