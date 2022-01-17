function (selector) {

        var dialog = _settingsDialogSelector.dialog({

            autoOpen: false,

            buttons: [

                {

                    text: "Ok",

                    click: function () {

                        _save();

                        $(this).dialog("close");

                    }

                },

                {

                    text: "Cancel",

                    click: function () { $(this).dialog("close"); }

                }],

            open: function (event, ui) {

                _exploreCheckBox.prop('checked', Player.getExploreEnabled());

            },

        });



        return dialog;

    }