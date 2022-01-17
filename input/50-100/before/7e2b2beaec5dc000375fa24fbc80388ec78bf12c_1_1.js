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
				widget.getRemoteHandlers()[req.params.cmd].apply(null, args);
			}