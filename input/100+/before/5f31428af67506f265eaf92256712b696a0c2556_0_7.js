function fix_style(position) {
      var style='';
      if ($('#img').attr('style')) {
         style= $('#img').attr('style').replace(/ /g,'').replace(/position:static;/g,'').replace(/resize:none;/g,'').replace(/zoom:1;/g,'').replace(/display:block;/g,'')+'position:relative;left:'+position.left+ "px;top:-"+position.top/50+'px';                  
      }
      return style;
   }