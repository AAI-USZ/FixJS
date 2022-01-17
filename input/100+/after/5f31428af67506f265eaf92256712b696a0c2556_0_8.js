function($){
//    $('#output > div ').hide();
   var $desc='demo';
   var $code='A0';
   var $lang='en';
   var $get='';
   var $qr;
   var url = $('#action').attr('action');
   var x=2;
   var y=4;
   var error = {
      400: function(jqXHR, textStatus, errorThrown) {// "HTTP/1.0 400 Bad Request"
         //alert("HTTP/1.0 400 Bad Request");
         add_error_msg(textStatus, errorThrown);
      },
      403: function(jqXHR, textStatus, errorThrown) {//"HTTP/1.0 403 Forbidden"
        add_error_msg(textStatus, errorThrown);
      },
      404: function(jqXHR, textStatus, errorThrown) { //"HTTP/1.0 404 Not Found"
         //alert("HTTP/1.0 404 Not Found");
        add_error_msg(textStatus, errorThrown);
//         select_list();
      },
      405: function(jqXHR, textStatus, errorThrown) { //"HTTP/1.0 405 Method Not Allowed"
        // alert("HTTP/1.0 405 Method Not Allowed");
        add_error_msg(textStatus, errorThrown);
      },
      410: function(jqXHR, textStatus, errorThrown) { //"HTTP/1.0 410 Gone"
         //alert("HTTP/1.0 410 Gone");
         add_error_msg(textStatus, errorThrown);
      },
      412: function(jqXHR, textStatus, errorThrown) { // "HTTP/1.0 412 Precondition Failed"
         //alert("HTTP/1.0 412 Precondition Failed");
         add_error_msg(textStatus, errorThrown);
      },
      413: function(jqXHR, textStatus, errorThrown) { //"HTTP/1.0 413 Request Entity Too Large"
         //alert("HTTP/1.0 413 Request Entity Too Large");
         add_error_msg(textStatus, errorThrown);
      }
      //,
      //: function(result) { //"HTTP/1.0 404 Not Found"
      //   alert("HTTP/1.0 404 Not Found");
      //},
      //: function(result) { //"HTTP/1.0 404 Not Found"
      //   alert("HTTP/1.0 404 Not Found");
      //},
   };


   /**  Start of REST Request functions */

   function add_project() {
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
            $('#http_error').remove();
         },
         statusCode: error
      });
   }

   function label_delete() {
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
               $.each(result, function(ii, p){ add_select_list(p); });
               $("#current").selectable().selectable( "refresh" );
               $('#http_error').remove();
            },
            statusCode: error
         });
      });
   }
   
   function label_put( event, ui ) {
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
            $( "#label_output" ).hide();
            $("#current").selectable().selectable( "refresh" );
            $('#http_error').remove();
            $('#mklabel').show();
         },
         statusCode: error
      });
   }

   function select_list() {
      var project='DEFAULT';
      if ($('#list_name :selected').val()) {
         project=$('#list_name :selected').val();
      }
      $('#current').empty();
      $.ajax({
         url: url+'/feed/'+project,
         type: 'GET',
         processData: false,
         dataType: 'json',
         success: function(y) {
            $.each(y, function(ii, p){
               add_select_list(p);
            });
            if(project!='DEFAULT'){
         
            }
            $('#current').selectable({filter: "li"}).selectable( "refresh" );
            $('#http_error').remove();
         },
         statusCode: error
      });
   }
   
   function get_qr_label() {
      // /level/size/label/desc
      switch ($( "#top" ).accordion( "option", "active" )) {
         case 0: case 1:
            $get=url+'/QR/'+$('#level :selected').val()+'/'+$code+'/'+$desc+'/?'+$lang;
         break;
      }
      
      $('#http_error').remove();
      // document.location.href=$get;   
      $.ajax({
         url: $get,
         type: 'GET',
         processData: false,
         dataType: 'json',
         success:function(i){
            reset();
            $('#http_error').remove();
            if (i.width > $('#img_label').width() || i.height > $('#img_label').height()) {
               $('#img').attr('src', i.img).attr('alt', 'Double Click to Reset').width($('#img_label').width()).height($('#img_label').height());
            } else {
               $('#img').attr('src', i.img).attr('alt', 'Double Click to Reset').width(i.width).height(i.height);
            }
            setup();
            $( "#label_output" ).show();
            $('#mklabel').hide();
         },
         statusCode: error
      });
   }
   
   function set_ui() {
      $.ajax({
         url: url+"/ui.json?"+$lang,
         type: 'GET',
         processData: false,
         dataType: 'json',
         success:function(j) {
            clear_ui();
            $.each(j, function(i, item) {
               $.each(item, function(x, attr) {
                  if (jQuery.isPlainObject(attr)) {
                     if (attr.selected == '') {
                        $('#'+i).append('<option value=\''+attr.value+'\'  >'+attr.text+'</option>');
                     } else {
                        $('#'+i).append('<option value=\''+attr.value+'\' selected=\'selected\' >'+attr.text+'</option>');
                     }
                  } else {
                     if (x == 'text') {
                        $('#'+i).text( attr); 
                     } else {
                        $('#'+i).attr(x, attr);  
                     }                     
                  }
               });
            });
         },
         statusCode: error
      });
   }
   
   /**  End of REST Request functions */

   /* functions */
   
   function clear_ui() {
      //
      $('#num1').empty();
      $('#num2').empty();
      $('#num3').empty();
      //
      $('#alphanum1').empty();
      $('#alphanum2').empty();
      $('#alphanum3').empty();
      $('#alphanum4').empty();
      $('#alphanum5').empty();
      //
      $('#unit').empty();
      $('#level').empty();
      //
      $('#type').empty();
      $('#department').empty();
      //
      $('#page_size').empty();
      $('#list_name').empty();
   }

   function add_error_msg(stat, msg){
      $('#http_error').remove();
      var p='<div id="http_error" class="ui-state-error ui-corner-all" style="padding: 0 .7em; position: fixed; bottom: 5px; right: 5px; z-index: 9999999">'; 
      p+='  <p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>'; 
      p+='  <strong>'+stat+':</strong> '+msg+'</p>'; 
      p+='  </div>';
      $('body').append(p);
   }

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
//         reset();
//         setup();
         $( "#label_output" ).hide();
         $('#http_error').remove();
         $('#mklabel').show();
         $(this).blur();
      }).resizable({ aspectRatio: true  });
      $('#img_label .ui-wrapper').draggable({ cursor: "move", containment: '#img_label' }).height($('#img').height()).width($('#img').width());
   }

   function page_size() {
      var page = jQuery.parseJSON($('#page_size :selected').val());      
      switch ($( "#preview_opt > div" ).accordion( "option", "active" )) {
         case 0:
            $("#img_label").css('width',page.width).css('height', page.height).css('text-align','center').css('vertical-align', 'middle');
            x=page.x;
            y=page.y;
         break;
         case 1:
            $("#img_label").css('width',$('#label_width').val()).css('height', $('#label_height').val()).css('text-align','center').css('vertical-align', 'middle');
            x=$('#label_x').val();
            y=$('#label_y').val();
         break;
         default:
            $("#img_label").css('width',page.width).css('height', page.height).css('text-align','center').css('vertical-align', 'middle');
            $('#label_width').attr('value', page.width);
            $('#label_height').attr('value', page.height);
            $('#label_x').attr('value', page.x);
            $('#label_y').attr('value', page.y);
            x=page.x;
            y=page.y;            
      }

   }

   function label_print() {
      var position = $('#img_label .ui-wrapper').position();
      var img=$('#img').attr('src');
      var style=fix_style(position);
      if ( ! img || ! style) {
         alert('Nothing is set in label preview to preview yet');
      } else {
         var go=url+'/print/'+$('#img_label').width()+'px/'+$('#img_label').height()+'px/'+x+'/'+y+'/'+style+'?'+img;
         document.location.href=go;                  
      }
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
   
   function get_code() {
      var $code='A01';
      switch ($( "#top" ).accordion( "option", "active" )) {
         case 0: // resiter code coloured numbers
            $code=$('#num1 :selected').val()+$('#num2 :selected').val()+$('#num3 :selected').val();            
         break;
         case 1:
            $code=$('#alphanum1 :selected').val()+$('#alphanum2 :selected').val()+$('#alphanum3 :selected').val()+$('#alphanum4 :selected').val()+$('#alphanum5 :selected').val();
         break;
      }
      return $code;
   }
   
   function get_desc() {
      // Sets Qr default to cabel size
      var $desc="Size:"+$code+$('#unit :selected').val();
      switch ($qr) {
         case 0:
            $desc=make_qr_gig_label();
         break;
         case 1: // tel
            $desc=make_qr_tel();
         break;
         case 2: //url
            $desc=make_qr_url();
         break;
         case 3: //email
            $desc=make_qr_email();
         break;
         case 4: $desc=make_vcard(); break;
      }
      return $desc;
   }
   
   function make_qr_gig_label() {
      var $desc ="Size:"+$code+$('#unit :selected').val()+"|";
      $desc+="Type:"+$('#type :selected').val()+"|";
      $desc+="Department:"+$('#department :selected').val();
      return $desc;
   }
   function make_qr_tel(){   return "tel:"+$('#tel').val();}
   function make_qr_url(){   return encodeURI($('#url').val());}
   function make_qr_email(){ return "mailto:"+$('#email').val(); }
   
   function make_vcard() {
      var $desc;
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
      return $desc;
   }
   
   function enable_make() {
    $('#mklabel').button("enable");  
   }
   function enable_delete() {
    $('#delete').button("enable");  
   }

   function enable_preview() {
      $('#print').button("enable");
   }
/* end of functions */
    
    
/**  Start of jQuery UI set up */
   set_ui();


   // load jQuery UI CSS classes for select elements, input and textarea are hard to read with these classes applied so they are omitted
   $('div').addClass('ui-widget ui-widget-content ui-corner-all ');
   $('p, label, button, select').addClass('ui-dialog-content ui-widget-content');
   $('legend, h1, h2 h3, h4, h5').addClass('ui-widget-header ui-corner-all ui-widget-header');
   // @todo update this to update textboxes in the same label options dialog
   $('#page_size').click(function(){
      reset(); setup(); page_size();
   });



   $('#lang').removeAttr('class');
   $('#lang').buttonset();
   $('#lang  label').click(function(){
      var l = $(this).attr('for');
      if (l != $lang) {
         $lang = l;
         set_ui();
      }
      $(this).blur();
   });
   $( "#qrtext" ).accordion({  });
    //
   $( "#label_output" ).hide();
//   $( "#label_output" ).draggable({handle:"h3"}).hide();

   // used for resistor code, alpha num or soon to be logo
   $( "#top" ).accordion({});
   $('#top > div').css("padding-left", "10px").css("padding-right", "0");
    
   /**
    * QR text dialog box
    */
   $( "#maker" ).dialog({ title: "QR Code options",
      width: 550, modal: true, autoOpen: false, resizable: false,
      buttons: { OK: function() { $( this ).dialog( "close" ); $qr=$( "#qrtext" ).accordion( "option", "active" ); } }
   });
   
   $('#open_maker').button({ icons: { primary: "ui-icon-plusthick", secondary: "ui-icon-plusthick" } })
    .click(function() { $( "#maker" ).dialog('open'); return false; });
   
   /** open_preview UI page */
   $( "#preview_opt" ).dialog({ title: "Preview Options",
      width: 550, modal: true, autoOpen: false, resizable: false,
      buttons: {
         OK: function() {
            $( this ).dialog( "close" );
         }
      }
   });
    // Open Preview UI Options, page sizes 
   $('#open_preview').button({ icons: { primary: "ui-icon-plusthick", secondary: "ui-icon-plusthick" } }).click(function() { $( "#preview_opt" ).dialog('open'); return false; });
   $( "#preview_opt >div" ).accordion({}); //.height('250');
   $( "#preview_opt >div > div" ).height('100');
    
    // Projects UI, for adding & loading
   $('#add_proj').button({
      icons: { primary: "ui-icon-plusthick", secondary: "ui-icon-plusthick" }
   }).click(function() { $( "#add_project" ).dialog('open'); return false; });
   
    // Projects UI, for adding & loading
   $( "#add_project" ).dialog({ title: "Projects",
      autoOpen: false, resizable: false, height:200, width: 350,
      modal: true, buttons: {
       	 "Add": function() { add_project(); /* $("#add_project").dialog( "close" ); */ },
         "Load": function() { select_list(); $("#add_project").dialog( "close" );},
         Cancel: function() { $( this ).dialog( "close" ); }
      }
   });
   
   $('#help').dialog({ title: "Projects", autoOpen: false, resizable: false, height:200, width: 350, modal: false });
   /**  delete item from project with HTTP DELETE */
   $('#delete').button({icons: { primary: "ui-icon-trash", secondary: "ui-icon-trash" } }).click(function() { label_delete() }); //.button( "disable" );
   
   /** print current page of labels, need to add selected labels too, so it's more simple to use */
   $('#print').button({ icons: { primary: "ui-icon-print", secondary: "ui-icon-print" } }).click(function(){ label_print(); $(this).blur(); }); //.button( "disable" );
   
   $( "#img_label" ).draggable({ revert: true });
   
   // HTTP PUT to server
   $( "#list" ).droppable({ activeClass: "ui-state-hover", hoverClass: "ui-state-active", drop: function( event, ui ) { label_put(event, ui); } });
   
   $('#mklabel').button({ icons: { primary: "ui-icon-image", secondary: "ui-icon-image" } }).click(function(e){
      $code=get_code();
      $desc=get_desc();
      get_qr_label();
//      $(this).hide();
      $(this).blur();
   }); //.button( "disable" );
   
   select_list();
}