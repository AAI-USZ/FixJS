function() {
			if( !this.preserveEmptyForm ) {
				// remove value totally
				this.destroy();
				this._subject.empty().remove();
				if( this.onAfterRemove !== null ) {
					this.onAfterRemove(); // callback
				}
			} else {
				// delete value but keep empty input form
				this._reTransform( true );
				this.startEditing();
				this.removeFocus(); // don't want the focus immediately after removing the value
			}
		}