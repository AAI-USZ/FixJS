function( button_group, querystring ){
    var a = document.createElement( 'a' )
    a.className = button_group.querySelector( 'a' ).className;
    a.href = '?' + querystring;
    a.title = 'Toggle Whitespace';
    a.textContent = ' \u2423 ';

    var li = document.createElement( 'li' )
    li.appendChild( a );

    button_group.insertBefore( li, button_group.firstChild );
  }