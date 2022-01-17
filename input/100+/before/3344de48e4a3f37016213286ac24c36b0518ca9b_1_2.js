function () {
    var chatdata = jQuery('span#babble-client-chatdata'),
        $toggle = $('a#toggle-online-users');

    xmppchat.username = chatdata.attr('username');
    xmppchat.base_url = chatdata.attr('base_url');

    xmppchat.UI.createStatusSelectWidget();

    $toggle.unbind('click');
    $toggle.bind('click', function (e) {
        e.preventDefault();
        if ($("div#online-users-container").is(':visible')) {
            xmppchat.UI.closeChat('online-users-container');
        } else {
            xmppchat.UI.getChatbox('online-users-container');
        }
    });

    $(document).unbind('jarnxmpp.message');
    $(document).bind('jarnxmpp.message',  function (event) {
        xmppchat.UI.addMessageToChatbox(event);
    });

    $(document).bind('xmppchat.send_presence', function (event, jid, type) {
        xmppchat.connection.send($pres({'type':type}));
    });

    $(document).unbind('jarnxmpp.presence');
    $(document).bind('jarnxmpp.presence', function (event, jid, status, presence) {
        xmppchat.UI.updateOnPresence(jid, status, presence);
    });

    $('textarea.chat-textarea').live('keypress', function (ev) {
        xmppchat.UI.keyPressed(ev, this);
    });

    $('a.close-controlbox-button').live('click', function (ev) {
        xmppchat.UI.closeChat('online-users-container');
    }); 

    $('ul.tabs').tabs('div.panes > div');

    $('#fancy-xmpp-status-select').click(function (ev) {
        ev.preventDefault();
        $(this).siblings('dd').find('ul').toggle('fast');
    });

    $('div.add-xmpp-contact').click(function (ev) {
        ev.preventDefault();
        $(this).parent().find('form.search-xmpp-contact').toggle().find('input.username').focus();
    });

    $('a.remove-xmpp-contact').live('click', function (ev) {
        var that = this;
        ev.preventDefault();
        $("<span></span>").dialog({
            title: 'Are you sure you want to remove this contact?',
            dialogClass: 'remove-xmpp-contact-dialog',
            resizable: false,
            width: 200,
            position: {
                my: 'center',
                at: 'center',
                of: '#online-users-container'
                },
            modal: true,
            buttons: {
                "Remove": function() {
                    $( this ).dialog( "close" );
                    var jid = $(that).parent().attr('data-recipient');
                    xmppchat.Roster.unsubscribe(jid);
                },
                "Cancel": function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    });

    $('form.search-xmpp-contact').submit(function (ev) {
        ev.preventDefault();
        $.getJSON(portal_url + "/search-users?q=" + $(this).find('input.username').val(), function (data) {
            var $results_el = $('#found-users');
            $(data).each(function (idx, obj) {
                if ($results_el.children().length > 0) {  
                    $results_el.empty();
                }
                $results_el.append(
                        $('<li></li>')
                            .attr('id', 'found-users-'+obj.id)
                            .append(
                                $('<a class="subscribe-to-user" href="#" title="Click to add as a chat contact"></a>')
                                    .attr('data-recipient', obj.id+'@'+xmppchat.connection.domain)
                                    .text(obj.fullname)
                            )
                    );
            });
        });
    });

    $("a.subscribe-to-user").live('click', function (ev) {
        ev.preventDefault();
        xmppchat.Roster.subscribe($(this).attr('data-recipient'));
        $(this).remove();
        $('form.search-xmpp-contact').hide();
    });

    $(".dropdown dd ul li a").click(function(ev) {
        ev.preventDefault();
        xmppchat.UI.setOwnStatus(this);
    });

    $('select#select-xmpp-status').bind('change', function (ev) {
        var jid = xmppchat.connection.jid,
            value = ev.target.value;
        xmppchat.Presence.sendPresence(value);
        xmppchat.Storage.set(xmppchat.username+'-xmpp-status', value);
    });
}