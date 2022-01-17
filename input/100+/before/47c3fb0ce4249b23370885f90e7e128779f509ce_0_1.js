function() {

      // Prevent .main-image-div from getting the child divs' onclicks
      $(".content").click(function(e) {
        e.stopPropagation();
      })

      // this function sticks a random image from flickrImages[] in to the
      // background of .main-image-div and causes a JS link to the image's
      // flickrpage
      newImage = function() {
        var num = Math.floor(Math.random()*flickrLimit+1) - 1;

		if( num > flickrImages.length ) {
			num = Math.floor(Math.random()*flickrImages.length+1)-1;	
		}
		
		if( num == previousIdx) {
			return;
		}
		
		previousIdx = num;

        $('.main-image-div').css("background", "url("+flickrImages[num].image_b+") no-repeat 50%");
        $('.float').html("<h4>"+flickrImages[num].title+"</h4>");

        $('.main-image-div').click( function() {
          window.location = flickrImages[num].link;
        });
      };

      // Do the jquery flick goodness
      $('.main-image-div').jflickrfeed({
        limit: flickrLimit,
        qstrings: {
	      tags: 'publish',
          id: '60827818@N07'
        },
        useTemplate: false,
        itemCallback: function(item){
          flickrImages.push(item);

			newImage();
			clearInterval(timeout);
            timeout = setInterval(newImage, 10000);
        }
      })
    }