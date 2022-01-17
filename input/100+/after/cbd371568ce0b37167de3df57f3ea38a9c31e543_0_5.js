function($) {

  // check if link is gonna be an image
  var checkImage = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;

  // a reddit to load
  // can combine reddits like so: http://www.reddit.com/r/funny+wtf+cats/
  var loadJSON = "http://www.reddit.com/r/funny/"

  // this value is required for querying 'before' so our Previous 25 button works.
  // increments in 25's
  // e.g .json?count=25&after=t3_vwgw7&jsonp=?
  var count = 0;

  // initialize app
  $.getJSON(
    // using the jsonp querystring to avoid XSS errors
    loadJSON+".json?jsonp=?",function foo(result) {

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
  )

  // load next 25 items on click
  $(document).on('click', '#next', function(event) {
    event.preventDefault();
    
    // scroll to top of viewport
    $('html, body').animate({scrollTop:0}, 'slow');
    
    // reset the links
    $('#posts ul').html('');

    // increment the before counter
    count = count+25;

    $.getJSON(
      loadJSON+".json?count="+count+"&after="+pageNext+"&jsonp=?",function foo(result) {

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
  )
  });

  // load previous 25 items
  $(document).on('click', '#prev', function(event) {
    event.preventDefault();
    
    // scroll to top of viewport
    $('html, body').animate({scrollTop:0}, 'slow');
    
    // reset the links
    $('#posts ul').html('');

    // decrement the before counter, because we're going back (wooooaaaah)!
    count = count-25;

    $.getJSON(
      loadJSON+".json?count="+count+"&before="+pagePrev+"&jsonp=?",function foo(result) {

      pagePrev = result.data.before
      pageNext = result.data.after
      
      $('#next').attr({
        href: '#?'+pageNext
      })
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
  )
  });

  // capture link clicks
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