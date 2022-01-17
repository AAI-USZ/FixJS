function()
					{
						var httpMethod = mName.substring(0, 3).toUpperCase();
						var cmdName = mName.substring(3);

						if(httpMethod != "GET" && httpMethod != "POST")
						{
							cmdName = mName;
							httpMethod = "POST";
						}

						var url = phnq_widgets.config.uriPrefix + "/" + type + "/remote/" + cmdName;
						var args = [];

						for(var i=0; i<arguments.length; i++)
						{
							args.push(arguments[i]);
						}

						var fn = args.pop();
						if(typeof(fn) != "function")
						{
							args.push(fn);
							fn = function(){};
						}

						var data = {};
						if(httpMethod == "POST")
						{
							data = JSON.stringify(args);
						}
						else if(httpMethod == "GET")
						{
							for(var i=0; i<args.length; i++)
							{
								args[i] = escape(args[i]);
							}
							url += ("/" + args.join("/"));
						}

				        $.ajax(
				        {
				            url: url,
				            type: httpMethod,
				            data: data,
				            dataType: "json",
				            contentType: "application/json; charset=utf-8"
				        }).success(function(resp, status, xhr)
				        {
				            fn(resp, xhr);
				        }).error(function(resp, status, xhr)
				        {
				            errorFn(resp, xhr);
				        });
					}