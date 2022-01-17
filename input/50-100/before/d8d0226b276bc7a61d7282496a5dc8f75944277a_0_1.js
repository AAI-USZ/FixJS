function(path, force)
		{
			if(path && path.stop != undefined) path = false;
			path || (path = this.cur_path());
			force	=	!!force;

			// remove the motherfucking ! at the beginning
			if(this.last_path == path && !force)
			{
				// no need to reload
				return false;
			}

			this.last_path	=	path;
			this.trigger('route', path);
		}