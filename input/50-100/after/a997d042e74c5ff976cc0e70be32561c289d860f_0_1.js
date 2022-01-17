function(i, key) {
			    var val = $("#filters :input[name=" + key + "]").val();
			    if (val) params[key] = val;
			}