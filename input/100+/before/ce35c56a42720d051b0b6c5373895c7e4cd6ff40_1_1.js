function(plugins)
	{
		for (var i in plugins)
		{
			if (self.plugins[i])
			{
				// plugin already loaded

				// If the client manager has been given new settings since the
				// plugin was loaded, attempt to sent it new options
				if ((self.plugins[i].rehashCount != self.rehashCount) && (typeof self.plugins[i].options == 'function'))
					self.plugins[i].options(plugins[i].options);

				self.plugins[i].rehashCount = self.rehashCount;

				// next
				continue; 
			}

			var plugin = null;

			if (path.existsSync(plugins[i].path) || path.existsSync(plugins[i].path + '.js'))
				plugin = require(plugins[i].path); // absolute / already working path in our config object
			else if (path.existsSync(path.join(self.basePath, '/plugins/', plugins[i].path)) || path.existsSync(path.join(self.basePath, '/plugins/' + plugins[i].path + '.js')))
				plugin = require(path.join(self.basePath, '/plugins/' + plugins[i].path)); // Relative to basepath

			if (plugin != null)
			{
				if (typeof plugin.construct == 'function')
					plugin.construct(plugins[i].options);

				plugin.rehashCount = self.rehashCount;

				self.plugins[i] = plugin;
			}
		}
	}