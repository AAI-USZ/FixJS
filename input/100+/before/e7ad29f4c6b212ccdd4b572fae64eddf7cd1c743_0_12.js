function(){
	var Class = XM.Class;

	XM.ClassManager = {

		cachedClass: {},

		references: {},

		create: function(className, data, onCreatedFn) {

			var manager = this;

			data._className = className;

			return new Class(data, function(){
				manager.setReference(className, this);
				if (onCreatedFn) {
					onCreatedFn.call(this, this);
				}
			})
		},

		/**
		 * Check if specified namespace(s) is already exist in runtime object hierarchy. Will return true if the specified namespace is already exist; otherwise, will return false.
		 * @param   {String | Array}  className   (optional) Namespace(s) of the class to check.
		 * @return  {Boolean} Existence of the namespace in runtime object hierarchy.
		 */
		isExist: function(className) {
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
		},

		/**
		 * Parse the given namespace string into operational array data for further traversing.
		 * @param {String}  name  	A namespace.
		 * @return {Array}	An array contain the name of each traversed namespace hierarchy.
		 */
		parseNamespace: function(namespace) {
			var parts = [],
				root = XM.global;

			parts.push(root);
			parts = parts.concat(namespace.split('.'));
			return parts;
		},

		/**
		 * Create a namespace and assign it with a class or object.
		 * @param 	{String}  	name  	A namespace.
		 * @param 	{Object}  	obj   	A class or object to be assigned with specific namespace.
		 * @return 	{Object}	The reference of specific class or object that referenced by given namespace.
		 */
		createNamespace: function(name, obj) {
			var root 	= XM.global,
					parts = this.parseNamespace(name),
					ln = parts.length - 1,
					last = parts[ln],
					part, i;

			for (i = 0; i < ln; i++) {
				part = parts[i];

				if (XM.isString(part)) {
					if (!root[part]) {
						root[part] = {};
					}
					root = root[part];
				}
				else {
					root = part;
				}
			}

			root[last] = obj;
			return root[last];
		},

		/**
		 * Mass creation of namespace. Capable of create multiple namespaces.
		 */
		createNamespaces: function() {
			var root = XM.global,
					i, j, ln, partLn, parts, part;

			for (i = 0, ln = arguments.length; i < ln; i++) {
				parts = this.parseNamespace(arguments[i]);
				for (j = 0, partLn = parts.length; j < partLn; j++) {
					part = parts[j];

					if (XM.isString(part)) {
						if (!root[part]) {
							root[part] = {};
						}
						root = root[part];
					}
					else {
						root = part;
					}
				}
			}
			return root;
		},

		/**
		 * Assign the given class with specific namespace.
		 * 
		 * @param 	{String}  	name  	A namespace.
		 * @param 	{Object}  	cls  	A reference of class.
		 * @return 	root 		The class reference of the given namespace.
		 */
		setReference: function(name, cls) {
				this.references[name] = this.createNamespace(name, cls);
				return this;
		},

		/**
		 * Get the actual class reference by given namespace string
		 * 
		 * @param 	{String}  	name  	A namespace.
		 * @return 	root 		The class reference of the given namespace.
		 */
		getReference: function(namespace) {
			if (this.references.hasOwnProperty(namespace)) {
				return this.references[namespace];
			}

			var root = XM.global,
				parts = this.parseNamespace(namespace),
				ln = parts.length;

			for (i = 0; i < ln; i++) {
				part = parts[i];

				if (XM.isString(part)) {
					if (! root || !root[part]) {
						return null;
					}
					root = root[part];
				}
				else {
					root = part;
				}
			}
			return root;
		}
	}
}