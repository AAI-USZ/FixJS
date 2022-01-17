function(slideshow, pageData) {
          if(self.currentSlide !== pageData.currentSlide){
            self.options.onPageUpdate(self, slideshow, pageData);
          }
          self.currentSlide = pageData.currentSlide;
          
        }