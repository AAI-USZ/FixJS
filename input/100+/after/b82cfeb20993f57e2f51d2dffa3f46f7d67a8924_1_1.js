function() {
    $('.user-story .user-story-status .user-story-task').live('mouseenter', function(e) {
        if(!$(this).is(':data(draggable)')) {
            $(this).draggable({ handle: '.user-story-task', revert: 'invalid', helper:'clone' });
            $(this).draggable();
            apply_dropable_bindings();
        }
    });

    var update_progress = function() {
        var stats_url = $("#progress-bar").attr('rel');
        $.get(stats_url, function(data){
            if (data.valid) { $("#progress-bar").progressbar('option', 'value', data.v); }
        }, 'json');
    };
    update_progress();

    var apply_dropable_bindings = function() {
        $('.user-story .user-story-status').each(function(idx, element) {
            var self = $(this);
            $(element).droppable({
                activeClass: 'add',
                tolerance: 'pointer',
                hoverClass: "ui-state-active",
                drop: function(event, ui) {
                    var params = {
                        modify_flag: self.attr('rel'),
                        us : self.parents('.user-story').attr('us'),
                        milestone: $(ui.draggable).attr('ml')
                    }
                    var mod_url = $(ui.draggable).attr('url');
                    $.ajax({
                        url:mod_url,
                        data:params,
                        type: 'POST',
                        dataType:'json',
                        success: function(data){
                            if (data.valid) {
                                self.append($(ui.draggable).clone());
                                $(ui.draggable).remove();
                                ui.draggable.draggable('option','revert', false);
                                update_progress();
                            }
                        },
                        error: function() {
                            ui.draggable.draggable('option','revert', true);
                        }
                    });
                }
            });
        });
    };

    $(".user-story .user-story-task .participants").live('change', function(e) {
        var self = $(this);
        $.get(self.attr('url'), {userid: self.val()}, function(data) {
        }, 'json');
    });

    /* Set progress bar */
    $('#progress-bar').progressbar();
}