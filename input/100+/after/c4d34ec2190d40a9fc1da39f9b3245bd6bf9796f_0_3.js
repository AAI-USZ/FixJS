function initialiseEditor() {
	$('body').append("<div class='claro' id='textEditorContainer'><div id='textEditor'></div></div>");
	require(["dijit/Editor",
		"dojo/parser",
		"dojo/domReady!",
		"dijit/_editor/plugins/FontChoice",
		"dijit/_editor/plugins/LinkDialog",
		"dojox/editor/plugins/TextColor"],
		function(Editor){
			textEd = new Editor({
				plugins: ["bold","italic","|","cut","copy","paste","|","insertUnorderedList"],
				extraPlugins : ["fontName","fontSize","formatBlock","foreColor","hiliteColor","|","createLink"],
				setupDefaultShortcuts: function(){}
			}, "textEditor");

			textEd.addStyleSheet("../../css/page_layout.css");

			textEd.connect(textEd, "onKeyPress", function(e){
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
					// Pressed Ctrl-$ in inline? Ignore
					if (e.charCode == DOLLAR && $(caretNode).hasClass('display')) {
						e.preventDefault();
						e.stopPropagation();
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


			});
			// Update content box every time user presses a key.
			// TODO: Less intensive update scheme? (eg track caret position and update only updated elements?) Complicated!
			textEd.connect(textEd, "onKeyUp", function(e){

/*				if (e.keyCode == KEYLEFT
					&& ed.selection.isCollapsed()
					&& ed.selection.getRng(true).startOffset == 0
					&& ed.selection.getRng(true).startContainer.parentElement.nodeName == 'SPAN') {
						e.preventDefault();
						e.stopPropagation();
						console.log('cursor leaving SPAN keyup');
				}*
*/
				loadEditorToBox(edCurrentTarget);
			});
			textEd.connect(textEd, "onKeyDown", function(e){
/*
				if (e.keyCode == KEYLEFT
					&& ed.selection.isCollapsed()
					&& ed.selection.getRng(true).startOffset == 1
					&& ed.selection.getRng(true).startContainer.parentElement.nodeName == 'SPAN') {
						e.preventDefault();
						e.stopPropagation();
						console.log('cursor left leaving SPAN keydown');
						//var rng = ed.selection.getRng(true);
						//rng.setStart(rng.startContainer, 0);
						//rng.collapse(true);
				} else if (e.keyCode == KEYRIGHT
					&& ed.selection.isCollapsed()
					&& ed.selection.getRng(true).startOffset == ed.selection.getRng(true).startContainer.nodeValue.length
					&& ed.selection.getRng(true).startContainer.parentElement.nodeName == 'SPAN') {
						e.preventDefault();
						e.stopPropagation();
						console.log('cursor right leaving SPAN keydown');
				}*/

				// Prevent carriage return in box. Dojo gets overactive with the <br /> if you don't.
				if ($(textEd.window.getSelection().anchorNode.parentNode).hasClass('eqn')) {

					switch (e.keyCode) {
						case 13:
							// Prevent enter key in equations
							e.preventDefault();
							e.stopPropagation();
							break;
					}
				}

			});
		}
	);
	hideEditor();
}