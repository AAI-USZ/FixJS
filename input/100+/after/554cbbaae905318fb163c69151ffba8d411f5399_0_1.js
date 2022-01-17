function(ctx){
      var res = {
        type     : 'quote',
        item     : ctx.title.substring(0, ctx.title.indexOf(': ')),
        itemUrl  : ctx.href,
        favorite : {
          name : 'Twitter',
          id   : ctx.href.match(/(status|statuses)\/(\d+)/)[2]
        }
      }
      if(ctx.selection){
        res.body = ctx.selection.raw;
        res.flavors = {
          html : ctx.selection.html
        };
      } else {
        var elm = ctx.document.querySelector('.tweet-text');
        var sel = createFlavoredString(elm);
        res.body = sel.raw;
        res.flavors = {
          html : sel.html
        };
      }
      return res;
    }