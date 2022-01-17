function putButtons() 

{

  //Find the Send button

  if(!theframe.getElementById('encript'))

  {

    

    var sendrow = getElementsByAttribute(theframe, "input", "name", "subject");

    var buttonSend = getElementsByAttribute(theframe, "div", "class", "T-I J-J5-Ji Bq nS T-I-KE L3");

	addEventToElement(buttonSend, sendButtonClick, 'keydown');    

    //If we don't find the row with the Send button on it then wait for a second

    //and try again

    if (!sendrow || !buttonSend) {

        return;    

    }

    

    trackURL = false;

    

    //Adding encrypt button

    var encryptDiv = theframe.createElement('div');

    encryptDiv.setAttribute("id", "encryptBtn");

    encryptDiv.setAttribute("class", "T-I J-J5-Ji Bq nS T-I-KE L3");

    encryptDiv.setAttribute("role", "button");

    encryptDiv.setAttribute("tabindex", "2");

    encryptDiv.setAttribute("style", "-webkit-user-select: none");

    encryptDiv.innerHTML = "<b style='-webkit-user-select: none; '>Encrypt</b>";

    

    buttonSend.parentNode.insertBefore(encryptDiv, buttonSend.nextSibling);

    

    //var encryptHtmlString = '<div id="encryptBtn" class="" role="button" tabindex="2" style="-webkit-user-select: none; "></div>';		

    //buttonSend.parentNode.innerHTML += encryptHtmlString;

    var encryptButton = getElementsByAttribute(theframe, "div", "id", "encryptBtn");

    

    addEventToElement(encryptButton, encryptBtnClick);

    

    

    var place = sendrow.parentNode.parentNode.parentNode;

    //Make sure we have not already added the buttons to this tag

    for (var k = 0; k < place.childNodes.length; k++) {

        knode = place.childNodes[k];

        if (knode.id == "encryptdiv") {

            return;

        }

    }

    

    //Adding encrypt checkbox

    var encryptCBoxRow = theframe.createElement("tr");	

    encryptCBoxRow.setAttribute("id", "encript");

    var htmlString = '<td class="eD">Encrypt?</td><td><input type="checkbox" name="boom" id="boom" style="margin-right:5px;" /></td>';

    encryptCBoxRow.innerHTML = htmlString;

    place.insertBefore(encryptCBoxRow, sendrow.nextSibling);

    

    

    //Adding encrypt checkbox

    var qaRow = theframe.createElement("tr");	

    qaRow.setAttribute("id", "encriptQA");

    htmlString = '<td></td><td><table id="q_and_a" style="display:none"><tr id="encryptdiv"><tr><td colspan="2" class="eD">Type a Question and Secret Answer that only the recipient can answer.</td></tr><tr><td class="eD">Question:</td><td><input type="text" id="textAreaS" name="question" style="width:100%" /></td></tr><tr><td class="eD">Answer:</td><td><input type="text" id="textAreaE" name="answer" style="width:100%" /></td></tr></td></tr></table></td>';

    qaRow.innerHTML = htmlString;

    place.insertBefore(qaRow, sendrow.nextSibling);

    

    addEventToElement(theframe.getElementById('boom'), showHideQA); 

    	

    

    //go back and recreate the buttons after any form inputs

    return;

    }

}