function (def) {
			var resource, moduleThis;
			// the force of AMD is strong so anything returned
			// overrides exports.
			// node.js assumes `this` === `exports` so we do that
			// for all cjs-wrapped modules, just in case.
			// also, use module.exports if that was set
			// (node.js convention).
			moduleThis = def.cjs ? def.exports : undef;
			resource = def.res.apply(moduleThis, def.deps);
			if (resource === undef && (def.cjs || def.useExports || def.useModule)) {
				// note: exports will equal module.exports unless
				// module.exports was reassigned inside module.
				resource = def.module.exports;
			}
			return resource;
		}