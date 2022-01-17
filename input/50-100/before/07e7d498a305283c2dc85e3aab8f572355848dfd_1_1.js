function(ev) {
				switch (ev.which) {
					case 8:
						// Wenn das Feld leer ist und Backspace betätigt wird,
						// dann wird die Frage gelöscht
						if (this.value == "" && confirm('Frage löschen?')) {
							removeQuestion($(this).parent());
							return false;
						}
						break;
				}
			}