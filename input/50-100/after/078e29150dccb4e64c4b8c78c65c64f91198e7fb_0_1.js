function () { /* enable VML */

		if (document.namespaces && !document.namespaces[this.ns]) {

			document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml');

		}

	}