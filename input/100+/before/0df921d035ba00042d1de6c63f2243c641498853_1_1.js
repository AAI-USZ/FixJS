function(raw_data) {
				//https://spreadsheets.google.com/feeds/list/0Agl_Dv6iEbDadGRwZjJSRTR4RHJpanE2U3lkb0lyYUE/od6/public/values?alt=json
				// https://docs.google.com/a/digitalartwork.net/spreadsheet/ccc?hl=en_US&key=0Agl_Dv6iEbDadGRwZjJSRTR4RHJpanE2U3lkb0lyYUE&rm=full#gid=0
				var _key = VMM.Util.getUrlVars(raw_data)["key"];
				var _url = "https://spreadsheets.google.com/feeds/list/" + _key + "/od6/public/values?alt=json";
				
				VMM.getJSON(_url, VMM.Timeline.DataObj.model_GoogleSpreadsheet.buildData);
				
			}