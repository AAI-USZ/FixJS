function () {

            var i, aBtns;

            $L('105 this is: ' + this, 'warn');

            if (oDialog) {

                aBtns = oDialog.getButtons();

                for (i = 0; i < aBtns.length; i += 1) {

                    aBtns[i].set('disabled', false);

                }



            }

        }