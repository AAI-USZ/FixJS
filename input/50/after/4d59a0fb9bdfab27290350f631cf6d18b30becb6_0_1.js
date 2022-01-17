function (item, index, orig) {
                var feature = komooMap.features.pop(); // The newly created feature should be the last at array.
                feature.removeFromMap();
            }