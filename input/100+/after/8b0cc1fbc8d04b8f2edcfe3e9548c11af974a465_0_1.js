function(){
  
  var doc   = window.document,
      docElem = doc.documentElement,   
      parent  = doc.createElement( "div" ),
      child = doc.createElement( "div" ),
      childb  = doc.createElement( "div" ),
      ret;
          
  parent.appendChild( child );
  parent.appendChild( childb );
  docElem.insertBefore( parent, docElem.firstChild );
  
  parent.style.cssText = "display: table";
  child.style.cssText = childb.style.cssText = "display: table-cell; padding: 10px";
  
  ret = child.offsetLeft < childb.offsetLeft;
  docElem.removeChild(parent);
  return ret; 
}