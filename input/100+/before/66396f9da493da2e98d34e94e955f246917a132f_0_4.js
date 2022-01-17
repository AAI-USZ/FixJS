fD('getCTars ');
    var ret=[];
	
	var cname=this.element.dataset.keypad;
	var els=(cname)? this.element.getElementsByClassName(cname): this.element.getElementsByTagName('*');
    
    els=Array.prototype.slice.call(els);
    els.push(this.element);
//D('getCTars2 '+els+' '+els.length+' '+cname);
	
	var regcname=new RegExp("(^|\\s)" + cname + "(\\s|$)");
    
    for( var i=0, tpos, touch; touch=this.tpos.current[i]; i++ ){
//D('getCTars4 '+i+':'+touch.x+','+touch.y);
		
		for( var k=0, el; el=els[k]; k++ ){
//D('getCTars5 '+k+':'+el.nodeName+','+el.childNodes.length+' '+el.className+':'+regcname.test(el.className));
            //if( !(cname && regcname.test(el.className)) && el.childNodes.length>1 || el.firstChild.nodeType===1 ){
            if( el.className && regcname.test(el.className) ){
                ;
            }else{
                if( el.childNodes.length>1 || el.firstChild && el.firstChild.nodeType===1 ){
//D('getCTars con '+k);
                    continue;
                }
            }
//D('getCTars6 '+k);
			var rect=el.getBoundingClientRect();
//D('getCTars7 '+rect.left+','+rect.top);
			if( rect.left<=touch.x && touch.x<=rect.right && rect.top<=touch.y && touch.y<=rect.bottom ){
//D('getCTars break '+ret.length);
				ret[ret.length]=el;
				break;
			}
	    }
	}
    
D('_getCTars; '+ret+' '+ret.length);
//D('_getTars; '+ret+' '+ret[0].nodeName+' '+((ret[0].childNodes.length)?ret[0].childNodes.length+' '+ret[0].firstChild.nodeType:'')+' '+ret[0].dataset.n);
	return ret;
},
