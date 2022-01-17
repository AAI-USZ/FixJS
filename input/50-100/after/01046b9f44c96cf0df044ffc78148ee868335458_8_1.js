function isAtStart(rng, par) {

		var doc = par.ownerDocument, rng2 = doc.createRange(), elm;



		rng2.setStartBefore(par);

		rng2.setEnd(rng.endContainer, rng.endOffset);



		elm = doc.createElement('body');

		elm.appendChild(rng2.cloneContents());



		// Check for text characters of other elements that should be treated as content

		return elm.innerHTML.replace(/<(br|img|object|embed|input|textarea)[^>]*>/gi, '-').replace(/<[^>]+>/g, '').length == 0;

	}