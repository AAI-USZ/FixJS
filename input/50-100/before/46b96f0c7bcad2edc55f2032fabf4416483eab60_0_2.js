function(moduleName, bundleName, locale){
			var result,
				l10nName = getL10nName(moduleName, bundleName, locale).substring(10);

			load(
				l10nName,

				// isXd() and syncRequire() need a context-require in order to resolve the mid with respect to a reference module.
				// Since this legacy function does not have the concept of a reference module, resolve with respect to this
				// dojo/i18n module, which, itself may have been mapped.
				(!isXd(l10nName, require) ? function(deps, callback){ syncRequire(deps, callback, require); } : require),

				function(result_){ result = result_; }
			);
			return result;
		}