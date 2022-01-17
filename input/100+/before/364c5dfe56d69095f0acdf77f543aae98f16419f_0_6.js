function (options) {

            return (new m.Method(this,

                function () {

                    merge_options(this, options);

                },

                null,

                {

                    name: 'set_options',

                    args: arguments

                }

            )).go();

        }