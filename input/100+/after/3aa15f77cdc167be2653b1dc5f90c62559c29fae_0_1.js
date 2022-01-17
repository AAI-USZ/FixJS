function(elm) {
      var id  = $(elm).attr('id'),
          val = $(elm).val(),
          img = $(elm).parent().next('option-tree-ui-media-wrap').find('img'),
          src = img.attr('src'),
          btnContent = '';
      if ( val != src ) {
        img.attr('src', val);
      }
      if ( val !== '' && ( typeof src == 'undefined' || src == false ) && OT_UI.url_exists(val) ) {
        var image = /\.(?:jpe?g|png|gif|ico)$/i;
        if (val.match(image)) {
          btnContent += '<div class="option-tree-ui-image-wrap"><img src="'+val+'" alt="" /></div>';
        }
        btnContent += '<a href="javascript:(void);" class="option-tree-ui-remove-media option-tree-ui-button" title="'+option_tree.remove_media_text+'"><span class="icon trash-can">'+option_tree.remove_media_text+'</span></a>';
        $('#'+id).val(val);
        $('#'+id+'_media').remove();
        $('#'+id).parent().parent('div').append('<div class="option-tree-ui-media-wrap" id="'+id+'_media" />');
        $('#'+id+'_media').append(btnContent).slideDown();
      } else if ( val == '' || ! OT_UI.url_exists(val) ) {
        $(elm).parent().next('.option-tree-ui-media-wrap').remove();
      }
    }