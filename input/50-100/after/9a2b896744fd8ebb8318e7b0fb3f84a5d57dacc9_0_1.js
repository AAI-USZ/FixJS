function(event, ui) { 
            equal( ui.size.width, 100, "compare width" );
            equal( ui.size.height, 100, "compare height" );
            equal( ui.originalSize.width, 100, "compare original width" );
            equal( ui.originalSize.height, 100, "compare original height" );
            count++;
        }