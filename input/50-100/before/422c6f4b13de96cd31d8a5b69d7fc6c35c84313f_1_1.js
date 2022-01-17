function (image, key) {
				key = key.split('\\').getLast();
				var f = document.getElements('input[name*=' + key + ']');
				f = f[1];
				f.value = JSON.encode(image);
			}