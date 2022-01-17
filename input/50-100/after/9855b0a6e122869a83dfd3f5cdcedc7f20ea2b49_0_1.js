function() {
      var content;
      content = this.content[0];
      this.maxScrollTop = content.scrollHeight - content.clientHeight;
      this.contentScrollTop = content.scrollTop;
      this.maxSliderTop = this.paneHeight - this.sliderHeight;
      this.sliderTop = this.contentScrollTop * this.maxSliderTop / this.maxScrollTop;
    }