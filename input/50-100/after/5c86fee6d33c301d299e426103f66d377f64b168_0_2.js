function () {

            var xhr;

            try {

                xhr = new global.XMLHttpRequest();

            } catch (ignore) {

                xhr = create_microsoft_xhr();

            }

            return xhr;

        }