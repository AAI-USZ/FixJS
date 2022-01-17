function redraw() {

                        locate();

                        // Internet Explorer requires the try catch as hidden

                        // elements throw errors

                        try {

                                var sW  = outerWrapper.offsetWidth,

                                    sH  = outerWrapper.offsetHeight,

                                    hW  = handle.offsetWidth,

                                    hH  = handle.offsetHeight,

                                    bH  = bar.offsetHeight,

                                    bW  = bar.offsetWidth, 

                                    mPx = vertical ? sH - hH : sW - hW;                                

                                   

                                stepPx = mPx / steps;                                

                                rMinPx = Math.max(scale ? percentToPixels(valueToPercent(rMin)) : Math.abs((rMin - min) / step) * stepPx, 0);    

                                rMaxPx = Math.min(scale ? percentToPixels(valueToPercent(rMax)) : Math.abs((rMax - min) / step) * stepPx, Math.floor(vertical ? sH - hH : sW - hW));    

                                

                                sliderW = sW;

                                sliderH = sH;                                

                                

                                // Use the input value

                                valueToPixels(forceValue ? getWorkingValueFromInput() : (tagName == "select" ? inp.selectedIndex : parseFloat(inp.value)), false);

                                

                        } catch(err) {};

                        callback("redraw");

                }