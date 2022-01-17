function() {
        var values = this.values = []; // Column-major
        values.length = numberOfElements;

        if (arguments.length === 0) {
            for ( var i = 0; i < numberOfElements; ++i) {
                values[i] = 0;
            }
        } else if (arguments.length === 1) {
            values[0] = arguments[0];
            values[1] = 0;
            values[2] = 0;
            values[3] = 0;

            values[4] = 0;
            values[5] = arguments[0];
            values[6] = 0;
            values[7] = 0;

            values[8] = 0;
            values[9] = 0;
            values[10] = arguments[0];
            values[11] = 0;

            values[12] = 0;
            values[13] = 0;
            values[14] = 0;
            values[15] = arguments[0];
        } else if (arguments.length < numberOfElements) {
            var rotation = arguments[0];
            var translation = arguments[1];

            values[0] = rotation[0];
            values[1] = rotation[1];
            values[2] = rotation[2];
            values[3] = 0;

            values[4] = rotation[3];
            values[5] = rotation[4];
            values[6] = rotation[5];
            values[7] = 0;

            values[8] = rotation[6];
            values[9] = rotation[7];
            values[10] = rotation[8];
            values[11] = 0;

            values[12] = translation.x;
            values[13] = translation.y;
            values[14] = translation.z;
            values[15] = 1;
        } else if (arguments.length >= numberOfElements) {
            values[0] = arguments[0];  // Column 0, Row 0
            values[1] = arguments[4];  // Column 0, Row 1
            values[2] = arguments[8];  // Column 0, Row 2
            values[3] = arguments[12]; // Column 0, Row 3

            values[4] = arguments[1];  // Column 1, Row 0
            values[5] = arguments[5];  // Column 1, Row 1
            values[6] = arguments[9];  // Column 1, Row 2
            values[7] = arguments[13]; // Column 1, Row 3

            values[8] = arguments[2];  // Column 2, Row 0
            values[9] = arguments[6];  // Column 2, Row 1
            values[10] = arguments[10];// Column 2, Row 2
            values[11] = arguments[14];// Column 2, Row 3

            values[12] = arguments[3]; // Column 3, Row 0
            values[13] = arguments[7]; // Column 3, Row 1
            values[14] = arguments[11];// Column 3, Row 2
            values[15] = arguments[15];// Column 3, Row 3
        }
    }