function($){
//    $('#output > div ').hide();
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
    $( "#accordion" ).accordion({});
    //
    $( "#qr_ecc" ).accordion({});
    $( "#label_output" ).accordion({});
    $( "#proj_label" ).accordion({});
        
    $( "#top" ).accordion({});
    $( "#add_project" ).dialog({
      title: "Add a new Project",
      autoOpen: false,
      resizable: false,
      height:200,
      width: 350,
      modal: true,
      buttons: {
       	 "Add New Project": function() {
            var p = $('#project_name').val();
            if (p == '') { $( this ).dialog( "close" ); }
            var $post = '{"project":"'+p+' " }';
            $.ajax({
               url: url+'/feed/',
               type: 'POST',
               processData: false,
               data: $post,
               dataType: 'json',
               success: function(result) {
                     $('#list_name').prepend('<option value="'+p+'">'+p+'</option>');
                     $("#add_project").dialog( "close" );
               },
               
            });
         },
         Cancel: function() { $( this ).dialog( "close" ); }
      }
    });
    // delete item from project
    $('#delete').button({
            icons: {
                primary: "ui-icon-trash"
            }
     }).click(function() {
      $.each($("li.ui-selectee.ui-selected"),function() {
         var img=$(this).find('img');
         var del=url+'/feed/'+$('#list_name').val()+'/?'+img.attr('id');
         //alert(del);
         $.ajax({
            url: del,
            type: 'DELETE',
            processData: false,
            data: del,
            dataType: 'json',
            success: function(result) {
               $('#current').empty();
               $.each(result, function(ii, p){
                  add_select_list(p);
               });
               $("#current").selectable().selectable( "refresh" );
            }
         });
      });



   });
   $('#print').button({
      icons: {
         primary: "ui-icon-print"
      }
   }).click(function(){
      var position = $('#img_label .ui-wrapper').position();
      var img=$('#img').attr('src');             
      var page = jQuery.parseJSON($('#page_size :selected').val());
      var style=fix_style(position);
      if ( ! img || ! page || ! style) {
         alert('Nothing is set in label preview to preview yet');
      } else {
                   var go=url+'/print/'+$('#img_label').width()+'px/'+$('#img_label').height()+'px/'+page.x+'/'+page.y+'/'+style+'?'+img;
                   document.location.href=go;                  
      }
      $(this).blur();
   });
    
    
    var $desc="";
    var $code="";
    var $get='';
    var url = $('#action').attr('action');
   
    $( "#img_label" ).draggable({ revert: true });
    $( "#list" ).droppable({
	activeClass: "ui-state-hover",
	hoverClass: "ui-state-active",
	drop: function( event, ui ) {
            var page = jQuery.parseJSON($('#page_size :selected').val());
            var position = $('#img_label .ui-wrapper').position();
            var style=fix_style(position);
            var img=ui.draggable.find('img').attr('src');
            var json = "{ "
               json += '"code":"'+$code+'",';
               json += '"width":"'+$('#img_label').width()+'px",';
               json += '"height":"'+$('#img_label').height()+'px",';
               json += '"x":"'+page.x+'",';
               json += '"y":"'+page.y+'",';
               json += '"img_style":"'+style+'",';
               json += '"img":"'+img+'"';
               json += "}";
            var $put=url+'/feed/'+$('#list_name :selected').val();
            $.ajax({
               url: $put,
               type: 'PUT',
               processData: false,
               data: json,
               dataType: 'json',
               success: function(result) {
                 add_select_list(result);
                 $("#current").selectable().selectable( "refresh" );
               }
            });
         }
    });
    
/* functions */
   function reset() {
      $('#img_label .ui-wrapper').draggable('destroy');
      $('#img').resizable('destroy');
      $('#img').removeAttr('style');
      $('#img_label .ui-wrapper').removeAttr('style');
      page_size();
   }

   function setup() {
      $('#img').dblclick(function(e) {
            e.preventDefault();
            reset();
            setup();
            $(this).blur();
      }).resizable({ aspectRatio: true  });
      $('#img_label .ui-wrapper').draggable({ cursor: "move", containment: '#img_label' }).height($('#img').height()).width($('#img').width());
      
   }

   function page_size() {
      var page = jQuery.parseJSON($('#page_size :selected').val());
      $( "#img_label" ).css('width',page.width).css('height', page.height).css('text-align','center').css('vertical-align', 'middle');      
   }

   function select_list() {
    var project='DEFAULT';
    if ($('#list_name :selected').val()) {
      project=$('#list_name :selected').val();
    }
    
    $('#current').empty();
    $.get(url+'/feed/'+project, function(y) {
      $.each(y, function(ii, p){
         add_select_list(p);
      });
      if(project!='DEFAULT'){
         
      }
      $('#current').selectable().selectable( "refresh" );
    }, "json");
   }
   
   function add_select_list(p) {
      var   alt=JSON.stringify(p);
      var   id=p.published.replace(/:/,'|').replace(/:/,'|').replace(/:/,'|');
      var   img=p.img;
       $("#current").prepend("<li><img src='"+img+"' alt='"+alt+"' id='"+id+"'/></li>");   
   }
   
   function fix_style(position) {
      var style='';
      if ($('#img').attr('style')) {
         style= $('#img').attr('style').replace(/ /g,'').replace(/position:static;/g,'').replace(/resize:none;/g,'').replace(/zoom:1;/g,'').replace(/display:block;/g,'')+'position:relative;left:'+position.left+ "px;top:-"+position.top/50+'px';                  
      }
      return style;
   }
/* end of functions */
    
    var url = $('#action').attr('action');
    $.get(url+"/ui.json", function(j) {
      $.each(j, function(i, item) {
       $.each(item, function(x, attr) {
             if (jQuery.isPlainObject(attr)) {
               if (attr.selected == '') {
                  $('#'+i).append('<option value=\''+attr.value+'\'  >'+attr.text+'</option>');
               } else {
                  $('#'+i).append('<option value=\''+attr.value+'\' selected=\'selected\' >'+attr.text+'</option>');
               }
             } else { $('#'+i).attr(x, attr); }   
       });
      });
     }, "json");
   $( "#accordion > div" ).height('100');
   $('#page_size').click(function(){
      reset();
      setup();
      page_size();
   });
   
   $('#mklabel').button({
            icons: {
                primary: "ui-icon-image",
                secondary: "ui-icon-image"
            }
   }).click(function(e){
      var url = $('#action').attr('action');
      $desc='';
      $code='';
      switch ($( "#top" ).accordion( "option", "active" )) {
         case 0: // resiter code coloured numbers
            $code=$('#label1 :selected').val()+$('#label2 :selected').val()+$('#label3 :selected').val();            
         break;
         case 1:
            $code=$('#alphanum1 :selected').val()+$('#alphanum2 :selected').val()+$('#alphanum3 :selected').val()+$('#alphanum4 :selected').val();
         break;
         default:
            $code=$('#label1 :selected').val()+$('#label2 :selected').val()+$('#label3 :selected').val();
      } 
      switch ($( "#accordion" ).accordion( "option", "active" )) {
         case 1: // tel
            $desc="tel:"+$('#tel').val();
         break;
         case 2: //url
            $desc=encodeURI($('#url').val());
         break;
         case 3: //email
            $desc=$('#email').val();
         break;
         case 4:
            $desc="BEGIN:VCARD";
            $desc+=" N:"+$('#vcard_name').val();
            $desc+=" TEL:"+$('#vcard_tel').val();
            $desc+=" EMAIL:"+$('#vcard_email').val();
            $desc+=" URL:"+encodeURI($('#vcard_web').val());
            $desc+=" ADR:"+$('#vcard_address').val();
            $desc+=" ORG:"+$('#vcard_coy').val();
            $desc+=" NOTE:"+$('#vcard_note').text();
            $desc+=" VERSION:3.0";
            $desc+=" END:VCARD";
         break;
         default:
            $desc ="Size:"+$code+$('#unit :selected').val()+"|";
            $desc+="Type:"+$('#type :selected').val()+"|";
            $desc+="Department:"+$('#department :selected').val();

      }

      // /level/size/label/desc

      $get=url+'/QR/'+$('#level :selected').val()+'/'+$code+'/'+$desc+'/';         
     // document.location.href=$get;
      
    // alert($get);
    
      $.get($get, function(i){
         reset();
         if (i.width > $('#img_label').width() || i.height > $('#img_label').height()) {
            $('#img').attr('src', i.img).attr('alt', 'Double Click to Reset').width($('#img_label').width()).height($('#img_label').height());
         } else {
            $('#img').attr('src', i.img).attr('alt', 'Double Click to Reset').width(i.width).height(i.height);
         }
         setup();
       }, "json" );
      $(this).blur();
    });
     select_list();
     $('#add_proj').button({
      icons: {
         primary: "ui-icon-plusthick"
      }
     }).click(function() {
      $( "#add_project" ).dialog('open');
      return false;
     });
    }