function(editable) {
			// Each editable may have its own configuration and as
			// such may have its own overlay.
			var config = this.getEditableConfig(editable.obj),
			    overlay;
			if ( ! config ) {
				return false;
			}
			if (jQuery.isArray(config)) {
				config = config.join(' ');
			}
			// We cache the overlay by configuration. If all editables
			// have the same configuration, only a single overlay will
			// be created that will be used by all editables.
			overlay = overlayByConfig[config];
			if ( ! overlay ) {
				overlay = new CharacterOverlay(onCharacterSelect);
				overlay.setCharacters(config);
				overlayByConfig[config] = overlay;
			}
			return overlay;
		}