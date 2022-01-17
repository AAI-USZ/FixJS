function(event) {
                        if($(this).data('key') == null
                                        && !that.requestsToolbox_over_playing) {
                                $('#requestsToolbox > .up').hide();
                                $('#requestsToolbox > .down').hide();
                                $('#requestsToolbox > .del').hide();
                                $('#requestsToolbox > .skip').show();
                                that.requestsToolbox_over_playing = true;
                        } else if ($(this).data('key') != null  &&
                                        that.requestsToolbox_over_playing) {
                                $('#requestsToolbox > .up').show();
                                $('#requestsToolbox > .down').show();
                                $('#requestsToolbox > .del').show();
                                $('#requestsToolbox > .skip').hide();
                                that.requestsToolbox_over_playing = false;
                        }
                        if(!that.showing_requestsToolbox) {
                                that.showing_requestsToolbox = true;
                                $('#requestsToolbox').show();
                        }
                        $('#requestsToolbox').css({
                                'top': $(this).position().top
                                        + .5 * ($(this).height()
                                        - 2*$('#requestsToolbox').height()
                                        + $('#requestsToolbox > .up').height()),
                                'left': $(this).position().left
                                        + $(this).width()
                                        - $('#requestsToolbox').width()
                        }, 'fast');
                        console.log($(this).position().left + $(this).width());
                        that.requestsToolbox_key = $(this).data('key');
                }