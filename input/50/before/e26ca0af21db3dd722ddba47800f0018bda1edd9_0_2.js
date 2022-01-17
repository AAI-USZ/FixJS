function (def) {
			// note: don't look up an anon module's id from it's own toUrl cuz
			// the parent's config was used to find this module
			// the toUrl fallback is for named modules in built files.
			return def.url || (def.url = def.require['toUrl'](def.id));
		}