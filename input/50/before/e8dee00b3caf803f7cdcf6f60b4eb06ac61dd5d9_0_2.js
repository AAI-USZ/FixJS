function openEditor (e) {
			$.fn.prepend.apply(dom.body, util.assemble('ImageEditorElement', templates.imageEditor()));
		}