function() {

                $('<div title="' + gettext('Confirm reseting repository') + '"><p>' + gettext('Reseting the repository will throw away all local changes!') + '</p></div>').dialog({
                    modal: true,
                    autoOpen: true,
                    buttons: [
                        {
                            text: gettext("Ok"),
                            click: function() {
                                window.location = $('.confirm-reset').attr('href');
                                $(this).dialog("close");
                            },
                        },
                        {
                            text: gettext("Cancel"),
                            click: function() {
                                $(this).dialog("close");
                            }
                        }
                    ]
                });
                return false;
            }