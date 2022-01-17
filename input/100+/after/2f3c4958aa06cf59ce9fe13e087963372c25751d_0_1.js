function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var json = xmlhttp.responseText;
			// TODO: Better parsing
			json = eval ('(' + json + ')'); 
			var json_status = json.status;
			if(json_status == 'finished') {
				clearInterval(interval);
				clearTimeout(loading_bar);
				window.location = 'tree.pl?test_id=' + json.test_id;
			} else if(json_status == 'error') {
				clearInterval(interval);
				clearTimeout(loading_bar);
				var error = '<span style="color: red;">' + json.error_msg + '</span>';
				// Replace indicator with error
				document.getElementById('test').innerHTML = error;
			}
		}
  	}