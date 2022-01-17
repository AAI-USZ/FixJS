function($){
         $('#main').html('<pre></pre>');
         $('#main > pre').load('README.txt');
// load jQuery UI
    $('div').addClass('ui-widget ui-widget-content ui-corner-all ');
    $('p').addClass('ui-dialog-content ui-widget-content');
    $('input').addClass('ui-dialog-content ui-widget-content');
    $('select').addClass('ui-dialog-content ui-widget-content');
    $('textarea').addClass('ui-dialog-content ui-widget-content');

    $('h1').addClass('ui-widget-header ui-corner-all ');
    $('h2').addClass('ui-widget-header ui-corner-all ');
    $('h3').addClass('ui-widget-header ui-corner-all ');
    $('h4').addClass('ui-widget-header ui-corner-all ');
    $('h5').addClass('ui-widget-header ui-corner-all ');


         $('#label').click(function(){
            var img=$(this).attr('src');
            var page = jQuery.parseJSON($('#page_size :selected').val());
            var html = '<table id="print_sheet">';
            for (var y = 0; y < page.y; y++ ) {
                html += '<tr>';
                for (var x=0; x < page.x; x++) {
                    html+='<td id="'+x+'x'+y+'" style="width:'+page.width+'; height: '+page.height+';" ><img style="width:'+page.width+'; height: '+page.height+';" src="'+img+'" /></td>';
                }
                html +='</tr >';
            }
            html += '</table>';
            $('#print_view').remove();
            $('#maker').append('<button id="print_view">Print Page</button>');
                $('button').addClass('ui-dialog-content ui-widget-content');
            $('#main').html(html);
            $('#print_sheet td').addClass('label');
            $('.label').css('width', page.width).css('height', page.height);
            $('.label > img').css('width', page.width).css('height', page.height); 
            $('#print_view').click(function(){
                var p=new Object();
                p.img=img;
                p.width=page.width;
                p.height=page.height;
                p.x=page.x;
                p.y=page.y;
                ;
                var json = JSON.stringify(p);
                var url = $('#maker form').attr('action');
                document.location.href=url+'?print='+json;
                $(this).blur();
            });
            $(this).blur();
         });
    
}