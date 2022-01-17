function() {

                $('<div title="' + gettext('Confirm resetting repository') + '"><p>' + gettext('Resetting the repository will throw away all local changes!') + '</p></div>').dialog({
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