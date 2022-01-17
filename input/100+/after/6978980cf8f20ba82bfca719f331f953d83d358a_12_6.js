function create( tag, sLeft, sTop ){
    var el = document.createElement( tag );
    document.body.appendChild( el );
    
    
    if( tag == "div" )
    	el.style.overflow = "scroll";
    
    el[tag === 'textarea' ? 'value' : 'innerHTML'] = new Array(50).join('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<br/>\n');
    
    el.style.width =
    el.style.height = '100px';

    if( typeof sLeft != "undefined" )
        el.scrollLeft = sLeft;

    if( typeof sTop != "undefined" )
    	el.scrollTop = sTop;

    
    var El = baidu.dom( el );
    El.remove = function(){
        document.body.removeChild( el );
    }

    return El;
}