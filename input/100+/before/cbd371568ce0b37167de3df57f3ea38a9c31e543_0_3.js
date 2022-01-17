function(event) {
    event.preventDefault();
    
    // scroll to top of viewport
    $('html, body').animate({scrollTop:0}, 'slow');
    
    // reset the links
    $('#posts ul').html('');

    $.getJSON(
      loadJSON+".json?after="+afterNext+"&jsonp=?",function foo(result) {
      
      afterNext = result.data.after

      $.each(result.data.children.slice(0, 25),
        function (i, post) {
        // check for image links and apply image class to parent <li> if true
        if (checkImage.test(post.data.url)) {
          $("#posts ul").append( '<li class="image"><a href="'+post.data.url+'">' + post.data.title + "</a></li>");
        } else {
          $("#posts ul").append( '<li><a href="'+post.data.url+'">' + post.data.title + "</a></li>");
        };
        }
      )
    }
  )

  }