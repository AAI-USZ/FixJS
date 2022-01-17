function(element, event) {
	
	var e = Wicket.Event.fix(event)
	var key = event.keyCode;
	
	if (key == 13 || key == 27)
  {
		if (key == 13 && Wicket.Browser.isSafari())
    {
			// somewhat ugly fix
			//but this is the only thing preventing safari
			// from submitting the form on enter
			var form = findParent(element, "FORM");
			if (form != null)
      {
				form.imxtOldOnSubmit = form.onsubmit;
				form.onsubmit=function() { return false; };
				window.setTimeout(function()
                          {
                            form.onsubmit = form.imxtOldOnSubmit;
                            form.imxtOldOnSubmit = null;
                          }, 100);
			} 
		}		
		
		var row = element;
		
		do { row = findParent(row, "TR"); }
    while (row != null && !hasClass(findParent(row, "TABLE"), "imxt-body"));
		
		if (row != null)
    {
			var elements;
			if (key == 13)
      { elements = D.getElementsByClassName("imxt-edit-submit", "A", row); }
      else { elements = D.getElementsByClassName("imxt-edit-cancel", "A", row); }
			
			if (elements != null && elements.length > 0)
      {	elements[0].onclick.bind(elements[0])(); }
		}		
	}
  return null;
}