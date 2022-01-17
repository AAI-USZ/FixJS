function() {
        var $my_standup = $('#my-standup');

        $('#standup-body').on('change keydown keyup', function(e) {
            $('#preview').empty().append(ich.message({
                name: 'My Standup',
                body: converter.makeHtml($(this).val())
            }));
        }).change();

        $('#standup-form').on('submit', function(e) {
            var standup = $('#standup-body').val();

            $('#post-button').attr('disabled', 'disabled');

            yam.request({
                url: '/api/v1/messages.json',
                method: 'POST',
                data: {
                    body: standup,
                    topic1: 'Standup',
                    group_id: WEBPROD_GROUP
                },
                success: function(response) {
                    var msg = response.messages[0];
                    var sender = references[msg.sender_id];

                    $my_standup.fadeOut(500, function() {
                        $my_standup.empty().append(ich.message({
                            name: 'My Standup',
                            mugshot_href: sender.mugshot_url,
                            body: converter.makeHtml(msg.body.plain)
                        })).fadeIn(500);
                    });
                }
            });

            e.preventDefault();
        });
    }