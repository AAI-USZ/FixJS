function(event){
	var ev = window.event || event ;
  var evType = String(ev.type);
  var menu =  gj(this).find('div.HoverMenu')[0];
  if (evType == "mouseover" || evType == "onfocus"){
    menu.style.display="block";
  } else{
    menu.style.display="none";
  }  
}