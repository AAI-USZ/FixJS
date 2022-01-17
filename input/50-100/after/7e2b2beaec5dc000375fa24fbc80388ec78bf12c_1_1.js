function(err, widget)
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
			}