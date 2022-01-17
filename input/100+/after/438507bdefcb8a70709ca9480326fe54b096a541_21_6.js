function( character, actions ) {
		if ( typeof character == 'string' ) {
			character = {
				'label' : character,
				'action' : {
					'type' : 'replace',
					'options' : {
						'peri' : character,
						'selectPeri': false
					}
				}
			};
		} else if ( character && 0 in character && 1 in character ) {
			character = {
				'label' : character[0],
				'action' : {
					'type' : 'replace',
					'options' : {
						'peri' : character[1],
						'selectPeri': false
					}
				}
			};
		}
		if ( character && 'action' in character && 'label' in character ) {
			actions[character.label] = character.action;
			return '<span rel="' + character.label + '">' + character.label + '</span>';
		}
		mw.log( "A character for the toolbar was undefined. This is not supposed to happen. Double check the config." );
		return ""; // bug 31673; also an additional fix for bug 24208...
	}