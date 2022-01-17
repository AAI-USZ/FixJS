function(stop) {
            if ( arc >= stop.from && !stopFound ) {
                slice.set('fill', { 'color' : stop.progress });
                outline.set('fill', { 'color' : stop.background });
                outline.set('stroke', { weight: 1, color: stop.outline });
                stopFound = true;
                return;
            }
        }