function()

  {

    var title = $.trim( $( 'b', this ).eq(0).text() ) || 'Live Cypher Console';

    title = title.replace( /\.$/, '' );

    var database = $( 'span.database', this ).eq(0).text();

    if ( !database ) return;

    var command = $( 'strong', this ).eq(0).text();

    if ( !command ) return;

    var button = $( '<button class="cypherconsole" type="button"><img src="css/utilities-terminal.png" /> ' + title + '</button>' );

    button.click( function()

    {

      handleCypherClick( button, database, command, title );

    });    

    button.insertAfter( this );

  }