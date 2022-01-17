function(event) {
                        event.preventDefault(); 
                        var url = this.getProperty('href');
                        var updateElement = this.getChildren('span').get('html');
			updateElement = updateElement[0].toLowerCase();
			var c = new Element('div');

			// get Tabs parameters 
			if (this.getProperty('data-btn')) {
				var btnLabel= this.getProperty('data-btn');
				var btnClick= this.getProperty('data-bclick');
				var btnIcon= this.getProperty('data-bicon');
				var btn = new Element('span', {class:'float', html: '<a onclick="'+ btnClick +'" class="btn" href="#"><i class="'+ btnIcon +'"></i>'+ btnLabel +'</a>'});
				c.adopt(btn);

			}
			
			if (this.getProperty('data-actions')) {
				var action = this.getProperty('data-actions');
			}
                        	
			if (this.getProperty('data-id')) {
				var aid = this.getProperty('data-id');
			}
                        if (this.getProperty('data-cid')) {
				var acid = this.getProperty('data-cid');
			}
			if (this.getProperty('data-update')) {
				updateElement = this.getProperty('data-update');
			}
			if (this.getProperty('data-title')) {
				var title= new Element('h3', {'html': this.getProperty('data-title')});
				c.adopt(title);
			}

			if (url && this.getProperty('data-update')) {
                        var tab = new Request.JSON({
                                'url': url,
                                'onSuccess': function(resJSON, resText) {
			                var list = new CHTable({
                                                rows: resJSON,
						actions: action,
						id: aid,
						cid: acid
                                        });
					c.adopt(list);
                                        var ew = $(updateElement).empty().set('html', c.get('html'));
                                }
                        }).send();
                        } else if (url){
				window.location.replace(url);
			}
                }