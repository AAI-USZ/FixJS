function() {
        canvas.getContext("2d").scale(scale, scale);

        document.getElementById('zoomin').onclick = function() {
            scale = scale*2;
            canvas.getContext("2d").scale(2, 2);
            drawMap();
        };

        document.getElementById('zoomout').onclick = function() {
            scale = scale/2;
            canvas.getContext("2d").scale(0.5, 0.5);
            drawMap();
        };

        drawMap(scale);

        canvas.onmousemove = function(ev) {
            if (findDecision(ev)) {
                canvas.style.cursor = 'pointer';
                previewDecision(findDecision(ev));
            }
            else {
                preview.style.display = 'none';
                if (overResponse(ev))
                    canvas.style.cursor = 'pointer';
                else
                    canvas.style.cursor = 'default';
            }
        };

        canvas.onclick = function(ev) {
            var dec = findDecision(ev);
            if (dec) {
                detailPanels.setDecision(dec);
                detailPanels.show('decision');
            } else if (overResponse(ev)) {
                detailPanels.show('response');
            }
        };
    }