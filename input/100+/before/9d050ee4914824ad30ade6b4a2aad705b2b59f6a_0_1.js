function showPopUp(options, element) {

        element.css('display', 'block');

        element.css('width', options.width);

        element.css('heigth', options.height);

        if (options.left != undefined) {

            element.css('right', options.right);

        } else {

            element.css('left', options.left);

        }



        if (options.bottom != undefined) {

            element.css('bottom', options.bottom);

        } else {

            element.css('top', options.top);

        }



    }