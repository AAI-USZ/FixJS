function(hist) {
            var maxBin = 0;
            for (var bin = 0; bin < track.numBins; bin++) {
                if (typeof hist[bin] == 'number' && isFinite(hist[bin])) {
                    maxBin = Math.max(maxBin, hist[bin]);
                }
            }
            var binDiv;
            for (var bin = 0; bin < track.numBins; bin++) {
                if (!(typeof hist[bin] == 'number' && isFinite(hist[bin])))
                    continue;
                binDiv = document.createElement("div");
	        binDiv.className = track.config.style.className + "-hist";;
                binDiv.style.cssText =
                    "left: " + ((bin / track.numBins) * 100) + "%; "
                    + "height: "
                    + (dims.pxPerCount * ( dims.logScale ? Math.log(hist[bin]) : hist[bin]))
                    + "px;"
                    + "bottom: " + track.trackPadding + "px;"
                    + "width: " + (((1 / track.numBins) * 100) - (100 / stripeWidth)) + "%;"
                    + (track.config.style.histCss ?
                       track.config.style.histCss : "");
                if (Util.is_ie6) binDiv.appendChild(document.createComment());
                block.appendChild(binDiv);
            }

            track.heightUpdate( dims.pxPerCount * ( dims.logScale ? Math.log(maxBin) : maxBin ),
                                blockIndex );
            track.makeHistogramYScale( Math.abs(rightBase-leftBase) );
        }