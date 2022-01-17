function($) {
	var myModule = {
		// wrap the selected text in apropriate tags // makes words in bold/italic/underline
		format: function(tag, span) {
			var s = window.getSelection()
			, newstring = ''
			, find = s.toString() // get the selection
			, string = span.html()
			, stringcpy = string;

			var sel;
			if (window.getSelection) {
				sel = window.getSelection();
				if (sel.rangeCount) {
					sel = sel.getRangeAt(0);
				}
			} else if (document.selection) {
				sel = document.selection.createRange();
			}

			console.log(sel);

			if(!find.trim()) return; // if nothing is selected

			var t = '<'+tag+'>';
			string = string.replace(t, '');
			t = '</'+tag+'>';
			string = string.replace(t, '');
			if(string != stringcpy) return string;

			newstring += '<'+ tag +'>' + find + '</'+ tag +'>'; // wrap in apropriate tag
			return string.replace(find, newstring); // replace the old word with the wrapped word
		},
		removeHeadings: function(string) {
			return string.replace(/<.h?.>/gi, '');
		},
		insertHiperlink: function(that, span) {
			var s = window.getSelection()
				, newstring = ''
				, find = s.toString();

			if(!$('input', that).length)
				$('<input type="text">').appendTo(that)
					.on('keyup', function(e){
					var code = (e.keyCode ? e.keyCode : e.which);
					if(code == 13) {
						
						newstring += '<a href="http://'+$(this).val()+'">';
						newstring += find;
						newstring += '</a>';
						
						var string = span.html().replace(find, newstring);

						$(this).remove();
						span.html(string);
					}
				}).focus();
		},
		// wrap the span in various tags
		paragraph: function(tag, span) {
			var content = this.removeHeadings(span.html());
			span.html('<' +tag + '>' + content + '</' + tag + '>');
		},
		// align the text
		align: function(tag, span) {
			if(!span) return;
			var align = $('.alignment', span);
			if(align.length) { // if a class to align the element exists
				if(tag === 'center') { // if we want to center just remove the outer div
					span.html(align.html());
				} else { // just replace the class
					align.removeClass();
					align.addClass('alignment pull-' + tag);
				}
			// no previous alignment so just add the apropriate class
			} else span.html('<div class="alignment pull-' +tag + '">' + span.html() + '</div>');
		},
		checkLineBreaks: function(span) {
			if(!span) return false;
			var count = span.html().match(/(<div>)?<br>|(<div>)+/gi);
			if(count && count.length) {
				return true;
			} else {
				return false;
			}
		},
		trim: function(string) {
			console.log(string);
			return string.replace(/<div><br><\/div>/gi, '<br>');
		},
		tryToCreateList: function(span) {
			// we check the selected span for line breaks
			var response = this.checkLineBreaks(span);
			if(response) {
				// if we find any we turn those into a list
				var trim = this.trim(span.html());
				var html = '<li>' + trim.replace('<div>', '</li><li>');
				html = html.replace(/<div>/gi, '<li>')
							.replace(/<\/div>/gi, '</li>');
				span.html(html);
				return true; // we created a list
			} else {
				return false; // no list
			}
		}
	};

	return myModule;
		
}