function DrawClauseDistrib(_data, _divID, _simpPoints)
{
    var data = _data;
    var divID = _divID;
    var simpPoints = _simpPoints;
    var mywidth = 415;
    var myheight = 100;

    //For SVG pattern, a rectangle
    function drawDistribBox(x1, x2, y1, y2, relHeight, imgData)
    {
        var num = 255-relHeight*255.0;
        var type = "rgb(" + Math.floor(num) + "," + Math.floor(num) + "," + Math.floor(num) + ")";
        imgData.fillStyle = type;
        imgData.strokeStyle = type;
        imgData.fillRect(x1, y1, x2-x1, y2-y1);
    }

    function drawSimpLine(x1, x2, y1, y2, imgData)
    {
        imgData.strokeStyle = "rgba(105, 105, 185, 185)";
        imgData.fillStyle = "rgba(105, 105, 185, 185)";
        imgData.strokeRect(x1, y1, (x2-x1), (y2-y1));
    }

    function calcNumElemsVertical(from, to)
    {
        //Calculate highest point for this range
        var numElementsVertical = 0;
        for(var i = 0 ; i < data.length ; i ++ ){
            //out of range, ignore
            if (data[i].conflEnd < from) {
                continue;
            }
            if (data[i].conflStart > to) {
                break;
            }

            //Check which is the highest
            for(i2 = data[i].darkness.length-1; i2 >= 0 ; i2--) {
                if (data[i].darkness[i2] > 20) {
                    numElementsVertical = Math.max(numElementsVertical, i2);
                    break;
                }
            }
        }

        //alert(from + " " + to + " " + numElementsVertical + " " + i);
        return numElementsVertical;
    }

    this.drawPattern = function(from , to)
    {
        var myDiv = document.getElementById(divID);
        //myDiv.style.height = 100;
        //myDiv.style.width= 420;
        var ctx = myDiv.getContext("2d");
        var Xdelta = 0.5;

        var onePixelisConf = mywidth/(to-from);
        var numElementsVertical = calcNumElemsVertical(from, to);

        //Cut-off lines for Y
        var vAY = new Array();
        for(i = numElementsVertical; i >= 0; i--) {
            vAY.push(Math.round(i*(myheight/numElementsVertical)));
        }
        vAY.push(0);

        //Start drawing from X origin
        var lastXEnd = 0;
        var startFound = 0;
        for(var i = 0 ; i < data.length ; i ++) {
            if (startFound == 0 && data[i].conflEnd < from)
                continue;

            if (startFound == 1 && data[i].conflStart > to)
                continue;

            //Calculate maximum darkness
            maxDark = 0;
            for(i2 = 0; i2 < data[i].darkness.length; i2++) {
                maxDark = Math.max(maxDark, data[i].darkness[i2]);
            }

            var xStart = lastXEnd;

            var xEnd = data[i].conflEnd - from;
            xEnd *= onePixelisConf;
            xEnd += Xdelta;
            xEnd = Math.max(0, xEnd);
            xEnd = Math.min(xEnd, mywidth);
            xEnd = Math.round(xEnd);
            lastXEnd = xEnd;

            //Go through each Y component
            for(i2 = 0; i2 < data[i].darkness.length; i2++) {
                yStart = vAY[i2+1];
                yEnd   = vAY[i2];

                //How dark should it be?
                var darkness = 0;
                if (data[i].darkness[i2] != 0) {
                    darkness = data[i].darkness[i2]/maxDark;
                }

                //Draw the rectangle
                drawDistribBox(xStart, xEnd, yStart, yEnd, darkness, ctx);
            }
        }

        //Handle simplification lines
        for(var k = 0; k < simpPoints.length-1; k++) {
            var point = simpPoints[k] - from;
            point *= onePixelisConf;
            point += Xdelta;

            //Draw blue line
            if (point > 0) {
                drawSimpLine(point, point+1, 0, myheight, ctx);
            }
        }
    }
}