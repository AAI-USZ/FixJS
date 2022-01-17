function( success ) {
			// see if we have latest in localStorage
			
			if(window.localStorage && window.JMVCDOC_TIMESTAMP){
				var json = window.localStorage["jmvcDoc"+JMVCDOC_TIMESTAMP]
				if(json){
					var data = $.parseJSON(json);
					this._data = data;
					success(data);
					var d =$.Deferred();
					d.resolve(data);
					Doc.dataDeferred.resolve()
					return d;
				} else {
					//clear everything that starts with jmvcDoc, try to remove the old data ...
					i = 0;
					while (i < localStorage.length) {
						var prop = localStorage.key(i);
						if (prop.indexOf("jmvcDoc") == 0) {
							localStorage.removeItem(prop)
						}
						else {
							i++;
						}
					}
				}
				
			}
			var d = $.ajax({
				url:  ( this.location || DOCS_LOCATION) + "searchData.json" ,
				success: this.proxy(['setData', success]),
				jsonpCallback: "C",
				dataType: "jsonp",
				cache: true
			})
			d.then(function(){
				Doc.dataDeferred.resolve()
			})
			return d;;
	
		}