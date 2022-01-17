function () {
        
        var url = "environment.jsp", api = this;
        jQuery.support.cors = true;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            cache: true,
			async: false,
            success : function(jo, e, xhr) {

				$.ajax({
					type: "GET",
					url: "resources/phresco-env-config.xml",
					dataType: "xml",
					async: false,
					success: function (xml) {
						api.xmlDoc = xml;
						var currentEnv = jo.environment,
						type = "WebService", name = "", 
						configdata = api.getConfigByName(currentEnv, type, name), 
						host = configdata.host, 
						port = configdata.port,
						protocol = configdata.protocol, 
						context = configdata.context, 
						username = configdata.username,
						password = configdata.password,
						urlWithoutContext = protocol + '://' + host + ':' + port,
						url = protocol + '://' + host + ':' + port + '/' + context;
						api.wsURL = url;
						api.wsURLWithoutContext = urlWithoutContext;
					},
					error : function(xhr, e, et){
						var jo = {"status":"server error"};
					}
				});
            },
            error : function(xhr, e, et){
                var jo = {"status":et};
            }
        });             
    }