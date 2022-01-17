function getPosition( cache, settings ){
        var elOffset = $element.offset(),
          elHeight = $element.outerHeight(),
          elWidth = $element.outerWidth();

        if( typeof position === 'undefined' || cache === false ){
          position = Tip.calcPosition(elOffset, elHeight, elWidth, settings);
        }
        return position;
      }