function(editable) {
			// Each editable may have its own configuration and as
			// such may have its own overlay.  We cache the overlay
			// as data on the editable element. The special value
			// false means that the editable has the characterpicker
			// plugin turned off.
			var overlay = editable.obj.data('aloha-characterpicker-overlay');
			if (overlay || false === overlay) {
				return overlay;
			}
			var config = this.getEditableConfig(editable.obj);
			if ( ! config ) {
				editable.obj.data('aloha-characterpicker-overlay', false);
				return false;
			}
				if (jQuery.isArray(config)) {
					config = config.join(' ');
				}
			// In addition to caching the selected overlay
			// per-editable, we also cache the overlays for
			// each config so that editables with the same
			// config can share overlays.
			overlay = overlayByConfig[config];
			if ( ! overlay ) {
				overlay = new CharacterOverlay(onCharacterSelect);
				overlay.setCharacters(config);
				overlayByConfig[config] = overlay;
			}
			editable.obj.data('aloha-characterpicker-overlay', overlay);
			return overlay;
				}