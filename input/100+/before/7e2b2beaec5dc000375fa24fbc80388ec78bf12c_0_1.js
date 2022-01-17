function()
					{
						var url = phnq_widgets.config.uriPrefix + "/" + type + "/remote/" + mName;
						var data = [];

						for(var i=0; i<arguments.length; i++)
						{
							data.push(arguments[i]);
						}

						var fn = data.pop();
						if(typeof(fn) != "function")
						{
							data.push(fn);
							fn = function(){};
						}

				        $.ajax(
				        {
				            url: url,
				            type: "POST",
				            data: JSON.stringify(data),
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