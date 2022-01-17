function($) {

  // check if link is gonna be an image
  var checkImage = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;

  // a reddit to load
  var loadJSON = "http://www.reddit.com/r/funny/"

  // initialize app
  $.getJSON(
    // using the jsonp querystring to avoid XSS errors
    loadJSON+".json?jsonp=?",function foo(result) {
      
      // prepares to load the next set of items, see similar getJSON function below
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

  // load next 25 items on click
  $(document).on('click', '#next', function(event) {
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

  });

  // capture link clicks //
  $(document).on('click', '#posts ul a', function(event) {
    event.preventDefault();

    $('#posts ul a').removeClass('active');
    $(this).addClass('active seen');

    var targetURL = $(this).attr('href');

    if (checkImage.test(targetURL)) {
      $("#window").html('');
      $('#window').append('<div id="loading-content"><img src="./images/loading.gif" /></div>')

      // build <img> tag, wait for browser to download the image and hide the loading gif once complete
      var _url = targetURL;
      _im =$("<img id='content'>");
      _im.hide();
      _im.bind("load",function(){ 
        $('#loading-content').hide();
        $(this).fadeIn();
      });

      // stick the fucker in
      $('#window').append(_im);

      // now that the img is built, set the img src
      _im.attr('src',_url);
    } else {
      // otherwise just put it in an iframe
      $('#window').html('<iframe src="'+targetURL+'" width="100%" height="100%">');
    }

  });


  $(document).on('click', '#window img', function(event) {
    $('#window img').toggleClass('hueg');
  });

  // function to keep #window in viewport when scrolling.
  $(function() {
    var $viewport   = $("#window"), 
        $window    = $(window),
        offset     = $viewport.offset(),
        topPadding = 0;

    $window.scroll(function() {
      if ($window.scrollTop() > offset.top) {
          $viewport.stop().animate({
              marginTop: $window.scrollTop() - offset.top + topPadding
          });
      } else {
          $viewport.stop().animate({
              marginTop: 0
          });
      }
    }); 
  });

}