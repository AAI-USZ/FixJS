function (text, endText) {
			var range, start, end, txtLen;
			
			textEditor.focus();
			
			if(textEditor.selectionStart)
			{
				start	= textEditor.selectionStart;
				end	= textEditor.selectionEnd;
				txtLen	= text.length;
				
				if(endText)
					text += textEditor.value.substring(start, end) + endText;
				
				textEditor.value = textEditor.value.substring(0, start) + text + textEditor.value.substring(end, textEditor.value.length);
				
				if(endText)
					textEditor.selectionStart = (start + text.length) - endText.length;
				else
					textEditor.selectionStart = start + text.length;
				
				textEditor.selectionEnd = textEditor.selectionStart;
			}
			else if(document.selection.createRange)
			{
				range = document.selection.createRange();
				
				if(endText)
					text += range.text + endText;
				
				range.text = text;
				
				if(endText)
				{
					range.moveEnd('character', 0-endText.length);
					range.select();
				}
			}
			else
				textEditor.value += text + endText;
			
			textEditor.focus();
		}