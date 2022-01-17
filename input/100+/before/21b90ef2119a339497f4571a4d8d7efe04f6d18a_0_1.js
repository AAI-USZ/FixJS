function(doc) {
			var el = doc.createElement('details'),
				fake,
				root,
				diff;
			if (!('open' in el)) {
				return false;
			}

			root = doc.body || (function() {
				var de = doc.documentElement;
				fake = true;
				return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
			}());

			el.innerHTML = '<summary>a</summary>b';
			el.style.display = 'block';
			root.appendChild(el);
			diff = el.offsetHeight;
			el.open = true;
			diff = diff != el.offsetHeight;
			root.removeChild(el);

			if (fake) {
				root.parentNode.removeChild(root);
			}

			return diff;

		}