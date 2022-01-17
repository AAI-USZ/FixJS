function() {

							tinymce.dom.Event.remove(DOM.win, 'resize', t.resizeFunc);

							tinyMCE.get(ed.getParam('fullscreen_editor_id')).setContent(ed.getContent());

							tinyMCE.remove(ed);

							DOM.remove('mce_fullscreen_container');

							de.style.overflow = ed.getParam('fullscreen_html_overflow');

							DOM.setStyle(DOM.doc.body, 'overflow', ed.getParam('fullscreen_overflow'));

							DOM.win.scrollTo(ed.getParam('fullscreen_scrollx'), ed.getParam('fullscreen_scrolly'));

							tinyMCE.settings = tinyMCE.oldSettings; // Restore old settings

						}