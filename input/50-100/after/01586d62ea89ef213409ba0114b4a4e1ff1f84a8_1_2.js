function() {
      if (!document.getElementById('cartodb_logo')) {
        var cartodb_link = document.createElement("a");
        cartodb_link.setAttribute('id','cartodb_logo');
        cartodb_link.setAttribute('style',"position:absolute; bottom:8px; left:8px; display:block; z-index:10000;");
        cartodb_link.setAttribute('href','http://www.cartodb.com');
        cartodb_link.setAttribute('target','_blank');
        cartodb_link.innerHTML = "<img src='http://cartodb.s3.amazonaws.com/static/new_logo.png' style='border:none; outline:none' alt='CartoDB' title='CartoDB' />";
        this.options.map._container.appendChild(cartodb_link);
      }
    }