function($) {
  /*
   * Prototypes for the tiSlideshow object
   */
  function tiSlideshow(container, options, id) {
    this.container = container;
    this.options = options;
    this.maskId = "";
    this.isOpen = false;
    this.imageList = [];
    this.currentImageIndex = 0;
    $.tiSlideshow.interfaces[id] = this;
    if (this.options.auto)
      this.open();
  }
  tiSlideshow.prototype.open = function() {
    /* To prevent multi open */
    if (this.isOpen)
      return ;
    /* Fire the beforeOpen event */
    if (!this.beforeOpen()) return;
    this.isOpen = true;
    /* Construct the exposeMask and the content */
    this.imageList = [];
    this.currentImageIndex = 0;
    var maskId = "tiSlideshowExposeMask";
    while ($('#'+maskId).length) {
      maskId += "i";
    }
    this.maskId = maskId;
    var exposeMask = "<div id=\"" + this.maskId + "\" class=\"tiSlideshowExposeMask\" style=\"opacity: " + this.options.opacity + "; background-color: " + this.options.mask + "; \"></div>";
    var placeControl = '<div class="tiSlideshowPlaceControl"><div class="tiSlideshowPlaceControlThumbnailsScroll"><div class="tiSlideshowPlaceControlThumbnails"></div></div><a href="#" class="tiSlideshowPlaceControlClose"></a></div>';
    var place = '<div class="tiSlideshowPlace"><div class="tiSlideshowPlaceSlider"><a href="#" class="tiSlideshowPlaceSliderPrevious"></a><a href="#" class="tiSlideshowPlaceSliderNext"></a><div class="tiSlideshowPlaceSliderPicture"></div></div>'+placeControl+'</div>';
    $('body').append(exposeMask);
    $('body').append(place);
    if (navigator.appName == 'Microsoft Internet Explorer') {
      $('.tiSlideshowPlaceControl').css('border', '1px solid white');
    }
    var self = this;
    /* Initialize slider content, and thumbnails */
    $(self.container).children('img').each(function() {
      var src = $(this).attr('src');
      self.imageList.push(src);
      var thumbnail = '<a href="#" class="tiSlideshowPlaceControlThumbnailsThumbnail"><img src="'+self.getThumbnailSrc(src)+'" alt="thumbnail" /></a>';
      $('.tiSlideshowPlaceControlThumbnails').append(thumbnail);
    })
    self.initThumbnailsEvent();
    /* If there is a picture for the given index, we show it */
    self.currentImageIndex = self.options.beginIndex;
    if (self.currentImageIndex >= 0 && parseInt(self.currentImageIndex) < parseInt(self.imageList.length)) {
      this.showCurrentImage();
    } else if (self.imageList.length > 0) {
      self.currentImageIndex = 0;
      self.showCurrentImage();
    }
    /* Apply options */
    this.changeOptions();
    /* Flush the display */
    $(window).scrollTop(0);
    $('.tiSlideshowExposeMask').show();
    $('.tiSlideshowPlace').show();
    /* Fire the onOpen event */
    this.onOpen();
  };
  tiSlideshow.prototype.close = function() {
    /* To prevent multi close */
    if (!this.isOpen)
      return ;
    /* Fire the beforeClose event */
    if (!this.beforeClose()) return;
    /* Destruct the exposeMask and the content */
    $('.tiSlideshowExposeMask').remove();
    $('.tiSlideshowPlace').remove();
    /* Reset the touchmove event */
    $('body').unbind("touchmove", $.tiSlideshow.preventTouchmove);
    this.isOpen = false;
    /* Fire the onClose event */
    this.onClose();
  };
  tiSlideshow.prototype.showCurrentImage = function(callback) {
    var self = this;
    $('.tiSlideshowPlaceSliderPicture').html('<img src="'+self.imageList[self.currentImageIndex]+'" alt="picture" style="display: none;"/>');
    $('.tiSlideshowPlaceSliderPicture img').load(function() {
      $('.tiSlideshowPlaceSliderPicture img').data('originalHeight', this.height);
      $('.tiSlideshowPlaceSliderPicture img').data('originalWidth', this.width);
      $.tiSlideshow.adjustSize();
      $('.tiSlideshowPlaceSliderPicture img').show();
      $('.tiSlideshowPlaceControlThumbnailsSelected').removeClass('tiSlideshowPlaceControlThumbnailsSelected');
      $('.tiSlideshowPlaceControlThumbnails .tiSlideshowPlaceControlThumbnailsThumbnail:eq('+self.currentImageIndex+')').addClass('tiSlideshowPlaceControlThumbnailsSelected');
      if (callback)
        callback();
    });
  };
  tiSlideshow.prototype.changeOptions = function(options) {
    var self = this;
    this.options = $.extend({}, this.options, options);
    /* mask */
    $('#'+this.maskId).css('background-color', this.options.mask);
    /* opacity */
    $('#'+this.maskId).css('opacity', this.options.opacity);
    /* tactile */
    if (this.options.tactile) {
      $('.tiSlideshowPlaceControlThumbnailsThumbnail').each(function() { $(this).replaceWith('<span class="tiSlideshowPlaceControlThumbnailsThumbnail">'+$(this).html()+'</span>'); });
      $('.tiSlideshowPlaceControlClose').replaceWith('<span class="tiSlideshowPlaceControlClose"></span>');
      $('.tiSlideshowPlaceSlider .tiSlideshowPlaceSliderPrevious').replaceWith('<span class="tiSlideshowPlaceSliderPrevious"></span>');
      $('.tiSlideshowPlaceSlider .tiSlideshowPlaceSliderNext').replaceWith('<span class="tiSlideshowPlaceSliderNext"></span>');
      $('body').bind("touchmove", $.tiSlideshow.preventTouchmove);
    } else {
      $('.tiSlideshowPlaceControlThumbnailsThumbnail').each(function() { $(this).replaceWith('<a href="#" class="tiSlideshowPlaceControlThumbnailsThumbnail">'+$(this).html()+'</a>'); });
      $('.tiSlideshowPlaceControlClose').replaceWith('<a href="#" class="tiSlideshowPlaceControlClose"></a>');
      $('.tiSlideshowPlaceSlider .tiSlideshowPlaceSliderPrevious').replaceWith('<a href="#" class="tiSlideshowPlaceSliderPrevious"></a>');
      $('.tiSlideshowPlaceSlider .tiSlideshowPlaceSliderNext').replaceWith('<a href="#" class="tiSlideshowPlaceSliderNext"></a>');
      $('body').unbind("touchmove", $.tiSlideshow.preventTouchmove);
    }
    $('.tiSlideshowPlaceSliderPrevious').click(function() { self.previous(); return false; });
    $('.tiSlideshowPlaceSliderNext').click(function() { self.next(); return false; });
    $('.tiSlideshowPlaceControlClose').click(function() { self.close(); return false; });
    self.initThumbnailsEvent();
    /* closeButton */
    if (this.options.closeButton)
      $('.tiSlideshowPlaceControlClose').width(100);
    else
      $('.tiSlideshowPlaceControlClose').width(0);
    /* slideButtons */
    if (this.options.slideButtons) {
      $('.tiSlideshowPlaceSliderPrevious, .tiSlideshowPlaceSliderNext').show();
    }
    else
      $('.tiSlideshowPlaceSliderPrevious, .tiSlideshowPlaceSliderNext').hide();
    /* infiniteSlide */
    if (this.options.slideButtons) {
      if (this.imageList.length == 0) {
        $('.tiSlideshowPlaceSliderPrevious, .tiSlideshowPlaceSliderNext').hide();
      } else if (this.options.infiniteSlide) {
        if (this.currentImageIndex == 0) $('.tiSlideshowPlaceSliderPrevious').show();
        if (this.currentImageIndex == this.imageList.length - 1) $('.tiSlideshowPlaceSliderNext').show();
      } else {
        if (this.currentImageIndex == 0)
          $('.tiSlideshowPlaceSliderPrevious').hide();
        else
          $('.tiSlideshowPlaceSliderPrevious').show();
        if (this.currentImageIndex == this.imageList.length - 1)
          $('.tiSlideshowPlaceSliderNext').hide();
        else
          $('.tiSlideshowPlaceSliderNext').show();
      }
    }
    /* thumbnails */
    if (this.options.thumbnails) {
      $('.tiSlideshowPlaceControlThumbnailsScroll').show();
    } else {
      $('.tiSlideshowPlaceControlThumbnailsScroll').hide();
    }
    
    /* Render the elements */
    $.tiSlideshow.adjustSize();
  };
  tiSlideshow.prototype.next = function() {
    var self = this;
    var lastImageIndex = self.currentImageIndex;
    var newImageIndex = parseInt(self.currentImageIndex) + 1;
    if (self.options.infiniteSlide) {
      if (newImageIndex >= self.imageList.length)
        newImageIndex = 0;
    }
    if (newImageIndex < parseInt(self.imageList.length) && newImageIndex >= 0) {
      if (!this.beforeSlide(self.currentImageIndex, newImageIndex)) return;
      self.currentImageIndex = newImageIndex;
      if (this.options.slideButtons) {
        if (this.options.infiniteSlide) {
          if (this.currentImageIndex == 0) $('.tiSlideshowPlaceSliderPrevious').show();
          if (this.currentImageIndex == this.imageList.length - 1) $('.tiSlideshowPlaceSliderNext').show();
        } else {
          if (this.currentImageIndex == 0)
            $('.tiSlideshowPlaceSliderPrevious').hide();
          else
            $('.tiSlideshowPlaceSliderPrevious').show();
          if (this.currentImageIndex == this.imageList.length - 1)
            $('.tiSlideshowPlaceSliderNext').hide();
          else
            $('.tiSlideshowPlaceSliderNext').show();
        }
      }
      this.showCurrentImage(function() {
        self.onSlide(lastImageIndex, self.currentImageIndex);
      });
    }
  };
  tiSlideshow.prototype.previous = function() {
    var self = this;
    var lastImageIndex = self.currentImageIndex;
    var newImageIndex = parseInt(self.currentImageIndex) - 1;
    if (self.options.infiniteSlide) {
      if (newImageIndex < 0)
        newImageIndex = self.imageList.length - 1;
    }
    if (newImageIndex < parseInt(self.imageList.length) && newImageIndex >= 0) {
      if (!self.beforeSlide(self.currentImageIndex, newImageIndex)) return;
      self.currentImageIndex = newImageIndex;
      if (this.options.slideButtons) {
        if (this.options.infiniteSlide) {
          if (this.currentImageIndex == 0) $('.tiSlideshowPlaceSliderPrevious').show();
          if (this.currentImageIndex == this.imageList.length - 1) $('.tiSlideshowPlaceSliderNext').show();
        } else {
          if (this.currentImageIndex == 0)
            $('.tiSlideshowPlaceSliderPrevious').hide();
          else
            $('.tiSlideshowPlaceSliderPrevious').show();
          if (this.currentImageIndex == this.imageList.length - 1)
            $('.tiSlideshowPlaceSliderNext').hide();
          else
            $('.tiSlideshowPlaceSliderNext').show();
        }
      }
      this.showCurrentImage(function() {
        self.onSlide(lastImageIndex, self.currentImageIndex);
      });
    }
  };
  /* Initialize all the events on the thumbnails */
  tiSlideshow.prototype.initThumbnailsEvent = function() {
    var self = this;
    $('.tiSlideshowPlaceControlThumbnails .tiSlideshowPlaceControlThumbnailsThumbnail img').load(function() {
      $(this).data('originalHeight', this.height);
      $(this).data('originalWidth', this.width);
      $.tiSlideshow.adjustSize();
    });
    $('.tiSlideshowPlaceControlThumbnails .tiSlideshowPlaceControlThumbnailsThumbnail:eq('+self.currentImageIndex+')').addClass('tiSlideshowPlaceControlThumbnailsSelected');
    $('.tiSlideshowPlaceControlThumbnailsThumbnail').click(function() {
      var diff = $(this).index() - self.currentImageIndex;
      while (diff) {
        if (diff > 0) {
          self.next();
          diff--;
        } else {
          self.previous();
          diff++;
        }
      }
      return false;
    });
    var container_width = 0;
    $('.tiSlideshowPlaceControlThumbnailsThumbnail').each(function() {
      container_width += $(this).outerWidth(true);
    });
    $('.tiSlideshowPlaceControlThumbnails').width(container_width);
    /* Tactile management */
    if (self.options.tactile) {
      $('.tiSlideshowPlaceControlThumbnails').unbind("touchmove");
      $('.tiSlideshowPlaceControlThumbnailsScroll').bind("touchmove", function(e) {
        var new_x = e.originalEvent.touches[0].pageX;
        if (self.lastTouchX > 0) {
          var diff = self.lastTouchX - new_x;
          var lastScrollLeft = $('.tiSlideshowPlaceControlThumbnailsScroll').scrollLeft();
          $('.tiSlideshowPlaceControlThumbnailsScroll').scrollLeft(lastScrollLeft + diff);
        }
        self.lastTouchX = new_x;
      });
      $('.tiSlideshowPlaceControlThumbnailsScroll').unbind("touchstart");
      $('.tiSlideshowPlaceControlThumbnailsScroll').bind("touchstart", function(e) {
        self.lastTouchX = 0;
      });
    }
  };
  tiSlideshow.prototype.getThumbnailSrc = function(imgSrc) {
    var tmp;
    /* Get the imgPath */
    var imgPath = "";
    if (imgSrc.indexOf("/") >= 0) {
      tmp = imgSrc.split("/");
      tmp.pop();
      tmp = tmp.join("/");
      if (tmp[tmp.length - 1] != '/')
        tmp = tmp + "/";
      imgPath = tmp;
    }
    /* Get the imgFullName */
    var imgFullName = imgSrc;
    if (imgSrc.indexOf("/") >= 0) {
      tmp = imgSrc.split("/");
      imgFullName = tmp[tmp.length - 1];
    }
    /* Get the imgName */
    var imgName = imgFullName;
    if (imgFullName.indexOf(".") >= 0) {
      tmp = imgFullName.split(".");
      tmp.pop();
      imgName = tmp.join();
    }
    /* Get the imgExt */
    var imgExt = "";
    if (imgFullName.indexOf(".") >= 0) {
      tmp = imgFullName.split(".");
      imgExt = "." + tmp[tmp.length - 1];
    }
    /* return the result */
    var res = this.options.thumbnailName;
    var reg = new RegExp("(%PATH%)", "g");
    res = res.replace(reg, imgPath);
    reg = new RegExp("(%FULL_NAME%)", "g");
    res = res.replace(reg, imgFullName);
    reg = new RegExp("(%NAME%)", "g");
    res = res.replace(reg, imgName);
    reg = new RegExp("(%EXT%)", "g");
    res = res.replace(reg, imgExt);
    return res;
  },
  /* List of all the callback, used to set the jQuery context for each one */
  tiSlideshow.prototype.beforeOpen = function() {
    var func = $.proxy(this.options.beforeOpen, this.container);
    var ret = func();
    if (ret == 0 || ret == false)
      return false;
    return true;
  };
  tiSlideshow.prototype.onOpen = function() {
    var func = $.proxy(this.options.onOpen, this.container);
    var ret = func();
    if (ret == 0 || ret == false)
      return false;
    return true;
  };
  tiSlideshow.prototype.beforeClose = function() {
    var func = $.proxy(this.options.beforeClose, this.container);
    var ret = func();
    if (ret == 0 || ret == false)
      return false;
    return true;
  };
  tiSlideshow.prototype.onClose = function() {
    var func = $.proxy(this.options.onClose, this.container);
    var ret = func();
    if (ret == 0 || ret == false)
      return false;
    return true;
  };
  tiSlideshow.prototype.beforeSlide = function(currentPictureIndex, futurePictureIndex) {
    var func = $.proxy(this.options.beforeSlide, this.container);
    var ret = func(currentPictureIndex, futurePictureIndex);
    if (ret == 0 || ret == false)
      return false;
    return true;
  };
  tiSlideshow.prototype.onSlide = function(lastPictureIndex, currentPictureIndex) {
    var func = $.proxy(this.options.onSlide, this.container);
    var ret = func(lastPictureIndex, currentPictureIndex);
    if (ret == 0 || ret == false)
      return false;
    return true;
  };

  /* 
   * Usefull functions for the jQuery launch, with default settings
   * and global parameters
   */
  $.tiSlideshow = {
    name : "tiSlideshow",
    author : "Emeric Kasbarian",
    version : "0.0.1",
    interfaces : [],
    options : {
      auto : false,
      mask : "#000",
      opacity : 0.9,
      closeButton : true,
      slideButtons : true,
      infiniteSlide : false,
      thumbnails : true,
      tactile : false,
      beginIndex : 0,
      thumbnailName : "%PATH%%FULL_NAME%",
      beforeOpen : function() {},
      onOpen : function() {},
      beforeClose : function() {},
      onClose : function() {},
      beforeSlide : function() {},
      onSlide : function() {}
    },
    tiSlideshow : function(options) {
      var extendedOptions = $.extend({}, $.tiSlideshow.options, options);
      var obj;
      return this.each(function() {
        if (typeof options == 'string') {
          if ($(this).data('tiSlideshow')) {
            obj = $.tiSlideshow.interfaces[$(this).data('id')];
            /* Manage the commands that can be passed as parameters */
            if (options == 'open')
              obj.open();
            if (options == 'close')
              obj.close();
            if (options == 'next')
              obj.next();
            if (options == 'previous')
              obj.previous();
          }
        } else {
          if ($(this).data('tiSlideshow')) {
            $.tiSlideshow.interfaces[$(this).data('id')].changeOptions(options);
            if ($.tiSlideshow.interfaces[$(this).data('id')].options.auto)
              $(this).tiSlideshow('open');
          } else {
            var id = $.tiSlideshow.interfaces.length;
            $(this).data('tiSlideshow', true);
            $(this).data('id', id);
            new tiSlideshow($(this), extendedOptions, id);
          }
        }
      });
    },
    retrieveOpenedTiSlideshow : function() {
      if (!$('.tiSlideshowExposeMask').length)
        return null;
      var exposeMaskId = $('.tiSlideshowExposeMask').attr('id');
      for(var id in $.tiSlideshow.interfaces){
        if ($.tiSlideshow.interfaces[id].maskId == exposeMaskId)
          return $.tiSlideshow.interfaces[id];
      }
      return null;
    },
    adjustSize : function() {
      /* Check if a tiSlideshow is open */
      var openedTiSlideshow = $.tiSlideshow.retrieveOpenedTiSlideshow();
      if (!openedTiSlideshow)
        return ;
      var window_height = $(window).height();
      var window_width = $(window).width();
      /* Resize inside tiSlideshowPlace, choose size of the main top and bottom parts */
      if (window_height - 100 > 0)
        $('.tiSlideshowPlaceSlider').height(window_height - 100);
      else
        $('.tiSlideshowPlaceSlider').height(0);
      /* Properly place arrows to change slide */
      var diff_previous = parseInt(($('.tiSlideshowPlaceSlider').height() - $('.tiSlideshowPlaceSliderPrevious').height()) / 2);
      var diff_next = parseInt(($('.tiSlideshowPlaceSlider').height() - $('.tiSlideshowPlaceSliderNext').height()) / 2);
      $('.tiSlideshowPlaceSliderPrevious').css('top', diff_previous + 'px');
      $('.tiSlideshowPlaceSliderNext').css('top', diff_next + 'px');
      
      /* Resize inside tiSlideshowPlaceControl */
      if ($('.tiSlideshowPlaceControlThumbnailsScroll').data('jsp'))
        $('.tiSlideshowPlaceControlThumbnailsScroll').data('jsp').destroy();
      if (window_width - 100 > 0) {
        $('.tiSlideshowPlaceControlThumbnailsScroll').width(window_width - 100);
      }
      else
        $('.tiSlideshowPlaceControlThumbnailsScroll').width(0);
      /* Resize each thumbnail */
      $('.tiSlideshowPlaceControlThumbnailsThumbnail').each(function() {
        var max_t_h = $(this).height();
        var max_t_w = $(this).width();
        if ($(this).find('img').data('originalHeight') && $(this).find('img').data('originalWidth')) {
          var h = $(this).find('img').data('originalHeight');
          var w = $(this).find('img').data('originalWidth');
          if (h > max_t_h || w > max_t_w) {
            if (h > max_t_h) {
              w = w * max_t_h / h;
              h = max_t_h;
            }
            if (w > max_t_w) {
              h = h * max_t_w / w;
              w = max_t_w;
            }
            $(this).find('img').height(h);
            $(this).find('img').width(w);
            var diff = parseInt((max_t_h - h) / 2);
            if (diff < 0)
              diff = 0;
            $(this).find('img').css('margin-top', diff+'px');
          }
        }
      });
      /* Activate the ScrollPane */
      if (!$('.tiSlideshowPlaceControlThumbnailsScroll').data('jsp')) {
        if ($.fn.jScrollPane)
          $('.tiSlideshowPlaceControlThumbnailsScroll').jScrollPane();
      } else {
        $('.tiSlideshowPlaceControlThumbnailsScroll').data('jsp').reinitialise();
      }
      /* Resize inside tiSlideshowPlaceSlider */
      var max_h = parseInt($('.tiSlideshowPlaceSlider').height());
      var max_w = parseInt($('.tiSlideshowPlaceSlider').width());
      if (!$('.tiSlideshowPlaceSliderPicture img').data('originalHeight') || !$('.tiSlideshowPlaceSliderPicture img').data('originalWidth')) {
        return ;
      }
      var h = parseInt($('.tiSlideshowPlaceSliderPicture img').data('originalHeight'));
      var w = parseInt($('.tiSlideshowPlaceSliderPicture img').data('originalWidth'));
      /* Check if you have to resize image */
      $('.tiSlideshowPlaceSliderPicture img').css('margin-top', '0px');
      if (h > max_h || w > max_w) {
        if (h > max_h) {
          w = w * max_h / h;
          h = max_h;
        }
        if (w > max_w) {
          h = h * max_w / w;
          w = max_w;
        }
      }
      $('.tiSlideshowPlaceSliderPicture img').height(h);
      $('.tiSlideshowPlaceSliderPicture img').width(w);
      var diff = parseInt((max_h - h) / 2);
      if (diff < 0)
        diff = 0;
      $('.tiSlideshowPlaceSliderPicture img').css('margin-top', diff+'px');
    },
    preventTouchmove : function(e) {
      e.preventDefault();
    }
  };

  /*
   * List of all accessible functions for plugin users
   */
  $.fn.tiSlideshow = $.tiSlideshow.tiSlideshow;
  $(window).resize($.tiSlideshow.adjustSize);
}