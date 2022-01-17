function foo(result) {

      // prepares to load the next set of items, see similar getJSON function below
      pageNext = result.data.after
      pagePrev = result.data.before

      // set next button query string
      // not needed to work, just to help in debugging or whatevs
      $('#next').attr({
        href: '#?'+pageNext
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