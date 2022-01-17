function(event, ui) {
        self.minutes = parseInt(ui.value/5* .6);
        self.pluralize();
        self.innerScroll.css('width', ui.value/5 + '%');
        self.number.text( self.minutes );
        var degrees = parseInt(ui.value/5*.6*6);
        $('#hourRotator').css({
            "-webkit-transform": "rotate(" + degrees/12 + "deg)",
              "-moz-transform": "rotate(" + degrees/12 + "deg)",
                "transform": "rotate(" + degrees/12 + "deg)"
        });
        $('#minuteRotator').css({
            "-webkit-transform": "rotate(" + degrees + "deg)",
              "-moz-transform": "rotate(" + degrees + "deg)",
                "transform": "rotate(" + degrees + "deg)"
        });
      }