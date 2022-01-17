function() {
        var num = Math.floor(Math.random()*11) - 1;

        $('.main-image-div').css("background", "url("+flickrImages[num].image_b+")");
        $('.float').html("<h4>"+flickrImages[num].title+"</h4>");

        $('.main-image-div').click( function() {
          window.location = flickrImages[num].link;
        });
      }