function()

  {

    var context = $( this );

    var title = $.trim( context.find( '> b, > strong' ).eq(0).text() ) || 'Live Cypher Console';

    title = title.replace( /\.$/, '' );

    var database = context.find( 'span.database' ).eq(0).text();

    if ( !database ) return;

    var command = context.find( 'span.command > strong' ).eq(0).text();

    if ( !command ) return;

    var button = $( '<button class="cypherconsole" type="button"><img src="css/utilities-terminal.png" /> ' + title + '</button>' );

    button.click( function()

    {

      handleCypherClick( button, database, command, title );

    });    

    button.insertAfter( this );

  }