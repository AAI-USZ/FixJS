function highlightSelection(e) 
{
    selection = window.getSelection();
    
    //Skip this section if mouse event is undefined
    if (e != undefined)
    {
    
        //Ignore right clicks; avoids odd behavior with CTRL key
        if (e.button == 2)
        {
            return;
        }

        //Exit if CTRL key is held while auto highlight is checked on
        if(imedBool && e.ctrlKey)
        {
            return;
        }
        
        //Exit if CTRL key not held and auto highlight is checked off
        if(!imedBool && !e.ctrlKey)
        {
            return;
        }
    }
    
    var selectionTagName;
    //Avoid inputs like the plague..
    try {
        selectionTagName = selection.anchorNode.childNodes[0].tagName.toLowerCase();
    } catch (err) {
        //fail silently :-D
    }
    if (selectionTagName == "input") {
        return;
    }
    
    // Clear all highlights if requested
    if (clearBetweenSelections && highlightedPage == true)
    {
        clearHighlightsOnPage();
    }
    
    var selectedText = window.getSelection().toString().replace(/^\s+|\s+$/g, "");
    var testText = selectedText.toLowerCase();
    
    //Exit if selection is whitespace or what was previously selected
    if (selectedText == '' || lastText == testText)
    {
        return;
    }
    
    if (selection.toString() != '') {
        var mySpan = document.createElement("span");
        var prevSpan = document.getElementById("mySelectedSpan");
        if (prevSpan != null) {
            prevSpan.removeAttribute("id");
        }
        mySpan.id = "mySelectedSpan";
        var range = selection.getRangeAt(0).cloneRange();
        mySpan.appendChild(range.extractContents());
        range.insertNode(mySpan);
    }
    
    //Perform highlighting
    localSearchHighlight(selectedText, singleSearch);
    highlightedPage = true;
    
    //Store processed selection for next time this method is called
    lastText = testText;
    if (selection.toString() != '') {
        if (!triggeredOnce) {
            triggeredOnce = !triggeredOnce;
        }
    }
}