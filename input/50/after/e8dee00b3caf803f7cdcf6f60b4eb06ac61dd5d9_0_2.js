function openEditor (e) {
			var editor = INNERCONTEXT.UTILITY.assemble('ImageEditorElement', INNERCONTEXT.TEMPLATES.imageEditor());
			$.fn.prepend.apply(INNERCONTEXT.DOM.body, editor);
		}