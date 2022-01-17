function(classData, onClassCreated) {
		var i, 
			ln = staticProperties.length,
			prop;

		//template of the class factory
		newClass = function() {
			console.log("newClass", this, arguments);
			//TODO : class definition must have constructor method. otherwise, this will be recursively called...
			//TODO : workaround is by change "constructor" name into something different..
			return this.constructor.apply(this, arguments);
		}

		if (!classData) classData = {};

		//duplicate Base properties into Class factory class..
		for (i = 0; i < ln; i++) {
			prop = staticProperties[i];
			newClass[prop] = Base[prop];
		}

		//implement handler when class is created
		classData.onClassCreated = onClassCreated || XM.emptyFn;

		//implement handler when class is just about to be created, do the implementation of actual integration of data into newly created class
		classData.onBeforeClassCreated = function(cls, data) {
			temp = data.onClassCreated;

			delete data.onBeforeClassCreated;
			delete data.onClassCreated;
			cls.implement(data);
			temp.call(cls, cls);
		};

		//method to instruct when the implementation of above handler is executed
		process = function(cls, data) {
			data.onBeforeClassCreated.apply(this, arguments);
			return;
		};

		//do the actual process
		process.call(Class, newClass, classData);
		return newClass;
	}