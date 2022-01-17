function _addStorageStateChangeListener() {
            var watchId = Math.uuid(null, 16);

            _observers[watchId] = function(storage) {//storage is which state is changed
		        onSuccess(storage);
		    };

            // This event should be triggered from outside
		    event.on("StateChange", _observers[watchId]);
		    return Number(watchId);
        }