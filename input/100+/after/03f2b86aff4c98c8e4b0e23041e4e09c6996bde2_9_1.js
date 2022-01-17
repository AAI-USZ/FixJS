function (selector) {

        var dialog = _settingsDialogSelector.dialog({

            autoOpen: false,

            buttons: [

                {

                    text: "Ok",

                    click: function () {

                        save();

                        $(this).dialog("close");

                    }

                },

                {

                    text: "Cancel",

                    click: function () { $(this).dialog("close"); }

                }],

            open: function (event, ui) {

                exploreCheckBox.prop('checked', Player.getExploreEnabled());

            },

        });



        return dialog;

    }