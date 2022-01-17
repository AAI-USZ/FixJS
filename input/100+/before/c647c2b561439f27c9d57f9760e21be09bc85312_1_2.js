function (val, key) {
			var k2 = key.substr(key.length - 4, 4);
			if (k2 === '_raw') {
				key = key.replace('_raw', '');
				if (!this.tryUpdate(key, val)) {
					if (repeatNum) {
						key += '_' + repeatNum;
						this.tryUpdate(key, val);
					}
				}
			}
		}