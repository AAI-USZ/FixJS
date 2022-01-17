function onExecuteDepsLoaded() {
			var i,
				p,
				r = _t.rawDef,
				q = defQ.slice(0); // backup the defQ

			function finish() {
				_t.executed = 1;
				resolve.call(promise, _t);
			}

			// need to wipe out the defQ
			defQ = [];

			_t.def = _t.def
				||	(r && (is(r, "String")
						? evaluate(r, _t.cjs)
						: is(r, "Function")
							? r.apply(null, arguments)
							: is(r, "Object")
								?	(function(obj, vars) {
										for (var i in vars) {
											this[i] = vars[i];
										}
										return obj;
									}).call({}, r, _t.cjs)
								: null
						)
					)
				|| _t.cjs.module.exports || _t.cjs.exports;

			// we might have just executed code above that could have caused a couple
			// define()'s to queue up
			processDefQ(_t);

			// restore the defQ
			defQ = q;

			// if plugin is not null, then it's the index in the deps array of the plugin
			// to invoke
			if (_t.plugin !== null) {
				p = arguments[_t.plugin];

				// the plugin's content is dynamic, so just remove from the module cache
				if (p.dynamic) {
					delete modules[_t.name];
				}

				// if the plugin has a load function, then invoke it!
				p.load && p.load(_t.pluginArgs, _t.cjs.require, function onPluginRun(v) {
					_t.def = v;
					finish();
				}, _t.pluginCfg);
			}

			(p && p.load) || finish();
		}