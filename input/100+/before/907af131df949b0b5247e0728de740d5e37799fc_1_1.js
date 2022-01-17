function convertToHistogramData(data) {
      var histogramData = [];
      var prevName = "";
      var prevRes = -1;
      var parser = new Parser();
      var maxHeight = 1;
      for (var i = 0; i < data.length; ++i) {
        var value = data[i].frames.length;
        if (maxHeight < value)
          maxHeight = value;
      }
      var skipCount = Math.round(data.length / 2000.0);
      for (var i = 0; i < data.length; i=i+1+skipCount) {
        var step = data[i];
        var name = step.frames;
        var res = step.extraInfo["responsiveness"];
        var value = step.frames.length;
        var color = (res != null ? Math.min(255, Math.round(255.0 * res / 1000.0)):"0") +",0,0";
        var isSelected = true;
        if (step.frames.length >= highlightSample.length && highlightSample.length > 1) {
          for (var j = 0; j < highlightSample.length; j++) {
            if (highlightSample[j] != step.frames[j]) {
              isSelected = false;    
            }
          }
        } else {
          isSelected = false;
        }
        if (isSelected) {
          color = "0,128,0";
        }
        if ("marker" in step.extraInfo) {
          // a new marker boundary has been discovered
          var item = {
            name: "marker",
            width: 2,
            value: maxHeight + 1,
            marker: step.extraInfo.marker
          };
          histogramData.push(item);
          var item = {
            name: name,
            width: 1,
            value: value,
            color: "rgb(" + color + ")",
          };
          histogramData.push(item);
        } else if (name != prevName || res != prevRes) {
          // a new name boundary has been discovered
          var item = {
            name: name,
            width: 1,
            value: value,
            color: "rgb(" + color + ")",
          };
          histogramData.push(item);
        } else {
          // the continuation of the previous data
          histogramData[histogramData.length - 1].width++;
        }
        prevName = name;
        prevRes = res;
      }
      return histogramData;
    }