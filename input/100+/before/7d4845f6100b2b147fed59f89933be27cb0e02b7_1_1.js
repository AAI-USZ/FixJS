function drawOneGraph(i)
{
    graph = new Dygraph(
        document.getElementById(myData[i].dataDivID),
        myData[i].data
        , {
            stackedGraph: myData[i].stacked,
            includeZero: myData[i].stacked,
            labels: myData[i].labels,
            underlayCallback: function(canvas, area, g) {
                canvas.fillStyle = "rgba(105, 105, 185, 185)";
                //Draw simplification points
                colnum = myData[i].colnum;

                for(var k = 0; k < simplificationPoints[colnum].length-1; k++) {
                    var bottom_left = g.toDomCoords(simplificationPoints[colnum][k], -20);
                    var left = bottom_left[0];
                    canvas.fillRect(left, area.y, 2, area.h);
                }
            },
            axes: {
              x: {
                valueFormatter: function(d) {
                  return 'Conflicts: ' + d;
                },
                pixelsPerLabel: 100,
                includeZero: true
              }
            },
            //stepPlot: true,
            //strokePattern: [0.1, 0, 0, 0.5],
            strokeWidth: 0.3,
            highlightCircleSize: 3,
            //rollPeriod: 1,
            drawXAxis: false,
            legend: 'always',
            xlabel: false,
            labelsDiv: document.getElementById(myData[i].labelDivID),
            labelsSeparateLines: true,
            labelsKMB: true,
            drawPoints: false,
            pointSize: 1,
            drawXGrid: false,
            drawYGrid: false,
            drawYAxis: false,
            strokeStyle: "black",
            colors: ['#ffffff', '#05fa03', '#d03332', '#4e4ea8', '#689696'],
            fillAlpha: 0.8,
            errorBars: myData[i].noisy,
            drawCallback: function(me, initial) {

                //Fill original sizes, so if we zoom out, we know where to
                //zoom out
                if (initial)
                    origSizes[myData[i].colnum] = me.xAxisRange();

                //Initial draw, ignore
                if (blockRedraw || initial)
                    return;

                blockRedraw = true;
                var xrange = me.xAxisRange();

                //Is this full reset?
                fullreset = false;
                for (var j = 0; j < myData.length; j++) {
                    if (gs[j] == me) {
                        if (origSizes[myData[j].colnum][0] == xrange[0]
                            &&origSizes[myData[j].colnum][1] == xrange[1]
                        ) {
                            fullreset = true;
                        }
                    }
                }

                /*
                //Must zoom the clause distribution as well
                if (fullreset) {
                    drawPattern(clauseDistrib[0], 0, origSizes[0][0], origSizes[0][1]);
                    drawPattern(clauseDistrib[1], 1, origSizes[1][0], origSizes[1][1]);
                } else {
                    drawPattern(clauseDistrib[0], 0, xrange[0], xrange[1]);
                    drawPattern(clauseDistrib[1], 1, xrange[0], xrange[1]);
                }*/

                //Zoom every one the same way
                for (var j = 0; j < myData.length; j++) {
                    //Don't go into loop
                    if (gs[j] == me)
                        continue;

                    //If this is a full reset, then zoom out maximally
                    if (fullreset) {
                        gs[j].updateOptions( {
                            dateWindow: origSizes[myData[j].colnum]
                        } );
                    } else {
                        gs[j].updateOptions( {
                            dateWindow: xrange
                        } );
                    }
                }

                blockRedraw = false;
            }
        }
    )

    return graph;
}