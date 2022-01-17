function(e) {
      var $i = $(e.currentTarget)
        , data = $i.val();

      $.proxy(this.play(data), this)
    }