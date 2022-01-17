function shiftHighlight(target) {



	if(target){

		highlight.style.left = target.offsetLeft.toString()+'px';

		highlight.style.top = target.offsetTop.toString()+'px';

		highlight.style.width = target.offsetWidth.toString()+'px';

		highlight.style.height = target.offsetHeight.toString()+'px';



		/* scroll window to that element */

		window.scroll(target.offsetLeft-100, target.offsetTop-target.scrollTop-100);

	}

	

}