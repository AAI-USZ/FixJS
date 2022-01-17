function () {
			if (typeof this.baseobjectSelector !== 'undefined') {
				return ($(this.baseobjectSelector).length > 0) ?
						$(this.baseobjectSelector) : null;
			}
			return Aloha.activeEditable ? null : Aloha.activeEditable.obj;
		}