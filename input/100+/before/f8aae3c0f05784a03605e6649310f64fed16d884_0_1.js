function prepareBuffer(buffer, position, isRTL) {
                var j = 0;
                if (isRTL) {
                    while (position < 0 && buffer.length < getMaskLength()) {
                        j = _buffer.length - 1;
                        position = _buffer.length;
                        while (_buffer[j] !== undefined) {
                            buffer.unshift(_buffer[j--]);
                        }
                    }
                } else {
                    while (buffer.length < position && buffer.length < getMaskLength()) {
                        while (_buffer[j] !== undefined) {
                            buffer.push(_buffer[j++]);
                        }
                    }
                }

                return position;
            }