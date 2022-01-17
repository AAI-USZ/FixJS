function isEmptyIE9Li(li) {

				// only consider this to be last item if there is no list item content or that content is nbsp or space since IE9 creates these

				var lis = tinymce.grep(li.parentNode.childNodes, function(n) {return n.tagName == 'LI'});

				var isLastLi = li == lis[lis.length - 1];

				var child = li.firstChild;

				return tinymce.isIE9 && isLastLi && (child.nodeValue == String.fromCharCode(160) || child.nodeValue == String.fromCharCode(32));

			}