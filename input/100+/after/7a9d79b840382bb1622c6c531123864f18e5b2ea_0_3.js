function( options ) {
    /*
    * Auxiliar properties
    */
    var that = this;

    /*
    * Default options
    */
    var _options = {
        visibleSlides: 1,
        movingSlides: 1,
        effect: 'slide',
        previousSlideAction: null,
        nextSlideAction: null,
        mediaQueries: null,
        horizontallyCentered: false,
        verticallyCentered: false,
        transitionTime: 800
      };

    if ( options ) {
      $.extend( _options, options );
    }
        
    $('head').append('<style> \
      .responSlider-slider{ \
          overflow: hidden; \
      } \
      \
      .responSlider-sliderContainer{ \
        height: 100%; \
        max-width: 100%; \
        position: relative; \
      } \
      \
      .responSlider-slide{ \
        float: left; \
        height: 100%; \
        overflow: hidden; \
        position: relative; \
      } \
      \
      .responSlider-slide > img { \
        max-width: 100%; \
        height: auto; \
      } \
      \
      .responSlider-horizontallyCentered { \
        margin-left: auto; \
        margin-right: auto; \
      } \
      \
      .responSlider-verticallyCentered { \
        display: block; \
        margin: 0px auto; \
        position: relative; \
        top: 50%; \
      } \
    </style>');
    
    var _effects = {};

    _effects.none = function($slider, showNextSlide, movingSlides){
      var $sliderContainer = $($slider.children('.responSlider-sliderContainer').get(0)),
        $slides       = $sliderContainer.children(),
        $selectedSlides   =   showNextSlide ? $slides.slice(0,movingSlides) : $slides.slice(-1 * movingSlides);

      showNextSlide ? $sliderContainer.append($selectedSlides) : $sliderContainer.prepend($selectedSlides);
    };

    _effects.slide = function($slider, showNextSlide, movingSlides){
      var $sliderContainer = $($slider.children('.responSlider-sliderContainer').get(0)),
        $slides = $sliderContainer.children(),
        horizontalOffset  =   $slides.outerWidth(true),
        $selectedSlides   =   showNextSlide ? $slides.slice(0,movingSlides) : $slides.slice(-1 * movingSlides),
        startPosContainer   =   showNextSlide ? (horizontalOffset * movingSlides) : 0,
        endPosContainer   =   (!showNextSlide) ? (horizontalOffset * movingSlides) : 0,
        maxZIndex     = parseInt($slides.css("z-index"),10);

      if (showNextSlide){
        $sliderContainer.append($selectedSlides);
      }

      $sliderContainer.css("left", startPosContainer + "px");

      $selectedSlides.each(
        function(i){
          $(this).css({
            position: "absolute",
            left: (horizontalOffset * (i - movingSlides)) + "px",
            "z-index": maxZIndex + 1
          });
        }
      );

      $sliderContainer.animate({
        left: endPosContainer + "px"},
        _options.transitionTime,
        function(){
        if (!showNextSlide){
          $sliderContainer.prepend($selectedSlides);
        }
        $sliderContainer.css("left", "");
        $selectedSlides.css({
          position: "",
          left: "",
          "z-index": ""
        });
      });
    };

    _effects.fade = function($slider, showNextSlide, movingSlides){
      var $sliderContainer = $($slider.children('.responSlider-sliderContainer').get(0)),
        $slides       = $sliderContainer.children(),
        $selectedSlides   =   showNextSlide ? $slides.slice(0,movingSlides) : $slides.slice(-1 * movingSlides),
        originalOpacity   = $sliderContainer.css("opacity");

      originalOpacity = !!(originalOpacity) ? originalOpacity : 1;

      $sliderContainer.animate({
        opacity: 0
      }, _options.transitionTime / 2,
      function(){
        showNextSlide ? $sliderContainer.append($selectedSlides) : $sliderContainer.prepend($selectedSlides);

        $sliderContainer.animate({
          opacity: originalOpacity
        }, _options.transitionTime / 2, function(){
          $sliderContainer.attr("style","");
        });
      });
    };

    if (_options.verticallyCentered){
      var verticalCenterSlide = function(){
        that.find('.responSlider-verticallyCentered').map(function(){
          var $this = $(this);
          $this.css({
            "margin-top" : ($this.outerHeight() / 2) * (-1)
          });
        });
      };

      $(window).load(verticalCenterSlide).resize(verticalCenterSlide);
    }
    
    return this.each(function(){
      var $this = $(this),
          slideSelector,
          sliderChilden,
          sliderContainerID,
          slideWidthStyle;

      $this.addClass('responSlider-slider');

      sliderChilden = $this.children();
      if (_options.horizontallyCentered){
        sliderChilden.addClass("responSlider-horizontallyCentered");
      }
      if (_options.verticallyCentered){
        sliderChilden.addClass("responSlider-verticallyCentered");
      }

      sliderContainerID = 'responSlider-sliderContainer-'+ $('.responSlider-sliderContainer').length;

      sliderChilden
        .wrapAll('<div id="'+sliderContainerID+'" class="responSlider-sliderContainer" />')
        .wrap('<div class="responSlider-slide" />');

      slideSelector = '#'+sliderContainerID+' > .responSlider-slide';

      slideWidthStyle = '<style type="text/css">';

      if (_options.mediaQueries){
        for (var mq in _options.mediaQueries){
          slideWidthStyle += mq + '{ '+slideSelector+' { width: '+(100/_options.mediaQueries[mq])+'% } }';
        }
      }
      else{
        slideWidthStyle += slideSelector+' { width: '+(100/_options.visibleSlides)+'% }';
      }

      slideWidthStyle += '</style>';

      $('head').append(slideWidthStyle);

      $this.bind('responSlider-slideTransition', function(e, showNextSlide ){
        var $slider = $this;
        if ($slider.children(".responSlider-sliderContainer").filter(":animated").length === 0){
            var visibleSlides = Math.ceil($slider.outerWidth() / $slider.find('.responSlider-slide').outerWidth());

            _effects[_options.effect]($slider, showNextSlide, Math.min(_options.movingSlides, visibleSlides));
          }
        }
      );

      $(_options.previousSlideAction).click(function(ev){ ev.preventDefault(); $this.trigger('responSlider-slideTransition',[false]);});
      $(_options.nextSlideAction).click(function(ev){ ev.preventDefault(); $this.trigger('responSlider-slideTransition',[true]);});
      
    });
  
  }