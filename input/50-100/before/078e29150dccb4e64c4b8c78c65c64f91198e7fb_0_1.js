function() { /* enable VML */

		if (document.namespaces && !document.namespaces[this.ns]) {

		  document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');

		}

		if (window.attachEvent) {

			window.attachEvent('onbeforeunload', function() {

				DD_belatedPNG = null;

			});

		}

	}