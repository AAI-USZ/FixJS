function(i,x){
        var h = Mustache.to_html(template, x);
        $gallery = $gallery.append(h);
      }