function () {
      this.$bullets = $(this.bulletHTML);
      this.$wrapper.append(this.$bullets);
      this.$slides.each(this.addBullet);
      this.$element.addClass('with-bullets');
      if (this.options.centerBullets) this.$bullets.css('margin-left', -this.$bullets.width() / 2);
    }