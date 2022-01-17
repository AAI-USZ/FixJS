function(raw_data) {
				var _key = VMM.Util.getUrlVars(raw_data)["key"];
				var _url = "https://spreadsheets.google.com/feeds/list/" + _key + "/od6/public/values?alt=json";

				if ( $.browser.msie && parseInt($.browser.version, 10) >= 8 && window.XDomainRequest) {
					// Use Microsoft XDR
					var xdr = new XDomainRequest();
					xdr.open("get", _url);
					xdr.onload = function() {
						var json = $.parseJSON( xdr.responseText );
						VMM.Timeline.DataObj.model_GoogleSpreadsheet.buildData( json );
					}
					xdr.send();
				} else {
					VMM.getJSON(_url, VMM.Timeline.DataObj.model_GoogleSpreadsheet.buildData);
				}
				
			}