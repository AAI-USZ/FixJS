function()
	{
		/*
		*	Gets the client-side bootstrap JS. This includes jQuery and some
		*	other JS utilities to allow the loading of widgets.
		*/
		app.get(config.uriPrefix+"/boot", function(req, res)
		{
			res.contentType("js");
			res.send(getClientBoot());
		});

		/*
		*	Load widgets onto the client.
		*/
		app.get(config.uriPrefix+"/load", function(req, res)
		{
			var result =
			{
				templates: {},
				scripts: [],
				styles: []
			};

			var classesOnly = req.query.co.split(",");
			var fullyLoaded = req.query.fl.split(",");
			var toLoad = req.query.t.split(",");

			// Fill in toLoad with dependencies.
			for(var i=0; i<toLoad.length; i++)
			{
				var type = toLoad[i];
				var widget = widgetManager.getWidget(type);
				if(widget)
				{
					var deps = widget.getDependencies();
					for(var j=0; j<deps.length; j++)
					{
						if(_.indexOf(fullyLoaded, deps[j]) == -1)
							toLoad.push(deps[j]);
					}
				}
			}
			toLoad = _.uniq(toLoad);

			for(var i=0; i<toLoad.length; i++)
			{
				var type = toLoad[i];
				var widget = widgetManager.getWidget(type);
				if(widget)
				{
					result.templates[type] = widget.getCompiledMarkup();

					if(_.indexOf(classesOnly, type) == -1)
					{

						var script = widget.getScript();
						if(script)
							result.scripts.push(script);

						var style = widget.getStyle();
						if(style)
							result.styles.push(style);
					}
				}
			}

			var buf = [];
			buf.push(req.query.jsoncallback);
			buf.push("(");
			buf.push(JSON.stringify(result));
			buf.push(");");

			res.contentType("js");
			res.send(buf.join(""));
		});

		app.get(config.uriPrefix+"/agg/:aggFile.js", function(req, res)
		{
			var path = _path.join(_path.dirname(process.argv[1]), "/agg/"+req.params.aggFile+".js");
			_path.exists(path, function(exists)
			{
				if(!exists)
					widgetManager.generateAggregateScript(req.params.aggFile);

				res.sendfile(path);
			});
		});

		app.get(config.uriPrefix+"/agg/:aggFile.css", function(req, res)
		{
			var path = _path.join(_path.dirname(process.argv[1]), "/agg/"+req.params.aggFile+".css");
			_path.exists(path, function(exists)
			{
				if(!exists)
					widgetManager.generateAggregateStyle(req.params.aggFile);

				res.sendfile(path);
			});
		});

		app.get(config.uriPrefix+"/:widgetType", function(req, res)
		{
			phnq_widgets.renderWidget(req.params.widgetType, {}, req, res);
		});

		app.get(config.uriPrefix+"/:widgetType/static/:staticPath", function(req, res)
		{
			widgetManager.getWidget(req.params.widgetType, function(err, widget)
			{
				if (err)
					return res.send(err);

				if(!widget)
					return res.send(404);

				res.sendfile(_path.join(widget.dir, "static", req.params.staticPath));
			});
		});

		app.post(config.uriPrefix+"/:widgetType/remote/:cmd", function(req, res)
		{
			widgetManager.getWidget(req.params.widgetType, function(err, widget)
			{
				if (err)
					return res.send(err);

				if(!widget)
					return res.send(404);

				var args = req.body;
				args.push(function(resp)
				{
					res.json(resp);
				});

				var remoteHandlerFn = widget.getRemoteHandlers()["post"+req.params.cmd] || widget.getRemoteHandlers()[req.params.cmd];
				remoteHandlerFn.apply(null, args);
			});
		});

		app.get(new RegExp("^"+config.uriPrefix+"/([^/]*)/remote/([^/]*)/(.*)"), function(req, res)
		{
			var widgetType = req.params[0];
			var cmd = req.params[1];
			var args = req.params[2].split("/");

			widgetManager.getWidget(widgetType, function(err, widget)
			{
				if (err)
					return res.send(err);

				if(!widget)
					return res.send(404);

				args.push(function(resp)
				{
					res.json(resp);
				});
				widget.getRemoteHandlers()["get"+cmd].apply(null, args);
			});
		});
	}