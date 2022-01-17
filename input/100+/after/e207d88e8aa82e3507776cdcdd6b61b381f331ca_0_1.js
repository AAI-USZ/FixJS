function (text) {
				try {
					text = "define(function() { return " + compile(text, name, path, config.template) + "; })";
				}
				catch (err) {
					err.message = "In " + path + ", " + err.message;
					throw(err);
				}

				if (config.isBuild) {
					buildMap[name] = text;
				}

				// IE with conditional comments on cannot handle the
				// sourceURL trick, so skip it if enabled
				/*@if (@_jscript) @else @*/
				else {
					text += "\n//@ sourceURL='" + path +"'";
				}
				/*@end@*/

				load.fromText(name, text);

				// Give result to load. Need to wait until the module
				// is fully parse, which will happen after this
				// execution.
				parentRequire([name], function (value) {
					load(value);
				});
			}