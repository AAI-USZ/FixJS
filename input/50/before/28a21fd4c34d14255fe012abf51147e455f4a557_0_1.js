function (obj, options) {
		obj.options = L.Util.extend({}, obj.options, options);
		return obj.options;
	}