function shiftHighlight(target) {

	if(target){

		var elPos = findPosition(target);

		var elTop = elPos['top'].toString()+'px';

		var elLeft = elPos['left'].toString()+'px';



		highlight.style.top = elTop;

		highlight.style.left = elLeft;

		//highlight.style.left = target.offsetLeft.toString()+'px';

		//highlight.style.top = target.offsetTop.toString()+'px';

		highlight.style.width = target.offsetWidth.toString()+'px';

		highlight.style.height = target.offsetHeight.toString()+'px';



		/* scroll window to that element */

		/* NOTE: findPosition returns position as string "0px" */

		window.scrollTo(parseInt(elLeft)-100, parseInt(elTop)-100);

	}

	

}