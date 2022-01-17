function(index) {
      var self = this;
      var element = self.elements.get(index);
      self.instances[index] = $(element).destaque({
        slideMovement: self.options.slideMovement,
        slideSpeed: self.options.slideSpeed,
        autoSlideDelay: self.options.autoSlideDelay,
        elementSpeed: self.options.elementSpeed,
        stopOnMouseOver: false,
        easingType: self.options.easingType,
        itemSelector: self.options.itemSelector,
        itemForegroundElementSelector: self.options.itemForegroundElementSelector,

        onPageUpdate: function(slideshow, pageData) {
          if(self.currentSlide !== pageData.currentSlide){
            self.options.onPageUpdate(self, slideshow, pageData);
          }

          self.currentSlide = pageData.currentSlide;
        },

        onInit: function() {
          $("body").unbind('keydown.destaque');
        }
      });
    }