function (cfg) {
			var hasCfg,
				apiName, apiObj, defName, defObj, define;

			hasCfg = cfg;

			if (!cfg) cfg = {};

			// allow dev to rename/relocate curl() to another object
			apiName = cfg['apiName'];
			apiObj = cfg['apiContext'];
			// if the dev is overwriting an existing curl()
			if (apiObj || apiName ? (apiObj || global)[apiName] : prevCurl && hasCfg) {
				throw new Error((apiName || 'curl') + ' already exists');
			}
			(apiObj || global)[apiName || 'curl'] = _curl;
			// restore previous curl
			if (prevCurl && hasCfg) global['curl'] = prevCurl;

			// allow dev to rename/relocate define() to another object
			defName = cfg['defineName'];
			defObj = cfg['defineContext'];
			if (defObj || defName ? (defObj || global)[defName] : prevDefine && hasCfg) {
				throw new Error((defName|| 'define') + ' already exists');
			}
			(defObj || global)[defName || 'define'] = define = function () {
				// wrap inner _define so it can be replaced without losing define.amd
				var args = core.fixArgs(arguments);
				_define(args);
			};
			// restore previous define
			if (prevDefine && hasCfg) global['define'] = prevDefine;

			// indicate our capabilities:
			define['amd'] = { 'plugins': true, 'jQuery': true, 'curl': version };

			// switch to re-runnable config
			if (hasCfg) core.config = core.moreConfig;

			return core.moreConfig(cfg);
		}