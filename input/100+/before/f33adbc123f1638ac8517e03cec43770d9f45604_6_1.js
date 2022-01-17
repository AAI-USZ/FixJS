function(combination) {
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
            scope.$eval(combination.expression);
          }
        }