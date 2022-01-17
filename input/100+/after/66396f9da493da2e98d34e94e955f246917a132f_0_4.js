function(evt){
    var ret=[];
	
	var cname=this.element.dataset.keypad;
	var els=(cname)? this.element.getElementsByClassName(cname): this.element.getElementsByTagName('*');
    
    els=Array.prototype.slice.call(els);
    els.push(this.element);
	
	var regcname=new RegExp("(^|\\s)" + cname + "(\\s|$)");
    
    for( var i=0, tpos, touch; touch=this.tpos.current[i]; i++ ){
		
		for( var k=0, el; el=els[k]; k++ ){
            if( el.className && regcname.test(el.className) ){
                ;
            }else{
                if( el.childNodes.length>1 || el.firstChild && el.firstChild.nodeType===1 ){
                    continue;
                }
            }
			var rect=el.getBoundingClientRect();
			if( rect.left<=touch.x && touch.x<=rect.right && rect.top<=touch.y && touch.y<=rect.bottom ){
				ret[ret.length]=el;
				break;
			}
	    }
	}
    
	return ret;
}