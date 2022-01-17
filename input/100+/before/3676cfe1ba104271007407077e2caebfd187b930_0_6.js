function($, my) {
  // Animate the appearance of an element by expanding its height
  my.animateHeight = function(element, animTime) {
    if (!animTime) { animTime = 350; }
    element.show();
    var finalHeight = element.height();
    element.height(0);
    element.animate({height:finalHeight}, animTime);
  };

  my.bindInputChanges = function(input, callback) {
    input.keyup(callback);
    input.keydown(callback);
    input.keypress(callback);
    input.change(callback);
  };

  my.setupDatasetDeleteButton = function() {
    var select = $('select.dataset-delete');
    select.attr('disabled','disabled');
    select.css({opacity: 0.3});
    $('button.dataset-delete').click(function(e) {
      select.removeAttr('disabled');
      select.fadeTo('fast',1.0);
      $(e.target).css({opacity:0});
      $(e.target).attr('disabled','disabled');
      return false;
    });
  };

  // Attach dataset autocompletion to provided elements
  //
  // Requires: jquery-ui autocomplete
  my.setupPackageAutocomplete = function(elements) {
    elements.autocomplete({
      minLength: 0,
      source: function(request, callback) {
        var url = '/dataset/autocomplete?q=' + request.term;
        $.ajax({
          url: url,
          success: function(data) {
            // atm is a string with items broken by \n and item = title (name)|name
            var out = [];
            var items = data.split('\n');
            $.each(items, function(idx, value) {
              var _tmp = value.split('|');
              var _newItem = {
                label: _tmp[0],
                value: _tmp[1]
              };
              out.push(_newItem);
            });
            callback(out);
          }
        });
      }
      , select: function(event, ui) {
        var input_box = $(this);
        input_box.val('');
        var old_name = input_box.attr('name');
        var field_name_regex = /^(\S+)__(\d+)__(\S+)$/;
        var split = old_name.match(field_name_regex);

        var new_name = split[1] + '__' + (parseInt(split[2],10) + 1) + '__' + split[3];

        input_box.attr('name', new_name);
        input_box.attr('id', new_name);
        
        var $new = $('<div class="ckan-dataset-to-add"><p></p></div>');
        $new.append($('<input type="hidden" />').attr('name', old_name).val(ui.item.value));
        $new.append('<i class="icon-plus-sign"></i> ');
        $new.append(ui.item.label);
        input_box.after($new);

        // prevent setting value in autocomplete box
        return false;
      }
    });
  };

  // Attach tag autocompletion to provided elements
  //
  // Requires: jquery-ui autocomplete
  my.setupTagAutocomplete = function(elements) {
    // don't navigate away from the field on tab when selecting an item
    elements.bind( "keydown",
      function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB && $( this ).data( "autocomplete" ).menu.active ) {
          event.preventDefault();
        }
      }
    ).autocomplete({
        minLength: 1,
        source: function(request, callback) {
          // here request.term is whole list of tags so need to get last
          var _realTerm = $.trim(request.term.split(',').pop());
          var url = CKAN.SITE_URL + '/api/2/util/tag/autocomplete?incomplete=' + _realTerm;
          $.getJSON(url, function(data) {
            // data = { ResultSet: { Result: [ {Name: tag} ] } } (Why oh why?)
            var tags = $.map(data.ResultSet.Result, function(value, idx) {
              return value.Name;
            });
            callback( $.ui.autocomplete.filter(tags, _realTerm) );
          });
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = this.value.split(',');
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( " "+ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( " " );
          this.value = terms.join( "," );
          return false;
        }
    });
  };

  // Attach tag autocompletion to provided elements
  //
  // Requires: jquery-ui autocomplete
  my.setupFormatAutocomplete = function(elements) {
    elements.autocomplete({
      minLength: 1,
      source: function(request, callback) {
        var url = CKAN.SITE_URL + '/api/2/util/resource/format_autocomplete?incomplete=' + request.term;
        $.getJSON(url, function(data) {
          // data = { ResultSet: { Result: [ {Name: tag} ] } } (Why oh why?)
          var formats = $.map(data.ResultSet.Result, function(value, idx) {
            return value.Format;
          });
          callback(formats);
        });
      }
    });
  };

  my.setupOrganizationUserAutocomplete = function(elements) {
    elements.autocomplete({
      minLength: 2,
      source: function(request, callback) {
        var url = '/api/2/util/user/autocomplete?q=' + request.term;
        $.getJSON(url, function(data) {
          $.each(data, function(idx, userobj) {
            var label = userobj.name;
            if (userobj.fullname) {
              label += ' [' + userobj.fullname + ']';
            }
            userobj.label = label;
            userobj.value = userobj.name;
          });
          callback(data);
        });
      },
      select: function(event, ui) {
        var input_box = $(this);
        input_box.val('');
        var parent_dd = input_box.parent('dd');
        var old_name = input_box.attr('name');
        var field_name_regex = /^(\S+)__(\d+)__(\S+)$/;
        var split = old_name.match(field_name_regex);

        var new_name = split[1] + '__' + (parseInt(split[2],10) + 1) + '__' + split[3];
        input_box.attr('name', new_name);
        input_box.attr('id', new_name);

        parent_dd.before(
          '<input type="hidden" name="' + old_name + '" value="' + ui.item.value + '">' +
          '<input type="hidden" name="' + old_name.replace('__name','__capacity') + '" value="editor">' +
          '<dd>' + ui.item.label + '</dd>'
        );

        return false; // to cancel the event ;)
      }
    });
  };


  // Attach user autocompletion to provided elements
  //
  // Requires: jquery-ui autocomplete
  my.setupUserAutocomplete = function(elements) {
    elements.autocomplete({
      minLength: 2,
      source: function(request, callback) {
        var url = CKAN.SITE_URL + '/api/2/util/user/autocomplete?q=' + request.term;
        $.getJSON(url, function(data) {
          $.each(data, function(idx, userobj) {
            var label = userobj.name;
            if (userobj.fullname) {
              label += ' [' + userobj.fullname + ']';
            }
            userobj.label = label;
            userobj.value = userobj.name;
          });
          callback(data);
        });
      }
    });
  };


  my.relatedSetup = function(form) {
    $('[rel=popover]').popover();

    function addAlert(msg) {
      $('<div class="alert alert-error" />').html(msg).hide().prependTo(form).fadeIn();
    }

    function relatedRequest(action, method, data) {
      return $.ajax({
        type: method,
        dataType: 'json',
        contentType: 'application/json',
        url: CKAN.SITE_URL + '/api/3/action/related_' + action,
        data: data ? JSON.stringify(data) : undefined,
        error: function(err, txt, w) {
          // This needs to be far more informative.
          addAlert('<strong>Error:</strong> Unable to ' + action + ' related item');
        }
      });
    }

    // Center thumbnails vertically.
    var relatedItems = $('.related-items');
    relatedItems.find('li').each(function () {
      var item = $(this), description = item.find('.description');

      function vertiallyAlign() {
        var img = $(this),
            height = img.height(),
            parent = img.parent().height(),
            top = (height - parent) / 2;

        if (parent < height) {
          img.css('margin-top', -top);
        }
      }

      item.find('img').load(vertiallyAlign);
      description.data('height', description.height()).truncate();
    });

    relatedItems.on('mouseenter mouseleave', '.description.truncated', function (event) {
      var isEnter = event.type === 'mouseenter'
          description = $(this)
          timer = description.data('hover-intent');

      function update() {
        var parent = description.parents('li:first'),
            difference = description.data('height') - description.height();

        description.truncate(isEnter ? 'expand' : 'collapse');
        parent.toggleClass('expanded-description', isEnter);

        // Adjust the bottom margin of the item relative to it's current value
        // to allow the description to expand without breaking the grid.
        parent.css('margin-bottom', isEnter ? '-=' + difference + 'px' : '');
        description.removeData('hover-intent');
      }

      if (!isEnter && timer) {
        // User has moused out in the time set so cancel the action.
        description.removeData('hover-intent');
        return clearTimeout(timer);
      } else if (!isEnter && !timer) {
        update();
      } else {
        // Delay the hover action slightly to wait to see if the user mouses
        // out again. This prevents unwanted actions.
        description.data('hover-intent', setTimeout(update, 200));
      }
    });

    // Add a handler for the delete buttons.
    relatedItems.on('click', '[data-action=delete]', function (event) {
      var id = $(this).data('relatedId');
      relatedRequest('delete', 'POST', {id: id}).done(function () {
        $('#related-item-' + id).remove();
      });
      event.preventDefault();
    });

    $(form).submit(function (event) {
      event.preventDefault();

      // Validate the form
      var form = $(this), data = {};
      jQuery.each(form.serializeArray(), function () {
        data[this.name] = this.value;
      });

      form.find('.alert').remove();
      form.find('.error').removeClass('error');
      if (!data.title) {
        addAlert('<strong>Missing field:</strong> A title is required');
        $('[name=title]').parent().addClass('error');
        return;
      }
      if (!data.url) {
        addAlert('<strong>Missing field:</strong> A url is required');
        $('[name=url]').parent().addClass('error');
        return;
      }

      relatedRequest('create', this.method, data).done(function () {
        // TODO: Insert item dynamically.
        window.location.reload();
      });
    });
  };

  // Attach authz group autocompletion to provided elements
  //
  // Requires: jquery-ui autocomplete
  my.setupAuthzGroupAutocomplete = function(elements) {
    elements.autocomplete({
      minLength: 2,
      source: function(request, callback) {
        var url = CKAN.SITE_URL + '/api/2/util/authorizationgroup/autocomplete?q=' + request.term;
        $.getJSON(url, function(data) {
          $.each(data, function(idx, userobj) {
            var label = userobj.name;
            userobj.label = label;
            userobj.value = userobj.name;
          });
          callback(data);
        });
      }
    });
  };

  my.setupGroupAutocomplete = function(elements) {
    elements.autocomplete({
      minLength: 2,
      source: function(request, callback) {
        var url = CKAN.SITE_URL + '/api/2/util/group/autocomplete?q=' + request.term;
        $.getJSON(url, function(data) {
          $.each(data, function(idx, userobj) {
            var label = userobj.name;
            userobj.label = label;
            userobj.value = userobj.name;
          });
          callback(data);
        });
      }
    });
  };

  my.setupMarkdownEditor = function(markdownEditor) {
    // Markdown editor hooks
    markdownEditor.find('button, div.markdown-preview').live('click', function(e) {
      e.preventDefault();
      var $target = $(e.target);
      // Extract neighbouring elements
      var markdownEditor=$target.closest('.markdown-editor');
      markdownEditor.find('button').removeClass('depressed');
      var textarea = markdownEditor.find('.markdown-input');
      var preview = markdownEditor.find('.markdown-preview');
      // Toggle the preview
      if ($target.is('.js-markdown-preview')) {
        $target.addClass('depressed');
        raw_markdown=textarea.val();
        preview.html("<em>"+CKAN.Strings.loading+"<em>");
        $.post(CKAN.SITE_URL + "/api/util/markdown", { q: raw_markdown },
          function(data) { preview.html(data); }
        );
        preview.width(textarea.width());
        preview.height(textarea.height());
        textarea.hide();
        preview.show();
      } else {
        markdownEditor.find('.js-markdown-edit').addClass('depressed');
        textarea.show();
        preview.hide();
        textarea.focus();
      }
      return false;
    });
  };

  // If notes field is more than 1 paragraph, just show the
  // first paragraph with a 'Read more' link that will expand
  // the div if clicked
  my.setupNotesExtract = function() {
    var notes = $('#content div.notes');
    var paragraphs = notes.find('#notes-extract > *');
    if (paragraphs.length===0) {
      notes.hide();
    }
    else if (paragraphs.length > 1) {
      var remainder = notes.find('#notes-remainder');
      $.each(paragraphs,function(i,para) {
        if (i > 0) { remainder.append($(para).remove()); }
      });
      var finalHeight = remainder.height();
      remainder.height(0);
      notes.find('#notes-toggle').show();
      notes.find('#notes-toggle button').click(
        function(event){
          notes.find('#notes-toggle button').toggle();
          if ($(event.target).hasClass('more')) {
            remainder.animate({'height':finalHeight});
          }
          else {
            remainder.animate({'height':0});
          }
          return false;
        }
      );
    }
  };

  my.warnOnFormChanges = function() {
    var boundToUnload = false;
    return function($form) {
      var flashWarning = function() {
        if (boundToUnload) { return; }
        boundToUnload = true;
        // Bind to the window departure event
        window.onbeforeunload = function () {
          return CKAN.Strings.youHaveUnsavedChanges;
        };
      };
      // Hook form modifications to flashWarning
      $form.find('input,select').live('change', function(e) {
        $target = $(e.target);
        // Entering text in the 'add' box does not represent a change
        if ($target.closest('.resource-add').length===0) {
          flashWarning();
        }
      });
      // Don't stop us leaving
      $form.submit(function() {
        window.onbeforeunload = null;
      });
      // Calling functions might hook to flashWarning
      return flashWarning;
    };
  }();

  my.countObject = function(obj) {
    var count=0;
    $.each(obj, function() {
      count++;
    });
    return count;
  };

  function followButtonClicked(event) {
    var button = event.currentTarget;
    if (button.id === 'user_follow_button') {
        var object_type = 'user';
    } else if (button.id === 'dataset_follow_button') {
        var object_type = 'dataset';
    }
    else {
        // This shouldn't happen.
        return;
    }
	var object_id = button.getAttribute('data-obj-id');
    if (button.getAttribute('data-state') === "follow") {
        if (object_type == 'user') {
            var url = '/api/action/follow_user';
        } else if (object_type == 'dataset') {
            var url = '/api/action/follow_dataset';
        } else {
            // This shouldn't happen.
            return;
        }
        var data = JSON.stringify({
          id: object_id,
        });
        var nextState = 'unfollow';
        var nextString = CKAN.Strings.unfollow;
    } else if (button.getAttribute('data-state') === "unfollow") {
        if (object_type == 'user') {
            var url = '/api/action/unfollow_user';
        } else if (object_type == 'dataset') {
            var url = '/api/action/unfollow_dataset';
        } else {
            // This shouldn't happen.
            return;
        }
        var data = JSON.stringify({
          id: object_id,
        });
        var nextState = 'follow';
        var nextString = CKAN.Strings.follow;
    }
    else {
        // This shouldn't happen.
        return;
    }
    $.ajax({
      contentType: 'application/json',
      url: url,
      data: data,
      dataType: 'json',
      processData: false,
      type: 'POST',
      success: function(data) {
        button.setAttribute('data-state', nextState);
        button.innerHTML = nextString;
      },
    });
  };
  
  // This only needs to happen on dataset pages, but it doesn't seem to do
  // any harm to call it anyway.
  $('#user_follow_button').on('click', followButtonClicked);
  $('#dataset_follow_button').on('click', followButtonClicked);

  return my;
}(jQuery, CKAN.Utils || {}