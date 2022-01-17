function(req, res)
		{
			res.contentType("js");
			res.send(getClientBoot());
		}