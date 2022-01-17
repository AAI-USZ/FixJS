function (dx, dy) {
                var nx = this.ox + dx;
                if(nx < 0) nx = 0;
                if(nx > width-sliderWidth) nx = width-sliderWidth;

                thisTR.currentLeft = Math.round(-(nx/width)*terrainWidth);
                thisTR.terrainDiv.style.left =  thisTR.currentLeft + 'px';

                var ndx = nx - this.attr("x");
                this.attr({x: nx});
                rightArrow.translate(ndx,0);
                leftArrow.translate(ndx,0);
            }