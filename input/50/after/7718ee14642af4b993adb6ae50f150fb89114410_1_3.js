function() {
                    $( this ).dialog( "close" );
                    var jid = $(that).parent().attr('data-recipient');
                    xmppchat.Roster.unsubscribe(jid);
                }