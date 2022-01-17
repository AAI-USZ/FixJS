function (id, cfg, isPreload, optCtxId) {
			var def, ctxId;

			ctxId = optCtxId == undef ? id : optCtxId;

			def = new ResourceDef();
			def.id = id;
			def.isPreload = isPreload;
			def.cfg = cfg;

			// replace cache with resolved value (overwrites self in cache)
			def.then(function (res) { cache[id] = res; });

			// functions that dependencies will use:

			function toAbsId (childId) {
				return core.normalizeName(childId, ctxId);
			}

			function toUrl (n) {
				// TODO: determine if we can skip call to toAbsId if all ids passed to this function are normalized or absolute
				var path = core.resolvePathInfo(toAbsId(n), cfg).path;
				return core.resolveUrl(path, cfg);
			}

			function localRequire (ids, callback) {
				var cb, rvid, childDef, earlyExport;

				// this is a public function, so remove ability for callback
				// fixes issue #41
				cb = callback && function () { callback.apply(undef, arguments[0]); };

				// RValue require (CommonJS)
				if (isType(ids, 'String')) {
					// return resource
					rvid = toAbsId(ids);
					childDef = cache[rvid];
					earlyExport = isPromise(childDef) && childDef.useExports && childDef.exports;
					if (!(rvid in cache) || (isPromise(childDef) && !earlyExport)) {
						throw new Error('Module is not resolved: '  + rvid);
					}
					if (cb) {
						throw new Error('require(id, callback) not allowed.');
					}
					return earlyExport || childDef;
				}

				// pass the callback, so the main def won't get resolved!
				core.getDeps(def, ids, cb);

			}

			def.require = def.require = localRequire;
			def.exports = {};
			def.module = {
				'id': id,
				// TODO: defer creation of 'module' so we don't have to run toUrl unnecessarily
				'uri': toUrl(id),
				'exports': def.exports
			};

			localRequire['toUrl'] = toUrl;
			def.toAbsId = toAbsId;

			return def;
		}