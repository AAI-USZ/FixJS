function() {
    
//arrow button functions
 $('#next').click(function () {
	 myScroll.scrollToPage('next', 0);
	
	 return false;
	 });
 $('#prev').click(function () {
	 myScroll.scrollToPage('prev', 0);
	
	 return false;
	 });
// same functions with keyboard
$(document).keyup(function(e) {
	if(e.keyCode == 39) {
     myScroll.scrollToPage('next', 0);

	 return false;
	}
	
	if(e.keyCode == 37) {
     myScroll.scrollToPage('prev', 0);
	
	 return false;
	}
});

//to make the size of the scroller dynamic

var slideWidth = 800;
var slideHeight = 600;
var slides = $('#slides li');
var numberOfSlides = slides.length;
 $('#scroller').css('width', slideWidth * numberOfSlides);
 $('#slideshow').css('width', slideWidth);
 $('#container').css('width', slideWidth + 100);

 
//make indicator's list dynamic
$(slides).clone().appendTo("#indicator");
$('#indicator li').empty();
$('#indicator li:first-child').addClass('active');

//make indicator lenght dynamic
var dotWidth = 12;
var dots = $('#indicator li');
var numberOfDots= dots.length;
$('#indicator').css('width', dotWidth*numberOfDots);

/*remove pesky p tags from comics pages
jQuery.fn.stripTags = function() { return this.replaceWith( this.html().replace(/<\/?[^>]+>/gi, '') ); };
$("li.page").stripTags();*/

//end document ready
}