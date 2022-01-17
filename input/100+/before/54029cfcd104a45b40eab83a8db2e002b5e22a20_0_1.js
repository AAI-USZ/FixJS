function() {

		$(this).each(function() {

			MathJaxQueue.Push(['Typeset',MathJax.Hub,this]);

		});

	}