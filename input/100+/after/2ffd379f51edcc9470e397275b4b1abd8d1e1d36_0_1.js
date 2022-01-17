function prepareBuffer(buffer, position, isRTL) {
                var j;
                if (isRTL) {
                    while (position < 0 && buffer.length < getMaskLength()) {
                        j = _buffer.length - 1;
                        position = _buffer.length;
                        while (_buffer[j] !== undefined) {
                            buffer.unshift(_buffer[j--]);
                        }
                    }
                } else {
                    while (buffer[position] == undefined && buffer.length < getMaskLength()) {
                        j = 0;
                        while (_buffer[j] !== undefined) { //add a new buffer
                            buffer.push(_buffer[j++]);
                        }
                    }
                }

                return position;
            }