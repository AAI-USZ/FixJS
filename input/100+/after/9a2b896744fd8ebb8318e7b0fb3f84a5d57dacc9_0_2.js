function(event, ui) { 
            if (count === 0) {
                equal( ui.size.width, 101, "compare width" );
                equal( ui.size.height, 101, "compare height" );
                equal( ui.originalSize.width, 100, "compare original width" );
                equal( ui.originalSize.height, 100, "compare original height" );
            }
            else {
                equal( ui.size.width, 150, "compare width" );
                equal( ui.size.height, 150, "compare height" );
                equal( ui.originalSize.width, 100, "compare original width" );
                equal( ui.originalSize.height, 100, "compare original height" );
            }
            count++;
        }