function($s) {
			// a quick example of paste-code-and-automatically-format-it
			// highlightAuto returns an object if the pasted code is recognised
			$s.html($s.html().replace(/(<([^>]+)>)/ig,""));
			var result = hljs.highlightAuto($s.html());

			if(result.keyword_count > 2) {
				// more than 2 because words like `if` can be interpreted as code
				$s.replaceWith('<pre contentEditable><code contentEditable>'+result.value+'</code></pre>');
				var $code = $('code', getCurrentSlide());
				$code.on('click', function(e){
					e.stopPropagation();
				});
				var content = $code.html();
				$code.html(htmlEntites(content));
			}
		}