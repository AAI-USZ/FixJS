function ($) {

    var flickrImages = [];
	var flickrLimit = 20;
	var previousIdx = 9999;
	var timeout = {};

    /* ----------------------------------------------------------------------
     * Flickr image magick
     * ----------------------------------------------------------------------*/
    $(document).ready(function() {

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
    });

  /* TABS --------------------------------- */
  /* Remove if you don't need :) */

  function activateTab($tab) {
    var $activeTab = $tab.closest('dl').find('dd.active'),
        contentLocation = $tab.children('a').attr("href") + 'Tab';

    // Strip off the current url that IE adds
    contentLocation = contentLocation.replace(/^.+#/, '#');

    // Strip off the current url that IE adds
    contentLocation = contentLocation.replace(/^.+#/, '#');

    //Make Tab Active
    $activeTab.removeClass('active');
    $tab.addClass('active');

    //Show Tab Content
    $(contentLocation).closest('.tabs-content').children('li').hide();
    $(contentLocation).css('display', 'block');
  }

  $('dl.tabs dd a').on('click.fndtn', function (event) {
    activateTab($(this).parent('dd'));
  });

  if (window.location.hash) {
    activateTab($('a[href="' + window.location.hash + '"]'));
    $.foundation.customForms.appendCustomMarkup();
  }

  /* ALERT BOXES ------------ */
  $(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
    $(this).closest(".alert-box").fadeOut(function(event){
      $(this).remove();
    });
  });

  /* PLACEHOLDER FOR FORMS ------------- */
  /* Remove this and jquery.placeholder.min.js if you don't need :) */
  $('input, textarea').placeholder();

  /* TOOLTIPS ------------ */
  $(this).tooltips();

  /* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
  //  $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
  //  $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
  //  $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
  //  $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});


  /* DROPDOWN NAV ------------- */

  var lockNavBar = false;
  /* Windows Phone, sadly, does not register touch events :( */
  if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)) {
    $('.nav-bar a.flyout-toggle').on('click.fndtn touchstart.fndtn', function(e) {
      e.preventDefault();
      var flyout = $(this).siblings('.flyout').first();
      if (lockNavBar === false) {
        $('.nav-bar .flyout').not(flyout).slideUp(500);
        flyout.slideToggle(500, function(){
          lockNavBar = false;
        });
      }
      lockNavBar = true;
    });
    $('.nav-bar>li.has-flyout').addClass('is-touch');
  } else {
    $('.nav-bar>li.has-flyout').hover(function() {
      $(this).children('.flyout').show();
    }, function() {
      $(this).children('.flyout').hide();
    });
  }

  /* DISABLED BUTTONS ------------- */
  /* Gives elements with a class of 'disabled' a return: false; */

  /* SPLIT BUTTONS/DROPDOWNS */
  $('.button.dropdown > ul').addClass('no-hover');

  $('.button.dropdown').on('click.fndtn touchstart.fndtn', function (e) {
    e.stopPropagation();
  });
  $('.button.dropdown.split span').on('click.fndtn touchstart.fndtn', function (e) {
    e.preventDefault();
    $('.button.dropdown').not($(this).parent()).children('ul').removeClass('show-dropdown');
    $(this).siblings('ul').toggleClass('show-dropdown');
  });
  $('.button.dropdown').not('.split').on('click.fndtn touchstart.fndtn', function (e) {
    e.preventDefault();
    $('.button.dropdown').not(this).children('ul').removeClass('show-dropdown');
    $(this).children('ul').toggleClass('show-dropdown');
  });
  $('body, html').on('click.fndtn touchstart.fndtn', function () {
    $('.button.dropdown ul').removeClass('show-dropdown');
  });

  // Positioning the Flyout List
  var normalButtonHeight  = $('.button.dropdown:not(.large):not(.small):not(.tiny)').outerHeight() - 1,
      largeButtonHeight   = $('.button.large.dropdown').outerHeight() - 1,
      smallButtonHeight   = $('.button.small.dropdown').outerHeight() - 1,
      tinyButtonHeight    = $('.button.tiny.dropdown').outerHeight() - 1;

  $('.button.dropdown:not(.large):not(.small):not(.tiny) > ul').css('top', normalButtonHeight);
  $('.button.dropdown.large > ul').css('top', largeButtonHeight);
  $('.button.dropdown.small > ul').css('top', smallButtonHeight);
  $('.button.dropdown.tiny > ul').css('top', tinyButtonHeight);

}