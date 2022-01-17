function wireupExistingCommentEditors()
			{
				var editDivs = $('div.usertext-edit');
				$(editDivs).each(function() {
					var editDiv = this;
					
					var preview = addPreviewToParent( editDiv );
					addMarkdownEditorToForm( editDiv, preview );
				});
				
			}