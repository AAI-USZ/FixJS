function(messages){

    var msgs = [];

    for ( var i = 0; i < messages.length; i++ ) {

      if ( IDE.htwg.editor._fileName === messages[i].source ){

        msgs.push({

            row: messages[i].row - 1,

            column: messages[i].column,

            text: messages[i].text,

            type: messages[i].type

        });

      }

    }

    return msgs;

  }