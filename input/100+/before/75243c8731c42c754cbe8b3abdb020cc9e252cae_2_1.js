function () {
        var slide = $(this),
            slideWidth = slide.width(),
            slideHeight = slide.height();

        if (slideWidth > self.$element.width()) {
          self.$element.add(self.$wrapper).width(slideWidth);
          self.orbitWidth = self.$element.width();
        }
        if (slideHeight > self.$element.height()) {
          self.$element.add(self.$wrapper).height(slideHeight);
          self.orbitHeight = self.$element.height();
          $fluidPlaceholder = $(this).findFirstImage().clone();
        }
        self.numberSlides += 1;
      }