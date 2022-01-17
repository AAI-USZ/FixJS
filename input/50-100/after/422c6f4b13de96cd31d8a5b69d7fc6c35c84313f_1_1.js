function (image, key) {
				key = key.split('\\').getLast();
				var f = document.getElements('input[name*=' + key + ']');
				f = f[1];
				// $$$ rob - seems reloading ajax fileupload element in ajax form (e.g. from db join add record)
				// is producing odd effects where old fileupload object constains info to previously uploaded image?
				if (typeOf(f) !== 'null') {
					f.value = JSON.encode(image);
				}
			}