function() {

	// Prevent .main-image-div from getting the child divs' onclicks
	$(".content").click(function(e) {
            e.stopPropagation();
	})


	// this function sticks a random image from flickrImages[] in to the
	// background of .main-image-div and causes a JS link to the image's
	// flickrpage
	newImage = function() {
	    var num=0;
	    while ((num=Math.floor(Math.random()*flickrImages.length)) == previousIdx) {}	    
	    previousIdx = num;
            $('.main-image-div').css("background", "url("+flickrImages[num].image_b+") no-repeat 50%");
            $('.float').html("<h4>"+flickrImages[num].title+"</h4>");
            $('.main-image-div').click( function() {
		window.location = flickrImages[num].link;
            });
	};

	// Do the jquery flick goodness
	$.jflickrfeed(
	    {
		limit: flickrLimit,
		qstrings: {
		    tags: 'publish',
		    id: '60827818@N07'
		},
		useTemplate: false,
		itemCallback: function(item){
		    flickrImages.push(item);
		}
	    },
	    function(){
		newImage();
		timeout = setInterval(newImage, 10000)
	    });

    }