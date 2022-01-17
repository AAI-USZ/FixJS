function () {
			return (
				Aloha.activeEditable &&
				this.isNumeratingOn() &&
				(Aloha.activeEditable.obj.attr('aloha-numerated-headers') === 'true')
			);
		}