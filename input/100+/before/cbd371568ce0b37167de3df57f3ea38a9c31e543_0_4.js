function(event) {
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

  }