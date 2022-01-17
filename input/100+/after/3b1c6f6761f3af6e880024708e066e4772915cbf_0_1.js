function(e) {
			base.closeDropDown();
			
			var $parentNode = $(rangeHelper.parentNode());

			// "Fix" (ok it's a cludge) for blocklevel elements being duplicated in some browsers when
			// enter is pressed instead of inserting a newline
			if(e.which === 13)
			{
				if($parentNode.is('code,blockquote,pre') || $parentNode.parents('code,blockquote,pre').length !== 0)
				{
					lastRange = null;
					base.wysiwygEditorInsertHtml('<br />', null, true);
					return false;
				}
			}

			// make sure there is always a newline after code or quote tags
			var d = getWysiwygDoc();
			$.sceditor.dom.rTraverse(d.body, function(node) {
				if((node.nodeType === 3 && node.nodeValue !== "") ||
					node.nodeName.toLowerCase() === 'br') {
					// this is the last text or br node, if its in a code or quote tag
					// then add a newline after it
					if($(node).parents('code, blockquote').length > 0)
						$(d.body).append(d.createElement('br'));

					return false;
				}
			}, true);

			// don't apply to code elements
			if($parentNode.is('code') || $parentNode.parents('code').length !== 0)
				return;
			
			var i = keyPressFuncs.length;
			while(i--)
				keyPressFuncs[i].call(base, e, wysiwygEditor, $textEditor);
		}