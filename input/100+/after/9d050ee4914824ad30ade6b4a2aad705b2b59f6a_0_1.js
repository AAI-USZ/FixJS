function showPopUp(options, element) {

        element.css('display', 'block');

        element.css('width', options.width);

        element.css('heigth', options.height);

        

        var triangle = element.find('div.triangle');

        

        if(options.displacement != 'right') {

            

            triangle.css('left', 15); 

        } else {

            triangle.css('right', 15); 

        }



        if (options.right != undefined) {

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