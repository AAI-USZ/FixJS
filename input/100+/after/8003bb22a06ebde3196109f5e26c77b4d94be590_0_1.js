function(opts) {

	var node = opts.node || new Image();

	var deferred = $.Deferred();



	var unbindEvents = function() {

		removeEvent(node, "load", loadCb);

		removeEvent(node, "error", errorCb);

	};

	var loadCb = function() {

		deferred.resolve(node);

		unbindEvents();

	};

	var errorCb = function() {

		deferred.reject(node);

		unbindEvents();

	};

	addEvent(node, "load", loadCb);

	addEvent(node, "error", errorCb);

	if (opts.timeout){

		setTimeout(function() {

			deferred.reject(node, 'timeout');

			unbindEvents();

		}, opts.timeout)

	}

	node.src = opts.url;

	if (node.complete){

		deferred.resolve(node);

		unbindEvents();

	}

	return deferred.promise({

		abort: function() {

			delete node.src;

			unbindEvents();

		}

	});

}