function(path, force)
		{
			if(path && path.stop != undefined) path = false;
			path || (path = this.cur_path());
			force	=	!!force;

			// check if we are routing to the same exact page. if we are, return
			// (unless we force the route)
			if(this.last_path == path && !force)
			{
				// no need to reload
				return false;
			}

			this.last_path	=	path;

			// remove querystring from the url if we have set the Router to
			// ignore it. Note that this happens after the same-page check since
			// we still want to take QS into account when comparing URLs.
			if(!this.options.process_querystring) path = path.replace(/\?.*/, '');

			this.trigger('preroute', path);
			this.trigger('route', path);
		}