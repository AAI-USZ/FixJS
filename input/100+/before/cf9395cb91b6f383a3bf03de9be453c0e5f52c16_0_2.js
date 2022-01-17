function update_canvas() {
     netctx.clearRect(0, 0, cWidth - nxoffset, cHeight);
     sysctx.clearRect(0, 0, cWidth - nxoffset, cHeight);
     drawAxes(netctx);
     drawAxes(sysctx);
     scale_factor = getScaleFactor();

     if (HddFirst == 1) {
          drawHDD(sysctx);
          drawMem(sysctx);
     } else {
          drawMem(sysctx);
          drawHDD(sysctx);
     }
     
     // load average data
     loadSF = getLoadSF();
     sysctx.beginPath();
     sysctx.strokeStyle = "rgb(255,0,0)";
     startY = eHeight - (LoadData[0] / loadSF) + yoffset + 1;
     sysctx.moveTo(cOriginX + 1, startY);
     for (i=0; i<DownData.length; i++) {
         ld_y = eHeight - (LoadData[i] / loadSF) + yoffset;
         sysctx.lineTo(cOriginX + i*2 + 1, ld_y);
     }
     sysctx.stroke();
     sysctx.closePath();

     // uprate data
     netctx.beginPath();
     netctx.strokeStyle = "rgb(255,0,0)";
     startY = eHeight - (UpData[0] / scale_factor) + yoffset + 1;
     netctx.moveTo(cOriginX + 1, startY);
     for (i=0;i<UpData.length;i++) {
          up_y = eHeight - (UpData[i] / scale_factor) + yoffset;
          netctx.lineTo(cOriginX + i*2 + 1, up_y);
          // x position = i*2
          // y position = re-scaled
          
          //netctx.moveTo(i*2,)
     }
     netctx.stroke();
     netctx.closePath();
     
     // downrate data
     netctx.beginPath();
     netctx.strokeStyle = "rgb(0,0,255)";
     startY = eHeight - (DownData[0] / scale_factor) + yoffset + 1;
     netctx.moveTo(cOriginX + 1, startY);
     for (i=0; i<DownData.length; i++) {
          dn_y = eHeight - (DownData[i] / scale_factor) + yoffset;
          netctx.lineTo(cOriginX + i*2 + 1, dn_y);
     }
     netctx.stroke();
     netctx.closePath();
}