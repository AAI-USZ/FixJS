function(e){
				// If we're currently editing an equation...
				//textEd.window probably only works outside IE
				caretNode = textEd.window.getSelection().anchorNode.parentNode;
				if ($(caretNode).hasClass('eqn')) {
					// Pressed $ in inline eqn? Boost eqn to display
					if (e.charCode == DOLLAR && $(caretNode).hasClass('inline')) {
						e.preventDefault();
						e.stopPropagation();
						$(caretNode).removeClass('inline');
						$(caretNode).addClass('display');
					}
					// Pressed Ctrl-$ in inline? Remove eqn and leave plaintext
					if (e.charCode == CTRLDOLLAR && $(caretNode).hasClass('inline')) {
						e.preventDefault();
						e.stopPropagation();
						var temp = $(caretNode).html();
						$(caretNode).remove();
						textEd.execCommand('inserthtml', temp);
						//textEd.window.getSelection().deleteFromDocument();
						//textEd.window.getSelection().anchorNode.parentNode.innerHTML(temp);
					}
					// Pressed Ctrl-$ in display eqn? Reduce to inline eqn
					if (e.charCode == CTRLDOLLAR && $(caretNode).hasClass('display')) {
						e.preventDefault();
						e.stopPropagation();
						$(caretNode).removeClass('display');
						$(caretNode).addClass('inline');
					}

				} else {
					// $ pressed outside equation? Make new eqn.
					if (e.charCode == DOLLAR) {
						e.preventDefault();
						e.stopPropagation();
						var eqnIDCounter = 0;
						while ($('#eqn_' + eqnIDCounter).get(0)) { eqnIDCounter++; }
						var newEqn = textEd.document.createElement('span');
						$(newEqn).attr('id', 'eqn_' + eqnIDCounter);
						$(newEqn).addClass('eqn inline');
						console.log($('<p></p>').append(newEqn).html());
						var convert = !textEd.window.getSelection().isCollapsed;
						if (convert) {
							textEd.window.getSelection().getRangeAt(0).surroundContents(newEqn);
						} else {
							var newnode = textEd.document.createTextNode(" ");
							newEqn.appendChild(newnode);
						}
						textEd.execCommand("inserthtml", "&nbsp;" + $('<p></p>').append(newEqn).html() + "&nbsp;");
						var rng = textEd.document.createRange();
						var eqnID = textEd.document.getElementById("eqn_" + eqnIDCounter);
						if (convert) {
							rng.selectNodeContents(eqnID);
							rng.collapse(false);
						} else {
							rng.setStart(eqnID.childNodes[0],0);
							rng.setEnd(eqnID.childNodes[0],1);
						}
						var sel = textEd.window.getSelection();
						sel.removeAllRanges();
						sel.addRange(rng);
						// ed.selection.setNode(newEqn);
						// ed.selection.select(ed.dom.select('#'+newEqnID)[0].firstChild);
					}
				}


			}