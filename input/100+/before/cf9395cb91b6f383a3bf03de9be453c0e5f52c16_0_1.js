function drawMem(sysctx) {
     // mem data
     memSF = getMemSF();
     sysctx.beginPath();
     sysctx.strokeStyle = "rgb(0,0,255)";
     sysctx.fillStyle = "rgba(0,0,255,0.5)";
     startY = eHeight - (MemData[0] / memSF) + yoffset + 1;
     sysctx.moveTo(cOriginX + 1, startY);
     for (i=0; i<MemData.length; i++) {
        mm_y = eHeight - (MemData[i] / memSF) + yoffset;
        sysctx.lineTo(cOriginX + i*2 + 1, mm_y);
     }
     sysctx.lineTo(cOriginX + i*2 + 1, eHeight - 1 + yoffset);
     sysctx.lineTo(cOriginX + 1, eHeight - 1 + yoffset);
     sysctx.lineTo(cOriginX + 1, startY);
     sysctx.closePath();
     sysctx.fill();
}