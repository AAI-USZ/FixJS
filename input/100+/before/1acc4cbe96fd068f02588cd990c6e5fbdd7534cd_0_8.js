function() {
      var me, scrollbar;
      me = this;
      scrollbar = $.data(me, SCROLLBAR);
      if (!scrollbar) {
        scrollbar = new NanoScroll(me, options);
        $.data(me, SCROLLBAR, scrollbar);
      } else {
        $.extend(scrollbar.options, settings);
      }
      if (scrollBottom) return scrollbar.scrollBottom(scrollBottom);
      if (scrollTop) return scrollbar.scrollTop(scrollTop);
      if (scrollTo) return scrollbar.scrollTo(scrollTo);
      if (scroll === 'bottom') return scrollbar.scrollBottom(0);
      if (scroll === 'top') return scrollbar.scrollTop(0);
      if (scroll instanceof $) return scrollbar.scrollTo(scroll);
      if (stop) return scrollbar.stop();
      if (flash) return scrollbar.flash();
      return scrollbar.reset();
    }