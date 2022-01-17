function add_select_list(p) {
      var   alt=JSON.stringify(p);
      var   id=p.published.replace(/:/,'|').replace(/:/,'|').replace(/:/,'|');
      var   img=p.img;
      $("#current").prepend("<li><img src='"+img+"' alt='"+alt+"' id='"+id+"'/></li>");
   }