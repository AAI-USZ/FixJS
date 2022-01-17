function(el) {
			var url = el.getProperty('href');
                        var updateElement = el.getChildren('span').get('html');
			updateElement = updateElement[0].toLowerCase();
			var c = new Element('div');

			// get Tabs parameters 
			if (el.getProperty('data-btn')) {
				var btnLabel= el.getProperty('data-btn');
				var btnClick= el.getProperty('data-bclick');
				var btnIcon= el.getProperty('data-bicon');
				var btn = new Element('span', {class:'float', html: '<a onclick="'+ btnClick +'" class="btn" href="#"><i class="'+ btnIcon +'"></i>'+ btnLabel +'</a>'});
				c.adopt(btn);

			}
			
			if (el.getProperty('data-actions')) {
				var action = el.getProperty('data-actions');
			}
                        	
			if (el.getProperty('data-id')) {
				var aid = el.getProperty('data-id');
			}
                        if (el.getProperty('data-cid')) {
				var acid = el.getProperty('data-cid');
			}
			if (el.getProperty('data-update')) {
				updateElement = el.getProperty('data-update');
			}
			if (el.getProperty('data-title')) {
				var title= new Element('h3', {'html': el.getProperty('data-title')});
				c.adopt(title);
			}

			if (url && el.getProperty('data-update')) {
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
			}

		}