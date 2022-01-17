function foo(result) {

      pagePrev = result.data.before
      pageNext = result.data.after
      
      $('#next').attr({
        href: '#?'+pageNext
      })
      $('#prev').show();
      $('#prev').attr({
        href: '#?'+pagePrev
      })


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