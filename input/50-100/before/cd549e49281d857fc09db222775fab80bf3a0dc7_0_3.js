function(data) {
			var mappedData = Model.mapItem.call(this, data);
			this.fire('datachange', { action: 'set', id: mappedData[this.getKey()], item: mappedData });
			success.call(context, new this(mappedData));
		}