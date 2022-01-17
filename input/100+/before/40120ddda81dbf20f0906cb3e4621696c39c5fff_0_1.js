function($){
         $('#main').html('<pre></pre>');
         $('#main > pre').load('README.txt');
         $('#output').hide();
// load jQuery UI
    $('div').addClass('ui-widget ui-widget-content ui-corner-all ');
    $('p').addClass('ui-dialog-content ui-widget-content');
    $('input').addClass('ui-dialog-content ui-widget-content');
    $('button').addClass('ui-dialog-content ui-widget-content');
    $('select').addClass('ui-dialog-content ui-widget-content');
    $('textarea').addClass('ui-dialog-content ui-widget-content');
    $('legend').addClass('ui-widget-header ui-corner-all ');
    $('h1').addClass('ui-widget-header ui-corner-all ');
    $('h2').addClass('ui-widget-header ui-corner-all ');
    $('h3').addClass('ui-widget-header ui-corner-all ');
    $('h4').addClass('ui-widget-header ui-corner-all ');
    $('h5').addClass('ui-widget-header ui-corner-all ');
    $('#date').datepicker();
    $( "#accordion" ).accordion({
    collapsible: true
    });
   $( "#accordion > div" ).height('90');
   $('#qr').click(function(t) {
         if ($(this).val() == 'true') {
            $(this).attr('value', 'false');
            $(this).removeAttr('checked');
         } else {
            $(this).attr('value', 'true');
            $(this).attr('checked', 'checked');
         }
         $(this).blur();
   });

    $('#mklabel').click(function(e){
      e.preventDefault();
      var url = $('#maker form').attr('action');
      var $desc;
      var $code=$('#label1 :selected').val()+$('#label2 :selected').val()+$('#label3 :selected').val();
//      alert($code);
      switch ($( "#accordion" ).accordion( "option", "active" )) {
         case 1: // tel
            $desc="tel:"+$('#tel').val();
         break;
         case 2: //url
            $desc=$('#url').val();
         break;
         case 3: //email
            $desc=$('#email').val();
         break;      
         default:
            $desc = "label code: "+$code+$('#unit :selected').val()+" | ";
            $desc +="Type: "+$('#type :selected').val()+" | "+"Department: "+$('#department :selected').val()+" | ";
            $('#url').attr('value', url);
            $desc +="Date: "+$('#date').val()+" | ";            
      }

      // /level/size/label/desc
      var $get;
      if ($('#qr').val() == 'false') {
         $get=url+'/label/'+$code+$('#unit :selected').val();
      } else {
         $get=url+'/QR/'+$('#level :selected').val()+'/'+$('#size :selected').val()+'/'+$code+$('#unit :selected').val()+'/'+$desc+'/';         
      }

      
     // document.location.href=$get;
      
    // alert($get);
      $.get($get, function(i){
         $('#img').attr('src', i); //.show();         
         $('#output').show();
         $('#img').click(function(e){
            e.preventDefault();
            var img=$(this).attr('src');
            var page = jQuery.parseJSON($('#page_size :selected').val());
            
            var html = '<table id="print_sheet">';
            for (var y = 0; y < page.y; y++ ) {
                html += '<tr>';
                for (var x=0; x < page.x; x++) {
                    html+='<td class="td_label" id="'+x+'x'+y+'" style="width:'+page.width+'; height: '+page.height+';" ><img class="label" src="'+img+'" /></td>';
                }
                html +='</tr >';
            }
            html += '</table>';
            $('#print_view').remove();
            $('#td_w').remove();
            $('#td_h').remove();
            $('#img_w').remove();
            $('#img_h').remove();
            $('#label_xy').remove();
            $('#output').append('<button id="print_view">Print Page</button><input type="text" size="2" id="td_w"/><input size="2" type="text" id="td_h"/> <input  size="2" type="text" id="img_w"/><input size="2" type="text" id="img_h"/>');
            $('#output').append('<input type="text" size="20" id="label_xy"/>');
            $('button').addClass('ui-dialog-content ui-widget-content');
            $('#main').html(html);
            $('#td_w').val(page.width);
            $('#td_h').val(page.height);
            $('#img_w').val($('#img').width());
            $('#img_h').val($('#img').height());

            $( "#img" ).resizable({ alsoResize: ".label" });
            $( ".label" ).resizable({
                        aspectRatio: true
	    }).draggable({
               containment: "#print_sheet > tr > td", scroll: false
            }).click(function(){
               	  var s = $( this ).attr('style');
                  $('#label_xy').attr('value', s);
                  $('.label').attr('style', s);
                  $(this).blur();
            });
            //
            $( "#0x0" ).resizable({ alsoResize: ".td_label" });
            $( ".td_label" ).resizable({
                        aspectRatio: .75
	    });
            
            
            $('#print_sheet .ui-wrapper').css('width',$('#td_w').val()).css('height', $('#td_h').val()).css('text-align','center').css('vertical-align', 'middle');
            //$('#output .ui-wrapper').css('width',$('#td_w').val()).css('height', $('#td_h').val()).css('text-align','center').css('vertical-align', 'middle');
            $('.label').css('width', $('#img_w').val()).css('height', $('#img_h').val()).css('margin', 'auto');
            
            $('#print_view').click(function(){
                var url = $('#maker form').attr('action');
                var page = jQuery.parseJSON($('#page_size :selected').val());

                document.location.href=url+'/print/'+$('#td_w').val()+'/'+$('#td_h').val()+'/'+page.x+'/'+page.y+'/'+$('#label_xy').val().replace(/ /g,'')+'?'+img;
                $(this).blur();
            });
            $(this).blur();
         });
         }, "text"
      );
    });



    
}