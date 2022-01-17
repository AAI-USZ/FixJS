function addBlocks(div, data, cellWidth, start) {
            var rows = jQuery("div.timeline-blocks div.timeline-block-container", div);
            var rowIdx = 0;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].series.length; j++) {
                    var series = data[i].series[j];
                    var size = (series.end - series.start +1);
					var offset = series.start - start;
                    var block = jQuery("<div>", {
                        "class": "timeline-block",
                        "title": series.title ? series.title : series.name + ", " + size + " seconds",
                        "css": {
                            "width": ((size * cellWidth) - 9) + "px",
                            "left": ((offset * cellWidth) + 3) + "px"
                        },
                        "start": offset,
                        "duration": size
                    });
                    addBlockData(block, data[i], series);

                    block.append(jQuery("<div>", { "class": "timeline-block-text" }).text(size));
                    jQuery(rows[rowIdx]).append(block);
                }

                rowIdx = rowIdx + 1;
            }
        }