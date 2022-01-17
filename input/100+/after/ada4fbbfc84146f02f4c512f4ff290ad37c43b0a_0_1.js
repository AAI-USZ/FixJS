function draw_position_on_range(display_id, thisVal, minVal, maxVal, avgVal, stdVal) {
    var topgutter  = 12,
        leftgutter = 40
        barHeight  = 35,
        barWidth   = 350,
        rWidth     = leftgutter + barWidth + 10,
        rHeight    = topgutter + barHeight + 15,
        color = "hsb(" + [.6, .5, 1] + ")",
        txt1 = {font: '10px Helvetica, Arial', fill: "#fff"},
        txt2 = {font: '10px Helvetica, Arial', fill: "#000"},
        r    = Raphael(display_id, rWidth, rHeight);

    var sigma   = '\u03C3',
        txtY    = barHeight + topgutter + 10,
        avgX    = Math.round(barWidth * (avgVal / maxVal)),
        stdX    = Math.round(barWidth * (stdVal / maxVal)),
        thisX   = Math.round(barWidth * (thisVal / maxVal)),
        thisTxt = thisVal.toFixed(2),
        minTxt  = minVal.toFixed(2),
        avgTxt  = avgVal.toFixed(2),
        maxTxt  = maxVal.toFixed(2);

    if (minVal == 0) {
	minTxt = '0';
    }
    // min to 2-sigma-low
    var sigma2low = Math.round(avgX - (2 * stdX))
    if (sigma2low > 0) {
	r.rect(leftgutter, topgutter, sigma2low, barHeight).attr({stroke: color, 'stroke-width': 1, 'fill-opacity': .2, fill: color});
    } else {
	sigma2low = 0;
    }
    // 2-sigma-high to max
    var sigma2high = Math.round(avgX + (2 * stdX))
    if (sigma2high < barWidth) {
	r.rect(leftgutter+sigma2high, topgutter, (barWidth-sigma2high), barHeight).attr({stroke: color, 'stroke-width': 1, 'fill-opacity': .2, fill: color});
    } else {
	sigma2high = barWidth;
    }
    // 2-sigma-low to 1-sigma-low
    var sigma1low = Math.round(avgX - stdX)
    if (sigma1low > 0) {
	r.rect(leftgutter+sigma2low, topgutter, (sigma1low-sigma2low), barHeight).attr({stroke: color, 'stroke-width': 1, 'fill-opacity': .45, fill: color});
    } else {
	sigma1low = 0;
    }
    // 1-sigma-high to 2-sigma-high
    var sigma1high = Math.round(avgX + stdX)
    if (sigma1high < barWidth) {
	r.rect(leftgutter+sigma1high, topgutter, (sigma2high-sigma1high), barHeight).attr({stroke: color, 'stroke-width': 1, 'fill-opacity': .45, fill: color});
    } else {
	sigma1high = barWidth;
    }
    // 1-sigma-low to 1-sigma-high
    r.rect(leftgutter+sigma1low, topgutter, (sigma1high-sigma1low), barHeight).attr({stroke: color, 'stroke-width': 1, 'fill-opacity': .7, fill: color});
    // min max text
    r.text(leftgutter + Math.round(2.2 * minTxt.length), txtY, minTxt).attr(txt2);
    r.text(rWidth - Math.round(2.2 * maxTxt.length) - 7, txtY, maxTxt).attr(txt2);
    // sigma text
    if (sigma2low > 0) { r.text(leftgutter + sigma2low, 5, '2'+sigma).attr(txt2); }
    if (sigma1low > 0) { r.text(leftgutter + sigma1low, 5, sigma).attr(txt2); }
    if (sigma1high < barWidth) { r.text(leftgutter + sigma1high, 5, sigma).attr(txt2); }
    if (sigma2high < barWidth) { r.text(leftgutter + sigma2high, 5, '2'+sigma).attr(txt2); }
    // mean
    r.text(leftgutter + avgX, 5, '\u03BC').attr(txt2);
    r.text(leftgutter + avgX, txtY, avgTxt).attr(txt2);
    r.path('M'+(leftgutter+avgX).toString()+' '+topgutter.toString()+'V'+(txtY-10).toString()).attr({stroke:color, "stroke-width":2, "stroke-dasharray":"-"});
    // you
    //r.text(leftgutter + thisX, txtY, thisTxt).attr(txt2);
    r.circle(leftgutter+thisX, 5, 3).attr({'fill-opacity': .8, fill: 'red', stroke:'red'});
    r.path('M'+(leftgutter+thisX).toString()+' '+topgutter.toString()+'V'+(txtY-10).toString()).attr({stroke:'red', "stroke-width":2});
}