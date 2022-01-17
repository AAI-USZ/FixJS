function (characters) {
			var self = this;
			function htmlEntityToSingleCharacter(character) {
				// isn't there any better way?
				var textarea = document.createElement('textarea');
				textarea.innerHTML = character;
				return textarea.value;
			}
			function mkButton(c) {
				var character = htmlEntityToSingleCharacter(c);
				return jQuery('<td unselectable="on">' + character + '</td>')
					.mouseover(function () {
						jQuery(this).addClass('mouseover');
					})
					.mouseout(function () {
						jQuery(this).removeClass('mouseover');
					})
					.click(function (e) {
						self.hide();
						self.onSelectCallback(character);
						return false;
					});
			}
			function addRow() {
				return jQuery('<tr></tr>').appendTo(self.$tbody);
			}
			var characterList = jQuery.grep(
				characters.split(' '),
				function filterOutEmptyOnces(e) {
					return e !== '';
				}
			);
			var i = 0, chr;
			var $row;
			// remove existing rows
			self.$tbody.find('tr').remove();
			while ((chr = characterList[i])) {
				// make a new row every 15 characters
				if (((i % 15) === 0)) {
					$row = addRow();
				}
				mkButton(chr).appendTo($row);
				i++;
			}
		}