function(index, el) {

			if (el.nodeType == Node.TEXT_NODE) {

				if (el.nodeValue.match(/&.+?;/gim)) {

					$('#entitiesConverter')[0].innerHTML = el.nodeValue;

					el.nodeValue = $('#entitiesConverter')[0].innerText || $('#entitiesConverter')[0].firstChild.nodeValue;

				}

			} else if (el.nodeType == Node.ELEMENT_NODE) {

				_entitiesToUnicode(el);

			}

		}