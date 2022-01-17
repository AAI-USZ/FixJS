function (k, v) {
                if( k !== 'prototype') //fix ff 3.5.9-
                    newClass[ k ] = v;
            }