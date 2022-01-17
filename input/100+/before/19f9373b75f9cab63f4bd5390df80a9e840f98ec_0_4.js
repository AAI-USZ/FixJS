function sortByColumn ( e ) {
    var elem = $(e);
    var numeric_sort_pattern = /^host_(cpu|memory|disk)$/;
    var target_class = elem.parent('tr').attr('target');
    var target_column = 'host_' + elem.attr('target');
    var target = [];
    var sort_field_fetch = function ( v ) {
        return $(v).children('td.'+target_column).text().replace(/^\s+/,"");
    };
    if ( target_column.match( numeric_sort_pattern ) ) {
        sort_field_fetch = function ( v ) {
            return parseInt( $(v).children('td.'+target_column).text() );
        };
    }

    elem.parent('tr').parent('tbody').children('tr').each( function(){
        if ( $(this).attr('class').match('host_outline') ) {
            if ( $($(this).children('td').get(0)).attr('class') == target_class || target_class == 'all' ) {
                target.push( $(this) );
                $(this).remove();
            }
        }
    } );
    if( elem.attr('order') == 'asc' ) {
        elem.attr('order','desc');
        $('span.sortorder').text('↓');
        $('span.sortorder').attr('title', '降順');
        target.sort(function(a,b){
            return ( sort_field_fetch(b) > sort_field_fetch(a) ? 1 : -1 );
        });
        var psUrl = buildSortUrl( target_column, 'desc', target_class );
        history.pushState(null, elem.text()+':'+'降順', psUrl);
    }
    else if( elem.attr('order') == 'desc' ) {
        elem.attr('order','asc');
        $('span.sortorder').text('↑');
        $('span.sortorder').attr('title', '昇順');
        target.sort(function(a,b){
            return ( sort_field_fetch(a) > sort_field_fetch(b) ? 1 : -1 );
        });
        var psUrl = buildSortUrl( target_column, 'asc', target_class );
        history.pushState(null, elem.text()+':'+'昇順', psUrl);
    }
    else {
        $('th.sortbtn').attr('order', false);
        $('span.sortorder').remove();
        elem.attr('order','asc');
        elem.html(elem.html()+'<span class="sortorder" title="昇順">↑</span>');
        target.sort(function(a,b){
            return ( sort_field_fetch(a) > sort_field_fetch(b) ? 1 : -1 );
        });
        var psUrl = buildSortUrl( target_column, 'asc', target_class );
        history.pushState(null, elem.text()+':'+'昇順', psUrl);
    }
    $.each( target.reverse(), function(i, e){
        $(e).click(function(ee){
            toggle_item_selection(ee, 'host');
        });
        elem.parent('tr').after(e);
    });
}