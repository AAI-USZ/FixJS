function() {
		if (request.readyState == 4) {
			var response = JSON.parse(request.responseText);
            var tools = "";
            var date = $('#date').val();
            console.log(request.responseText);

            if(response['tools'] == "") {
                tools = "No tools on " + date + ".";
            } else {
                $('#caption').html("Tools on " + date + ":");
                tools = "<br><table><tr><th>Name</th><th>Count</th></tr>";
                for(var i = 0; i < response['tools'].length; i++){
                    tools += "<tr><td>" + response['tools'][i]['name'] + "</td>";
                    tools += "<td>" + response['tools'][i]['count'] + "</td></tr>";
                }
                tools += "</table>";
            }
			$('#inner').html(tools);
		}
	}