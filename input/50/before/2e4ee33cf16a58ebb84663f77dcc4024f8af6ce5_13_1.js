function(array) {
                var a = new osg[type](array);
                buffer.setElements(a);

                ok(buffer.getElements()[2] === 10, "readBufferArray with new array typed external file");
                start();
            }