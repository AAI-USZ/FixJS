function (dx, dy) {
                var nx = this.ox + dx;
                if(nx < 0) nx = 0;
                if(nx > width-sliderWidth) nx = width-sliderWidth;

                this_.currentLeft = Math.round(-(nx/width)*terrainWidth);
                this_.terrainDiv.style.left =  this_.currentLeft + 'px';

                var ndx = nx - this.attr("x");
                this.attr({x: nx});
                rightArrow.translate(ndx,0);
                leftArrow.translate(ndx,0);
            }