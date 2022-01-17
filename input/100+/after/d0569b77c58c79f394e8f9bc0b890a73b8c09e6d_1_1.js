function() {
		if (request.readyState == 4) {
			var response = JSON.parse(request.responseText);
            var tools = "";
            var date = $('#date').val();
            console.log(request.responseText);

            if(response['tools'] == "") {
                $('#caption').html("");
                tools = "No tools on " + date + ".";
            } else {
                $('#caption').html("Tools on " + date + ":");
                tools = "<table><thead><tr><th>Name</th><th>Count</th></tr></thead><tbody>";
                for(var i = 0; i < response['tools'].length; i++){
                    tools += "<tr><td>" + response['tools'][i]['name']+"</td>";
                    tools += "<td>" + response['tools'][i]['count']+"</td></tr>";
                }
                tools += "</tbody></table>";
            }
			$('#inner').html(tools);
		}
	}