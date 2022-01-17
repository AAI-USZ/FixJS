function() {
    //// Ajax forms
    
    /**
     * Adds serializeObject method to elements. When called on forms, it results
     * in form being serialized into JSON object {name:value, name2: value2}.
     */
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    function get_inputs($form) {    // all except metadata
        return $form.find(':input').filter(function() {
            return ! $(this).parent().is('.js-form-metadata');
        });
    }

    // Validate
    var validations = {
/*        required: function(input) {
            if ($(input).val()) return false;
            else return gettext('Field cannot be blank.');
        }*/
    };
    AjaxFormLib.validations = validations;

    function show_form_error(input, msg) {
        if (!input) {
            carp("Attempt to render error for empty input:", msg);
            return;
        }
        if (msg.shift) {
            var msgs = msg;
            msg = msgs.shift();
        }
        var $msg = $('<span>').addClass('form-error-msg').text(msg);
        var $antecedant = $(input).closest('.markItUp').add(input).eq(0);
        $antecedant.before($msg);
        if (msgs && msgs.length) show_form_error(input, msgs);
    }
    /**
     * Automatic class-driven validation.
     * For each :input in the form, find its label and check if some of the label's classes
     * isn't in the validations object. If so, then run the function passing it the input.
     * If it returns *FALSE*, then this input *VALIDATES*.
     * If it returns a true value, it is used as the error message and passed to show_form_error.
     */
    function validate($form) {
        var ok = true;
        $('.form-error-msg,.non-field-errors').remove();
        get_inputs($form).each( function() {
            var $label = $( str_concat('label[for=',this.id,']') );
            $('#err-overlay').empty().hide();
            var classes = ($label.attr('className')||'').split(/\s+/);
            for (var i = 0; i < classes.length; i++) {
                var cl = classes[i];
                if ($.isFunction(validations[ cl ])) {
                    var err = validations[ cl ](this);
                    if (err) {
                        show_form_error(this, err);
                        ok = false;
                    }
                }
            }
        });

        if (ok && $form.data('validation')) {
            ok = $form.data('validation')( $form );
        }

        return ok;
    }
    
    function clean_inputs($form) {
        var $inputs = $('#absolutely#_nothing');
        get_inputs($form).each( function() {
            // Don't send suggest inputs
            if ( /(.*)_suggest$/.test($(this).attr('id')) ) {
                return;
            }
            // Shave off the names from suggest-enhanced hidden inputs
            if ( $(this).is('input:hidden') && $form.find( str_concat('#',$(this).attr('id'),'_suggest') ).length ) {
                $inputs = $inputs.add(   $(this).clone().val( $(this).val().replace(/#.*/, '') )   );
                return;
            }
            // Shave off the days of week from date-time inputs
            if ( $(this).is('.vDateTimeInput,.vDateInput') ) {
                $inputs = $inputs.add(   $(this).clone().val( $(this).val().replace(/ \D{2}$/, '') )   );
                return;
            }
            $inputs = $inputs.add($(this));
        });
        return $inputs;
    }
    AjaxFormLib.clean_inputs = clean_inputs;
    
    function clean_inputs_with_files($form) {
        // Shave off the names from suggest-enhanced hidden inputs
        $form.find('input:hidden').each( function() {
            if ($form.find( str_concat('#',$(this).attr('id'),'_suggest') ).length == 0) return;
            $(this).val( $(this).val().replace(/#.*/, '') );
        });
        // Shave off the days of week from date-time inputs
        $form.find('.vDateTimeInput,.vDateInput').each( function() {
            $(this).val( $(this).val().replace(/ \D{2}$/, '') );
        } );
    }
    AjaxFormLib.clean_inputs_with_files = clean_inputs_with_files;

    // Submit event
    function ajax_submit($form, button_name, process_redirect) {
        if (!$form.jquery) $form = $($form);
        if ( ! validate($form) ) {
            unlock_window();
            return false;
        }
        NewmanLib.call_pre_submit_callbacks();
        //carp(['ajax_submit: submitting... selector="', $form.selector, '"'].join(''));

        // Hack for file inputs
        var has_files = false;
        $form.find(':file').each( function() {
            if ( $(this).val() ) has_files = true;
        });
        if (has_files) {
            clean_inputs_with_files($form);
            $form.data('standard_submit', true);
            if (button_name) {
                $form.append( str_concat('<input type="hidden" value="1" name="',button_name,'" />') );
            }
            $form.submit();
            unlock_window();
            return true;
        }
        // End of hack for file inputs

        lock_window( str_concat(gettext('Sending'), '...') );

        var action =  $form.attr('action');
        var method = ($form.attr('method') || 'POST').toUpperCase();
        var $meta = $form.find('.js-form-metadata');
        var $success = $meta.find('input[name=success]');
        var $error   = $meta.find('input[name=error]');
        var success, error;
        if ($success && $success.length) {
            success = $success.data('callback');
        }
        else {
            success = show_ajax_success;
        }
        if ($error && $error.length) {
            error = $error.data('callback');
        }
        else {
            error = ajax_submit_error;
        }
        // Process the inputs prior to sending
        var $inputs = clean_inputs($form);

        if (button_name) $inputs = $inputs.add( str_concat('<input type="hidden" value="1" name="',button_name,'" />') );
        var data = $inputs.serialize();
        if ($form.hasClass('js-reset-on-submit')) $form.get(0).reset();
        var address = $form.hasClass('js-dyn-adr')
            ? get_adr(action)
            :         action;
        var url = $('<a>').attr('href', address).get(0).href;

        var request_options = {
            url: url,
            type: method,
            data: data,
            success:  function() { this.succeeded = true;  },
            error:    function() { this.succeeded = false; },
            complete: function(xhr) {
                var redirect_to;
                // JSON redirects temporarily commented out.
                if (process_redirect) {
                    if (redirect_to = xhr.getResponseHeader('Redirect-To')) {
                        var new_req = {};
                        for (k in this) new_req[k] = this[k];
                        new_req.url = redirect_to;
                        new_req.redirect_to = redirect_to;
                        $.ajax( new_req );
                        unlock_window();
                        return;
                    }
                }
                NewmanLib.call_post_submit_callbacks(this.succeeded);
                if (this.succeeded) {
                    try {
                        success.call(this, xhr.responseText, xhr);
                    } catch (e) {
                        carp('Error processing form-send success:', e);
                    }
                }
                else {
                    try {
                        error.apply(this, arguments);
                    } catch(e) {
                        carp('Error processing form-send error:', e);
                    }
                }
                unlock_window();
            },
            _form: $form,
            _button_name: button_name
        };
        if (button_name) request_options._button_name = button_name;
        //NewmanLib.call_pre_submit_callbacks();

        $.ajax( request_options );
        //carp('ajax_submit: request sent (async)');
        return false;
    }
    AjaxFormLib.ajax_submit = ajax_submit;

    function is_error_overlay_empty() {
        var $err_overlay = $('#err-overlay');
        if ($err_overlay.length == 0 || $err_overlay.find('h6') != "") {
            return true;
        }
        return false;
    }

    // Handle error response from the server from a form submit event.
    // In case of changeform and expected JSON response, renders the error messages.
    function ajax_submit_error(xhr) {
        function error_blinking_input() {
            $(input).removeClass('blink');
        }

        function focus_errored_element(input_element) {
            var MOVE_UP_PIXELS = 60;
            var $inp = $(input_element);
            var element_id = $inp.attr('id');
            input_element.focus();
            if (element_id != '') {
                // try to find label and scroll div#content to viewport if neccessary
                $label = $( str_concat('label[for=', element_id, ']') );
                //log_generic.log('label:', $label, ' label for=', element_id);
                var detector = new ContentElementViewportDetector($inp);
                if (!detector.top_in_viewport()) {
                    var $content = $('div#content');
                    var existing_offset = $content.offset();
                    $content.offset({top: existing_offset.top + MOVE_UP_PIXELS});
                }
            }
        }

        var res;
        var $form = this._form;
        try {
            res = JSON.parse( xhr.responseText );
        }
        catch (e) {
            carp('Error parsing JSON error response text.' , e);
        }
        if (res && res.errors) {
            // Show the bubble with scrollto buttons
            var $err_overlay = $('#err-overlay');
            if (is_error_overlay_empty()) {
                $err_overlay = $(
                    '<div id="err-overlay" class="overlay">'
                ).html(
                    '<h6></h6>'
                ).appendTo(
                       $form
                    || $('.change-form').get(0)
                    || $('#content').get(0)
                    || $('body').get(0)
                );
            }

            $err_overlay.find('h6').text(res.message);

            // Show the individual errors
            for (var i = 0; i < res.errors.length; i++) {
                var err = res.errors[i];
                var id = err.id;
                var msgs = err.messages;
                var first_message = '';
                var label = err.label;
                var input;

                // assign first message
                if (msgs.length > 0) {
                    first_message = msgs[0];
                }
                // non-field errors
                if (id == 'id___all__') {
                    var $nfe = $('#non-field-errors');
                    if ($nfe.length == 0) {
                        $nfe = $('<p class="non-field-errors">').insertBefore($form);
                        $nfe.prepend( str_concat(
                              '<input type="text" id="id_non_form_errors" style="position: absolute; left: -500px;" />', "\n"
                            , '<label for="id_non_form_errors" style="display: none;">'
                            ,     gettext('Form errors')
                            , '</label>'
                        ) );
                    }
                    input = document.getElementById('id_non_form_errors');

                    show_form_error(input, msgs);
                }
                else {
                    input = document.getElementById(id);
                    show_form_error(input, msgs);
                    if (!input) carp('Error reported for nonexistant input #',id);
                }

                var $p_element = $('<p>');
                // FIXME (what following 3 lines do?):
                $p_element.data('rel_input',
                      !input                             ? null
                    : $( str_concat('#',input.id,'_suggest') ).length  ? $( str_concat('#',input.id,'_suggest') ).get(0) // take suggest input if available
                    :                                      input                             // otherwise the input itself
                );
                try {
                    var $error_label = $( str_concat('label[for=',input.id,']') );
                    var parts = [
                        '__FILL_THIS__',
                        ': ' ,
                        first_message
                    ];
                    if ($error_label) {
                            parts[0] = $error_label.text();
                    } else {
                            parts[0] = id;
                    }
                    $p_element.text(parts.join('').replace(/:$/,''));
                } catch (e) {
                    // problem occurred
                    $p_element.text(first_message);
                }
                $p_element.click( function(evt) { // focus and scroll to the input
                    if (evt.button != 0) return;
                    var input = $(this).closest('p').data('rel_input');
                    try { focus_errored_element(input); } catch(e) { carp(e); }
                    $(input).addClass('blink')
                    .closest('.collapsed').removeClass('collapsed').addClass('collapse');
                    setTimeout( error_blinking_input, 1500 );
                    return false;
                });
                $p_element.appendTo($err_overlay);
            }
            $err_overlay.show();
        }
        else {
            if (!$form) {
                alert( str_concat(
                    gettext('Error sending form.'),' ',
                    gettext('Moreover, failed to handle the error gracefully.'),"\n",
                    gettext('Reloading page'),'...'
                ) );
                location.reload();
            }
            if ($form.is('.change-form')) {
                AjaxFormLib.save_preset($form, {title: str_concat('* ',gettext('crash save')), msg: gettext('Form content backed up')});
            }
            var id = Kobayashi.closest_loaded( $form.get(0) ).id;
            var address = $form.hasClass('js-dyn-adr')
                ? get_adr($form.attr('action'))
                :         $form.attr('action');
            Kobayashi.inject_error_message({
                target_id: id,
                xhr: xhr,
                address: address
            });
        }
        show_ajax_error(xhr);
    }
    AjaxFormLib.ajax_submit_error = ajax_submit_error;

    // Collapsible fieldsets
    $('.collapse legend').live('click', function(evt) {
        if (evt.button != 0) return;
        $(this).closest('fieldset').removeClass('collapse').addClass('collapsed');
    });
    $('.collapsed legend').live('click', function(evt) {
        if (evt.button != 0) return;
        $(this).closest('fieldset').removeClass('collapsed').addClass('collapse');
    });

    // Submit button
    $('.js-form a.js-submit').live('click', function(evt) {
        if (evt.button != 0) return true;    // just interested in left button
        if ($(this).hasClass('js-noautosubmit')) return true;
        // lock the window
        lock_window();
        var parent_this = this;
        setTimeout(
            function() {
                var $form = $(parent_this).closest('.js-form');
                return ajax_submit($form, parent_this.name, true);
            },
            200
        );
    });

    // Reset button
    $('.js-form a.js-reset').live('click', function(evt) {
        try {
            $(this).closest('form').get(0).reset();
        } catch(e) { }
        return false;
    });

    // Overload default submit event
    function overload_default_submit() {
        $('.js-form')
        .unbind('submit.ajax_overload')
        .bind('submit.ajax_overload', function(evt) {
            if ($(this).data('standard_submit')) return true;
            var name;
            function get_def(form) { return $(form).find('.def:first').attr('name'); }
            if (!evt.originalEvent) name = get_def(this);
            else try {
                // Try to figure out the submit button used.
                var initiator = evt.originalEvent.explicitOriginalTarget;
                if (initiator.type == 'submit')
                    name = initiator.name;
                else
                    name = get_def(this);
            } catch(e) {
                // Event is defined but failed to figure out which button clicked
                // -- leave the name empty.
            }
            return AjaxFormLib.ajax_submit( $(this), name );
        });
    }
    $(document).bind('content_added', overload_default_submit);
    overload_default_submit();
    //// End of ajax forms

    // Set up returning to publishable changelist when coming to change form from it
    $('#changelist tbody th a,.actionlist a').live('click', function(evt) {
        if (evt.button != 0) return;
        NewmanLib.ADR_STACK = [];
        var appname = /js-app-(\w+)\.(\w+)/.exec( $('#changelist').attr('className') );
        if ( ! appname ) {
            return;
        }
        var appname_path = str_concat('/' , appname[1] , '/' , appname[2] , '/');
        if (appname_path == '/core/publishable/') {
            NewmanLib.ADR_STACK = [ { from: '/core/publishable/', to: get_hashadr($(this).attr('href')) } ];
        }
    });

    //// Filters

    // Packing and unpacking filter list. To be removed when filters are reimplemented.
    $('#filters :header').live('click', function(evt) {
        if (evt.which != 1) return true;    // just interested in left button
        var $affected = $(this).next(':first').filter('ul');
        if ($affected.is(':hidden')) {
            $(this).siblings('ul').hide();
        }
        $affected.slideToggle('slow');
    });

    // Close filters button
    $('#filters a.cancel').live('click', function(evt) {
        if (evt.button != 0) return;
        Kobayashi.unload_content('filters');
    });

    // Re-initialization of third party libraries
    /*
    $(document).bind('content_added', function() {
    });
    */

    // Update document title
    var ORIGINAL_TITLE = document.title;
    $(document).bind('content_added', function(evt) {
        var newtitle = $(evt.target).find('#doc-title').text();
        document.title = str_concat( (newtitle ? str_concat(newtitle,' | ') : '') , ORIGINAL_TITLE);
    });

    // Setting up proper suggesters URLs to take the hash address into account
    $(document).bind('content_added', function(evt) {
        var $new_suggest_inputs = $(evt.target).find('.GenericSuggestField,.GenericSuggestFieldMultiple');
        if (!$new_suggest_inputs || $new_suggest_inputs.length == 0) return;
        $new_suggest_inputs.find('input[rel]').each(function() {
            if ($(this).data('original_rel')) return;
            var old_rel = $(this).attr('rel');
            $(this).attr(
                'rel', get_adr(old_rel)
            ).data(
                'original_rel', old_rel
            );
        });
    });

    // Search on HP
    // The search button should send us to an address according to the thing selected in the select
    function do_search() {
        var $form = $('#search-form');
        var option = $form.find('select[name=action] option[selected]').val();
        if (!option) return false;
        var search_terms = $form.find('input[name=q]').val();
        var url = str_concat(option , '?q=' , search_terms);
        adr(url);
        return false;
    }
    $('#search-form a.search.btn').live('click', do_search);
    function search_on_enter(evt) {
        if (evt.keyCode == CR || evt.keyCode == LF) {
            do_search();
            return false;
        }
    }
    $('#search-form input[name=q]'      ).live('keypress', search_on_enter);
    $('#search-form select[name=action]').live('keypress', search_on_enter);

    // Search in change lists
    function changelist_search($input, $pop) {
        if ($('#changelist').length == 0) return;   // We're not in changelist
        var is_pop = $pop.length > 0;
        var search_terms = $input.val();
        var loaded = Kobayashi.closest_loaded( $input.get(0) );
        var adr_term = str_concat('&q=' , search_terms);
        if (is_pop) {
            adr_term = str_concat('&pop=', adr_term);
        }

        // append existing filter arguments to adr_term variable
        var existing_get = Kobayashi.split_get_arguments(loaded.url);
        for (var param in existing_get) {
            if (param == 'q' || param == 'pop') {
                continue;
            }
            adr_term = str_concat(adr_term, '&', param, '=', existing_get[param]);
        }

        if (loaded.id == 'content') {
            adr(adr_term);
        }
        else {
            Kobayashi.simple_load( str_concat(loaded.id , '::' , adr_term) );
        }
        return false;
    }
    $('#filters-handler .btn.search').live('click', function(evt) {
        if (evt.button != 0) return;
        var $input = $(this).prev('input#searchbar');
        var $pop = $(this).siblings('input#id_pop');
        return changelist_search( $input, $pop );
    });
    $('#filters-handler #searchbar').live('keyup', function(evt) {
        if (evt.keyCode == CR || evt.keyCode == LF) {
            evt.preventDefault(); // prevent event propagation to changeform's Save button
        } else {
            return;
        }
        var $pop = $(this).siblings('input#id_pop');
        return changelist_search( $(this), $pop );
    });
}