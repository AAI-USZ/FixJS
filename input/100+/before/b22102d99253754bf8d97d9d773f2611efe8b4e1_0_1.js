function() {

					script.onerror = null;

					if (scriptDfd) {

						scriptDfd.resolve();

					} else {

						load(++count);

					}

				}