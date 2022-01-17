function localRequire (ids, callback) {
				var cb, rvid, childDef, earlyExport;

				// this is public, so send pure function
				// also fixes issue #41
				cb = callback && function () { callback.apply(undef, arguments[0]); };

				// RValue require (CommonJS)
				if (isType(ids, 'String')) {
					// return resource
					rvid = toAbsId(ids);
					childDef = cache[rvid];
					earlyExport = isPromise(childDef) && childDef.exports;
					if (!(rvid in cache)) {
						// this should only happen when devs attempt their own
						// manual wrapping of cjs modules or get confused with
						// the callback syntax:
						throw new Error('Module not resolved: '  + rvid);
					}
					if (cb) {
						throw new Error('require(id, callback) not allowed');
					}
					return earlyExport || childDef;
				}
				else {
					// use same id so that relative modules are normalized correctly
					when(core.getDeps(core.createContext(cfg, def.ctxId, ids, isPreload)), cb);
				}
			}