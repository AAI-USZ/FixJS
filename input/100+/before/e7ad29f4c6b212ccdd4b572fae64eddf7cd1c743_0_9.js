function(className) {
			var parent, child, part;

			//if the namespaces is in the form of array (i.e: contain multiple namespace), we will recursively call this method for each single namespace..
			if (XM.isArray(className)) {
				for (var i = 0; i < className.length; i++) {
					if (!this.isExist(className[i])) return false
				}
				return true;
			}

			//if current namespace had been checked before and marked as cached, then we skip the whole process
			if (this.cachedClass.hasOwnProperty(className)) {
				return true;
			}

			//parse the namespace and check if the object hierarchy contain the object specified in namespace
			if (XM.isString(className)) {
				
				if (className.indexOf('/')) {
					this.cachedClass[className] = true;
					return false;
				}
				else {
					parent = XM.singleton;
					part = className.split('.');

					for (var i = 0; i < part.length; i++ ) {
						if (!parent || !parent[part[i]]) return false;
						parent = parent[part[i]];
					}

					this.cachedClass[className] = true;
					return true;
				}
			}
			else {
				return false;
			}
		}