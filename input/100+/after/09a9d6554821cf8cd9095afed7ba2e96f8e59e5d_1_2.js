function($) {
    function default_adrstack_push_callback(evt) {
        if (evt.button != 0) return;
        evt.preventDefault();
        
        var onsave_callback, onreturn_callback;
        if ($(this).is('.js-custom-adrstack-callbacks')) {
            // Define no callbacks
        }
        else {
            onsave_callback = function(popped, action_table) {
                if (!action_table.vars.object_id) {
                    log_lookup.log('Did not get ID of newly added object -- not selecting added object');
                }
                else {
                    popped.oid = action_table.vars.object_id;
                    popped.str = action_table.vars.object_title;
                }
            };
            onreturn_callback = function(popped, action_table) {
                $(document).one('content_added', function(evt) {
                    NewmanLib.restore_form(popped.form_data, $('.change-form'), {});
                });
                if (popped.oid) {
                    $(document).one('media_loaded', function() {
                        popped.selection_callback(popped.oid,{str: popped.str});
                    });
                }
            };
        }
        
        NewmanLib.ADR_STACK.push( {
            from: get_hashadr(''),
            to: get_hashadr($(this).attr('href')),
            selection_callback: $(Kobayashi.closest_loaded(this).container).data('selection_callback'),
            form_data: JSON.stringify({ data: $('.change-form').serializeArray() }),
            onsave: onsave_callback,
            onreturn: onreturn_callback
        } );
        
        if (adr( $(this).attr('href'), {just_get: 'hash'} ) == location.hash) {
            Kobayashi.reload_content(Kobayashi.DEFAULT_TARGET);
        }
        else {
            adr( $(this).attr('href') );
        }
    }
    $('.js-adrstack-push').live('click', default_adrstack_push_callback);
    // set up handling of mass-uploaded photos when coming from gallery-edit page
    $('.js-adrstack-push.js-custom-adrstack-callbacks.js-multi-upload').live('click', function(evt) {
        var stack_top = NewmanLib.ADR_STACK[ NewmanLib.ADR_STACK.length - 1 ];
        stack_top.input_id = $('#overlay-content').data('input_id');
        stack_top.onsave = function(popped, action_table) {
            if (!action_table.vars.photos) {
                log_lookup.log('Did not get IDs and titles of mass-uploaded photos -- not adding them to form');
                popped.photos = [];
            }
            else {
                popped.photos = action_table.vars.photos;
            }
        };
        stack_top.onreturn = function(popped, action_table) {
            $(document).one('content_added', function(evt) {
                NewmanLib.restore_form(popped.form_data, $('.change-form'), {});
            });
            // add the photos to the gallery
            $(document).one('media_loaded', function() {
                var $input = $('#'+popped.input_id);
                if (!$input || !$input.length) {
                    log_lookup.log('#overlay-content has no input attached -- not adding mass-uploaded photos');
                    return;
                }
                for (var i = 0; i < popped.photos.length; i++) {
                    var photo = popped.photos[i];
                    $input.val(photo.oid);
                    $input.change();
                    $input = $input.closest('.gallery-items-sortable').find(':input.target_id:last');
                }
            });
        }
    });
}