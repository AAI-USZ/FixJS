function (characters) {
			var self = this;
			// TODO: shouldn't we do jQuery('<div>' + characters + '</div>').text() here?
			var textarea = document.createElement('textarea');
			textarea.innerHTML = characters;
			characters = textarea.value;
			var characterList = jQuery.grep(
				characters.split(' '),
				function filterOutEmptyOnces(e) {
					return e !== '';
				}
			);
			var charTable = ['<tr>'];
			var i = 0;
			var chr;
			while ((chr = characterList[i])) {
				// make a new row every 15 characters
				if (0 !== i && ((i % 15) === 0)) {
					charTable.push('</tr><tr>');
				}
				charTable.push('<td unselectable="on">' + chr + '</td>');
				i++;
			}
			charTable.push('</tr>');
			self.$tbody
				.empty()
				.append(charTable.join(''));
			self.$node.delegate('td', 'mouseover', function () {
				jQuery(this).addClass('mouseover');
			}).delegate('td', 'mouseout', function () {
				jQuery(this).removeClass('mouseover');
			}).delegate('td', 'click', function (e) {
				self.$node.hide();
				var character = jQuery(this).text();
				self.onSelectCallback(character);
			});
		}