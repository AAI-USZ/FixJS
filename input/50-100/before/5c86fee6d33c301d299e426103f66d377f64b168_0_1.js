function () {

            var xhr;

            try {

                xhr = new global.ActiveXObject("Msxml2.XMLHTTP");

            } catch (ignore) {

                try {

                    xhr = new global.ActiveXObject("Microsoft.XMLHTTP");

                } catch (ignored) {

                    throw new Error("pklib.ajax.load: cannot create XMLHttpRequest object");

                }

            }

            return xhr;

        }