function () {
			// Must use an element that isn't display:hidden or visibility:hidden for iOS
			// so create a special blur element to use
			if(!$blurElm)
				$blurElm = $('<input style="width:0; height:0; opacity:0" type="text" />').appendTo($editorContainer);
			
			$blurElm.removeAttr("disabled")
                 		.focus()
                 		.blur()
                 		.attr("disabled", "disabled");

			return this;
		}