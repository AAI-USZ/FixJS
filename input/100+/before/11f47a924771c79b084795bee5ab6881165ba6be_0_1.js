function(path, force)
		{
			if(path && path.stop != undefined) path = false;
			path || (path = this.cur_path());

			// remove querystring from the url if we have set the Router to
			// ignore it
			if(!this.options.process_querystring) path = path.replace(/\?.*/, '');

			force	=	!!force;

			// remove the motherfucking ! at the beginning
			if(this.last_path == path && !force)
			{
				// no need to reload
				return false;
			}

			this.last_path	=	path;
			this.trigger('preroute', path);
			this.trigger('route', path);
		}