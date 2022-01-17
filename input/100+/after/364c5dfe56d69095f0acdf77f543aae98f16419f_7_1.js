function finishResize() {

            sizeCanvas(me.overlay_canvas, width, height);



            // restore highlight state if it was highlighted before

            if (opts.highlight && highlightId >= 0) {

                var areaData = me.data[highlightId];

                areaData.tempOptions = { fade: false };

                me.getDataForKey(areaData.key).highlight();

                areaData.tempOptions = null;

            }

            sizeCanvas(me.base_canvas, width, height);

            me.redrawSelections();

            cleanupAndNotify();



        }