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