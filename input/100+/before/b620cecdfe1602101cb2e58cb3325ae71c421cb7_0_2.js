function (height) {
			if(!height)
				return $editorContainer.height();

			$editorContainer.height(height);

			height -= !base.options.toolbarContainer ? $toolbar.outerHeight(true) : 0;

			// fix the height and width of the textarea/iframe
			$wysiwygEditor.height(height);
			$wysiwygEditor.height(height + (height - $wysiwygEditor.outerHeight(true)));

			$textEditor.height(height);
			$textEditor.height(height + (height - $textEditor.outerHeight(true)));

			$wrapper.height(height);
			$wrapper.height(height + (height - $wrapper.outerHeight(true)));

			return this;
		}