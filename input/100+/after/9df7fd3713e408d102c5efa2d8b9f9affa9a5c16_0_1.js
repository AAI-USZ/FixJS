function () {

        var web_root = oSL.getMeta('web_root');

        if (oSL.Regform && oSL.Regform.hasDialog()) {

            oSL.Regform.getInstance().show();

        } else {

            /**

             * &ajaxid=1&tplflag=1

             */

            /*if (oSL.modal) {

             oSL.modal.show();

             }*/

            $CONN.asyncRequest("GET", web_root + "/getregform", oSL.oCallback);

        }



    }