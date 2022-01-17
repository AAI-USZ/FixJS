function initCache(i) {
				if (i < Aloha.editables.length) {
					self.getOverlayForEditable(Aloha.editables[i]);
					setTimeout(function(){ initCache(i + 1); }, 100);
				}
			}