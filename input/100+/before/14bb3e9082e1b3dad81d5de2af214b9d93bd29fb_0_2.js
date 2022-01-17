function(options){
      this.settings = {
        disabledClass : 'disabled',
        callbackOnInit: false,
        keepOrder : false
      };
      if(options) {
        this.settings = $.extend(this.settings, options);
      }
      var multiSelects = this;
      //multiSelects.hide();
      multiSelects.css('position', 'absolute').css('left', '-9999px');
      multiSelects.each(function(){
        var ms = $(this);

        if (ms.next('.ms-container').length == 0){
          ms.attr('id', ms.attr('id') ? ms.attr('id') : 'ms-'+Math.ceil(Math.random()*1000));
          var container = $('<div id="ms-'+ms.attr('id')+'" class="ms-container"></div>'),
              selectableContainer = $('<div class="ms-selectable"></div>'),
              selectedContainer = $('<div class="ms-selection"></div>'),
              selectableUl = $('<ul class="ms-list"></ul>'),
              selectedUl = $('<ul class="ms-list"></ul>');
          
          ms.data('settings', multiSelects.settings);


          var optgroupLabel = null,
              optgroupId = null,
              optgroupCpt = 0,
              scroll = 0;
          ms.find('optgroup,option').each(function(){
            if ($(this).is('optgroup')){
              optgroupLabel = $(this).attr('label');
              optgroupId = 'ms-'+ms.attr('id')+'-optgroup-'+optgroupCpt;
              selectableUl.append($('<li class="ms-optgroup-container" id="'+
                                  optgroupId+'"><ul class="ms-optgroup"><li class="ms-optgroup-label">'+
                                  optgroupLabel+'</li></ul></li>'));
              optgroupCpt++;
            }
            if ($(this).is("option:not(option[value=''])")){
              var klass = $(this).attr('class') ? ' '+$(this).attr('class') : '';
              var selectableLi = $('<li class="ms-elem-selectable'+klass+'" ms-value="'+$(this).val()+'">'+$(this).text()+'</li>');
            
              if ($(this).attr('title'))
                selectableLi.attr('title', $(this).attr('title'));
              if ($(this).attr('disabled') || ms.attr('disabled')){
                selectableLi.attr('disabled', 'disabled');
                selectableLi.addClass(multiSelects.settings.disabledClass);
              }
              selectableLi.click(function(){
                ms.multiSelect('select', $(this).attr('ms-value'));
              });
              var container = optgroupId ? selectableUl.children('#'+optgroupId).find('ul').first() : selectableUl;
              container.append(selectableLi);
            }
          });
          if (multiSelects.settings.selectableHeader){
            selectableContainer.append(multiSelects.settings.selectableHeader);
          }
          selectableContainer.append(selectableUl);
          if (multiSelects.settings.selectedHeader){
            selectedContainer.append(multiSelects.settings.selectedHeader);
          }
          selectedContainer.append(selectedUl);
          container.append(selectableContainer);
          container.append(selectedContainer);
          ms.after(container);
          ms.find('option:selected').each(function(){
            ms.multiSelect('select', $(this).val(), 'init');
          });

          $('.ms-elem-selectable', container).hover(function(){
            $('li', container).removeClass('ms-hover');
            $(this).toggleClass('ms-hover');
          });

          selectableContainer.on('focusin', function(){
            $(this).addClass('ms-focused');
            selectedContainer.focusout();
          }).on('focusout', function(){
            $(this).removeClass('ms-focused');
            $('li', container).removeClass('ms-hover');
          });

          selectedContainer.on('focusin', function(){
            $(this).addClass('ms-focused');
            selectableContainer.focusout();
          }).on('focusout', function(){
            $(this).removeClass('ms-focused');
            $('li', container).removeClass('ms-hover');
          });

          ms.on('focusin', function(){
            ms.data('ms-focused', true);
            selectableContainer.focusin();

          }).on('focusout', function(){
            ms.data('ms-focused', null);
            selectableContainer.focusout();
          });

          ms.onKeyDown = function(e, keyContainer){

            var selectables = $('.'+keyContainer+' li:visible', container),
                selectablesLength = selectables.length,
                selectableFocused = $('.'+keyContainer+' li.ms-hover', container),
                selectableFocusedIndex = selectableFocused.index('.'+keyContainer+' li:visible'),
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
              $('.'+keyContainer+' ul').scrollTop(scroll);
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
              $('.'+keyContainer+' ul').scrollTop(scroll);
            } else if (e.keyCode == 37 || e.keyCode == 39){ // Right and Left
              if (selectableContainer.hasClass('ms-focused')){
                selectableContainer.focusout();
                selectedContainer.focusin();
              } else {
                selectableContainer.focusin();
                selectedContainer.focusout();
              }
            }
          }

          ms.on('keydown', function(e){
            if (ms.data('ms-focused')){
              var keyContainer = selectableContainer.hasClass('ms-focused') ? 'ms-selectable' : 'ms-selection';
              ms.onKeyDown(e, keyContainer);
            }
          });
        }
      });
    }