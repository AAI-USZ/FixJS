function(){
      elRTE.prototype.options.panels.sofa_style     = ['bold', 'italic', 'underline'];
      elRTE.prototype.options.panels.sofa_alignment = ['justifyleft', 'justifycenter', 'justifyright'];
      elRTE.prototype.options.panels.sofa_format    = ['formatblock'];
      elRTE.prototype.options.panels.sofa_copypaste = ['pastetext'];
      elRTE.prototype.options.panels.sofa_links     = ['sofa_link', 'unlink'];
      
      elRTE.prototype.options.toolbars.sofa = $.CMS.config.elRTE.toolbar;
      
      // BUG: Need to set content to an empty <p> for IE
      if ($.browser.msie){
        $('textarea.rich_text').each(function(){
          if ($(this).val() == ''){
            $(this).val('<p></p>');
          }
        })
      }
      
      $('textarea.rich_text').elrte({
        height:       300,
        toolbar:      'sofa',
        styleWithCSS: false
      });
    }