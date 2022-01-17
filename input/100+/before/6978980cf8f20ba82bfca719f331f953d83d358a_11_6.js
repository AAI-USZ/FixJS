function create( tag, sleft, stop ){
    var el = document.createElement( tag );

    if( tag == "div" )
    	el.style.overflow = "scroll";

    el.value = el.innerHTML = new Array( 500 ).join( "A B C D E " );

    if( typeof sleft != "undefined" )
        el.scrollLeft = sleft;

    if( typeof stop != "undefined" )
    	el.scrollLeft = stop;

    document.body.appendChild( el );
    var El = baidu.dom( el );
    El.remove = function(){
        document.body.removeChild( el );
    }

    return El;
}