function() {
            this.__seriesElements = {};
            this.__seriesLabels = {};

            $('body').append('<div id="tooltip" class="tooltip"><div class="content"><label class="xlabel">x</label> <span class="xval"></span><br /><label class="ylabel">y</label> <span class="yval"></span></div></div>');
        }