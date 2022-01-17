function(err)
            {
                console.log('An editor has been occoured opening the editor');
                $('#al_dialog').html(err.responseText);
                $('#al_dialog').dialog('open');
            }