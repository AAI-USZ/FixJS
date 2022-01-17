function(ed, cm, n, co) {

				cm.setDisabled('link', co && n.nodeName != 'A');

				cm.setActive('link', n.nodeName == 'A' && !n.name);

			}