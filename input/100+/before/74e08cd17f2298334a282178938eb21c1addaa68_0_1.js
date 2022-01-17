function (data) {
		var data = JSON.parse(data);

		var ev = data.shift();
		var id = data.shift();
		data.unshift(ev);


		var callback = callbacks[ev.toLowerCase() + '_' + id];
		if (callback) {
			callback.apply(null, data);
		}

		data.push(function reply (payload) {
			var args = Array.prototype.slice.apply(arguments);
			send.apply(null, [ev, id].concat(args));
		});

		events._emit.apply(events, data);
	}