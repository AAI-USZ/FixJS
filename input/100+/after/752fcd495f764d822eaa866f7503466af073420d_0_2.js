function(e) {

	/* tilda key double pressed to activate */

	if(e.keyCode==192){

		if(presses!=0){

			/*	deactivate if activated	*/

			if(active){

				resetAll();

				active = false;

			}

			/*	activate if deactivated	*/

			else {

				active = true;

			}

		}

		else {

			presses = 1;

			presses = setTimeout('presses=0;', 300);

		}

		return false; /* overrides brower's default behavior for these keys */

	}



	/* escape or backspace */

	else if((e.keyCode==27 || e.keyCode==8) && active){

		/* only override browser default action if user entered text */

		if(searchText.length>0){

			resetAll();

			return false;

		}

		

	}

	/* arrow right */

	else if(e.keyCode==39 && active){

		if(targetCounter>matchingElements.length+1){

			targetCounter=0;

		}

		else {

			targetCounter++;

		}

		targetElement = matchingElements[targetCounter];

		shiftHighlight(targetElement);

		return false; /* overrides brower's default behavior for these keys */

	}

	/* arrow left */

	else if(e.keyCode==37 && active){

		if(targetCounter>1){

			targetCounter--;

		}

		else {

			targetCounter = matchingElements.length-1;

		}

		targetElement = matchingElements[targetCounter];

		shiftHighlight(targetElement);

		return false; /* overrides brower's default behavior for these keys */

	}



	try {

		targetElement = matchingElements[targetCounter];

		shiftHighlight(targetElement);

	}

	catch(err){

		alert(err.message);

	}

}