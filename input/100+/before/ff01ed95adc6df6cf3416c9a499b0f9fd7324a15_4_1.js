function(iframe) {
		var slide = iframe.parentNode,
			src = iframe.src || iframe.getAttribute('data-src');
		
		slide.classList.add('iframe');
		
		if(!slide.classList.contains('notitle')) {
			var h = document.createElement('h1'),
			    a = document.createElement('a'),
			    title = iframe.title || slide.title || slide.getAttribute('data-title') || src.replace(/\/#?$/, '')
							 .replace(/^\w+:\/\/w{0,3}\.?/, '');
			
			a.href = src;
			a.target = '_blank';
			a.textContent = title;
			h.appendChild(a);
			
			slide.appendChild(h);
		}
	}