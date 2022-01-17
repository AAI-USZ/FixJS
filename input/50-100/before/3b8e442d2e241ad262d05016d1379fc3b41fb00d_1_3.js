function () {
			if (typeof this.baseobjectSelector !== 'undefined') {
				return ($(this.baseobjectSelector).length > 0) ?
						$(this.baseobjectSelector) : null;
			}
			return Aloha.activeEditable ? Aloha.activeEditable.obj : null;
		}