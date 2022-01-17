function(e, keyContainer){
            var selectables = $('.'+keyContainer+' li:visible:not(.ms-optgroup-label, .ms-optgroup-container)', container),
                selectablesLength = selectables.length,
                selectableFocused = $('.'+keyContainer+' li.ms-hover', container),
                selectableFocusedIndex = $('.'+keyContainer+' li:visible:not(.ms-optgroup-label, .ms-optgroup-container)', container).index(selectableFocused),
                liHeight = selectables.first().outerHeight(),
                numberOfItemsDisplayed = Math.ceil(container.outerHeight()/liHeight),
                scrollStart = Math.ceil(numberOfItemsDisplayed/4);

            selectables.removeClass('ms-hover');
            if (e.keyCode == 32){ // space
              var method = keyContainer == 'ms-selectable' ? 'select' : 'deselect';
              ms.multiSelect(method, selectableFocused.first().attr('ms-value'));

            } else if (e.keyCode == 40){ // Down
              var nextIndex = (selectableFocusedIndex+1 != selectablesLength) ? selectableFocusedIndex+1 : 0,
                  nextSelectableLi = selectables.eq(nextIndex);

              nextSelectableLi.addClass('ms-hover');
              if (nextIndex > scrollStart){
                scroll += liHeight;
              } else if (nextIndex == 0){
                scroll = 0;
              }
              $('.'+keyContainer+' ul', container).scrollTop(scroll);
            } else if (e.keyCode == 38){ // Up
              var prevIndex = (selectableFocusedIndex-1 >= 0) ? selectableFocusedIndex-1 : selectablesLength-1,
                  prevSelectableLi = selectables.eq(prevIndex);
              selectables.removeClass('ms-hover');
              prevSelectableLi.addClass('ms-hover');
              if (selectablesLength-prevIndex+1 < scrollStart){
                scroll = liHeight*(selectablesLength-scrollStart);
              } else {
                scroll -= liHeight;
              }
              $('.'+keyContainer+' ul', container).scrollTop(scroll);
            } else if (e.keyCode == 37 || e.keyCode == 39){ // Right and Left
              if (selectableUl.hasClass('ms-focus')){
                selectableUl.focusout();
                selectedUl.focusin();
              } else {
                selectableUl.focusin();
                selectedUl.focusout();
              }
            }
          }