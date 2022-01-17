function () {

            console.log('i came');

            if (!isError) {

                setTimeout(function () {

                    $(this).fadeOut('slow')

                    console.log('i went');

                }, 10000);

            }

        }