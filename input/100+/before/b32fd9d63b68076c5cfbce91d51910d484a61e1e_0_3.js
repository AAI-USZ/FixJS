function () {

				for (i = 0; i < len && !completed; i++) {
					name = names[i];
					if (name in cjsVars) {
						// is this "require", "exports", or "module"?
						// if "exports" or "module" indicate we should grab exports
						if (name == 'exports') parentDef.useExports = true;
						if (name == 'module') parentDef.useModule = true;
						deps[i] = parentDef[name];
						checkDone();
					}
					// check for blanks. fixes #32.
					// this could also help with the has! plugin
					else if (names[i]) {
						getDep(i, names[i]);
					}
					else {
						checkDone();
					}
				}

				if (parentDef.useExports) {
					// announce
					parentDef.progress(msgUsingExports);
				}

				if (count == 0 && !completed) {
					// there were none to fetch
					overrideCallback(deps);
				}

			}