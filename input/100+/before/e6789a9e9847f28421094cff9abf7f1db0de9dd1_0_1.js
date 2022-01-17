function update_canvas() {
     netctx.clearRect(0, 0, cWidth - nxoffset, cHeight);
     sysctx.clearRect(0, 0, cWidth - nxoffset, cHeight);
     drawAxes(netctx);
     drawAxes(sysctx);
     scale_factor = getScaleFactor();

     //if (HddFirst == 1) {
     //     //drawFilledDataLine(ctx, scaleF, data, strokeStyle, fillStyle)
     //     drawFilledDataLine(sysctx, getHDDSF(), HddData, "rgb(0,255,0)", "rgba(0,255,0,0.5)");
     //     drawFilledDataLine(sysctx, getMemSF(), MemData, "rgb(0,0,255)", "rgba(0,0,255,0.5)");
     //} else {
          drawFilledDataLine(sysctx, getMemSF(), MemData, "rgb(0,0,255)", "rgba(0,0,255,0.1)");
          drawFilledDataLine(sysctx, getHDDSF(), HddData, "rgb(0,255,0)", "rgba(0,255,0,0.1)");
     //}
     
     // load average data
     drawDataLine(sysctx, getLoadSF(), LoadData, "rgb(255,0,0)");

     // uprate data
     drawDataLine(netctx, scale_factor, UpData, "rgb(255,0,0)");
     
     // downrate data
     drawDataLine(netctx, scale_factor, DownData, "rgb(0,0,255)");
}