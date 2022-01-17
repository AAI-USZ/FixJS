function() {
			var choices = [];
			for (var i=0; i < this.outlineProviders.length; i++) {
				var provider = this.outlineProviders[i],
				    name = provider.getProperty("name") || (provider.name + provider.serviceId) || "undefined", //$NON-NLS-1$ //$NON-NLS-0$
				    prefix = (provider.getProperty("id") === this.providerId) ? "&bull; " : ""; //$NON-NLS-1$ //$NON-NLS-0$
				choices.push({
					name: prefix + name,
					callback: dojo.hitch(this, this.setSelectedProvider, provider)});
			}
			return choices;
		}