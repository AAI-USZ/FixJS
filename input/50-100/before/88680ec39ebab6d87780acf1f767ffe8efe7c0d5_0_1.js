function(event){
	var ev = window.event || event ;
  var evType = String(ev.type);
  var menu = eXo.core.DOMUtil.findFirstDescendantByClass(this, "div","HoverMenu");
  if (evType == "mouseover" || evType == "onfocus"){
    menu.style.display="block";
  } else{
    menu.style.display="none";
  }  
}