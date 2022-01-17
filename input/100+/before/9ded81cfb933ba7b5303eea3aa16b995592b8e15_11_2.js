function(data) {
            if (typeof data.resourceSets[0] === 'undefined') {
                if (typeof element.onerror === 'function') {
                    element.onerror();
                }
                return;
            }

            var resource = data.resourceSets[0].resources[0];
            if (resource.vintageStart && resource.vintageEnd) {
                validZoom = true;
                if (loaded && typeof element.onload === 'function') {
                    element.onload();
                }
            } else if (typeof element.oninvalid === 'function') {
                element.oninvalid();
            }

            zoomResponse = true;
        }