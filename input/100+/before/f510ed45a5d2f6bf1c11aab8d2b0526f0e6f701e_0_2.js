function needsFormsFix(el){

		return cache[el].useJsScroll && cache[el].isEnabled() && cache[el].el.style.display!="none";

	}