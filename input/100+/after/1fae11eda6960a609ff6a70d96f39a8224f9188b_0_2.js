function($parse){
  return {
    link: function(scope, elm, attrs) {
      var keysByCode = {
        8:  'backspace',
        9:  'tab',
        13: 'enter',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'insert',
        46: 'delete'
      };

      var params, paramsParsed, expression, keys, combinations = [];
      try {
        params = scope.$eval(attrs.uiKeypress);
        paramsParsed = true;
      } catch (error) {
        params = attrs.uiKeypress.split(/\s+and\s+/i);
        paramsParsed = false;
      }

      // Prepare combinations for simple checking
      angular.forEach(params, function(v, k) {
        var combination = {};
        if(paramsParsed) {
          // An object passed
          combination.expression = $parse(v);
          combination.keys = k;
        } else {
          // A string passed
          v = v.split(/\s+on\s+/i);
          combination.expression = $parse(v[0]);
          combination.keys = v[1];
        }
        combination.keys = combination.keys.split('-');
        combinations.push(combination);
      });

      // Check only mathcing of pressed keys one of the conditions
      elm.bind('keydown', function(event) {
        // No need to do that inside the cycle
        var altPressed   = event.metaKey || event.altKey;
        var ctrlPressed  = event.ctrlKey;
        var shiftPressed = event.shiftKey;

        // Iterate over prepared combinations
        angular.forEach(combinations, function(combination) {
          var mainKeyPressed = combination.keys.indexOf( keysByCode[event.keyCode] ) > -1 || combination.keys.indexOf( event.keyCode.toString() ) > -1

          var altRequired   =  combination.keys.indexOf('alt')   > -1;
          var ctrlRequired  =  combination.keys.indexOf('ctrl')  > -1;
          var shiftRequired =  combination.keys.indexOf('shift') > -1;

          if( mainKeyPressed &&
              ( altRequired   == altPressed   ) &&
              ( ctrlRequired  == ctrlPressed  ) &&
              ( shiftRequired == shiftPressed )
            ) {
            // Run the function
            scope.$apply(function(){
              combination.expression(scope, { '$event' : event });
            });
          }
        });
      });
    }
  };
}