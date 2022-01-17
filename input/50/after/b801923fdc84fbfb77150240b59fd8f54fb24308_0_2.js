function (touch) {
                var touchRecord = new Object();
                for (var p in touch)
                    touchRecord[p] = touch[p];
                return touchRecord;
            }