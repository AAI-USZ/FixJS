function cleanupBr(e) {
				if (e && e.tagName === 'BR') {
					dom.remove(e);
				}
			}