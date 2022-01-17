function _addObject( link, boxID, id, name, className, sectionName, publishedTxt )
    {
        link.onclick = function(){return false;};
        link.className = 'disabled';
        var tr = $( boxID + ' table tbody tr:last-child' ), tds = tr.find('td'), listMode = tds.size() > 4;
        if ( listMode )
        {
            if ( tds[1].innerHTML !== '--name--' )
            {
                tr = tr.clone(true).insertAfter(tr);
                tds = tr.find('td').slice( 1 );
            }
            else
            {
                tds = tds.slice( 1 );
            }
            tr[0].className = tr[0].className === 'bgdark' ? 'bglight' : 'bgdark';
            var priority = tr.find('td:last-child input');
            priority.val( parseInt( priority.val() ) + 1 );
            tr.find('td:first-child input').val( id );
        }
        else
        {
            $( boxID + ' input[name*=_data_object_relation_id_]' ).val( id )
        }
        tds.eq( 0 ).html( name );
        tds.eq( 1 ).html( className );
        tds.eq( 2 ).html( sectionName );
        tds.eq( 3 ).html( publishedTxt );
        $( boxID + ' table' ).removeClass('hide');
        $(boxID + ' .ezobject-relation-remove-button').removeClass('button-disabled').addClass('button').attr('disabled', false);
        $(boxID + ' .ezobject-relation-no-relation').addClass('hide');
        $(boxID + ' input[name*=_data_object_relation_list_ajax_filled_]').val(1);
    }