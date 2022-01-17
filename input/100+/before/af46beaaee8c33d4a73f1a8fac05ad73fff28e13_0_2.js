function(options) {

    var defaults = {

      maxFontPixels: 40,

      minFontPixels: 4,

      innerTag: 'span',

      callback: null,

      complete: null

    };

    var Opts = jQuery.extend(defaults, options);

    

    this.each(function() {

      var ourText = $(Opts.innerTag + ':visible:first', this);

      var maxHeight = $(this).height();

      var maxWidth = $(this).width();

      var fontSize;

      

      var minFontPixels = Opts.minFontPixels;

      var maxFontPixels = Opts.maxFontPixels;

      while (fontSize = Math.floor(minFontPixels + maxFontPixels) / 2,

             minFontPixels <= maxFontPixels) {

        ourText.css('font-size', fontSize);

        if (ourText.height() < maxHeight && ourText.width() < maxWidth)

          minFontPixels = fontSize + 1;

        else

          maxFontPixels = fontSize - 1;

      }

      

      // call callback on each result

      if (Opts.callback) Opts.callback(this);

    });

    

    // call complete when all is complete

    if (Opts.complete) Opts.complete(this);

    

    return this;

  }