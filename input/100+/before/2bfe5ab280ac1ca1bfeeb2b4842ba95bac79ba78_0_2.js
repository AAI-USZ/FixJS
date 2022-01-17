function (options) {
    var defaults = {
      disable_class: "js-disable-custom"
    };
    var options = $.extend(defaults, options);
    
    function appendCustomMarkup(idx, sel) {
      var $this = $(sel).hide(),
          type  = $this.attr('type'),
          $span = $this.next('span.custom.' + type);

      if ($span.length === 0) {
        $span = $('<span class="custom ' + type + '"></span>').insertAfter($this);
      }

      $span.toggleClass('checked', $this.is(':checked'));
      $span.toggleClass('disabled', $this.is(':disabled'));
    }

    function appendCustomSelect(idx, sel) {
      var $this = $(sel),
          $customSelect = $this.next('div.custom.dropdown'),
          $options = $this.find('option'),
          $seloptions = $this.find('option:selected'),
          maxWidth = 0,
          $li;

      if ($this.hasClass('no-custom')) { return; }
      if ($customSelect.length === 0) {
        $customSelectSize = '';
        if ($(sel).hasClass('small')) {
        	$customSelectSize = 'small';
        } else if ($(sel).hasClass('medium')) {
        	$customSelectSize = 'medium';
        } else if ($(sel).hasClass('large')) {
        	$customSelectSize = 'large';
        } else if ($(sel).hasClass('expand')) {
        	$customSelectSize = 'expand';
        }
        $customSelect = $('<div class="custom dropdown ' + $customSelectSize + '"><a href="#" class="selector"></a><ul></ul></div>"');
        $options.each(function () {
          $li = $('<li>' + $(this).html() + '</li>');
          $customSelect.find('ul').append($li);
        });
        $customSelect.prepend('<a href="#" class="current">' + $seloptions.html() + '</a>');

        $this.after($customSelect);
        $this.hide();

      } else {
        // refresh the ul with options from the select in case the supplied markup doesn't match
        $customSelect.find('ul').html('');
        $options.each(function () {
          $li = $('<li>' + $(this).html() + '</li>');
          $customSelect.find('ul').append($li);
        });
      }

      $customSelect.toggleClass('disabled', $this.is(':disabled'));

      $options.each(function (index) {
        if (this.selected) {
          $customSelect.find('li').eq(index).addClass('selected');
          $customSelect.find('.current').html($(this).html());
        }
      });

      $customSelect.css('width', 'inherit');
      $customSelect.find('ul').css('width', 'inherit');

      $customSelect.find('li').each(function () {
        $customSelect.addClass('open');
        if ($(this).outerWidth() > maxWidth) {
          maxWidth = $(this).outerWidth();
        }
        $customSelect.removeClass('open');
      });

      if (!$customSelect.is('.small, .medium, .large, .expand')) {
        $customSelect.css('width', maxWidth + 18 + 'px');
        $customSelect.find('ul').css('width', maxWidth + 16 + 'px');
      }

    }
    
    $('form.custom input:radio[data-customforms!=disabled]').each(appendCustomMarkup);
    $('form.custom input:checkbox[data-customforms!=disabled]').each(appendCustomMarkup);
    $('form.custom select[data-customforms!=disabled]').each(appendCustomSelect);
  }