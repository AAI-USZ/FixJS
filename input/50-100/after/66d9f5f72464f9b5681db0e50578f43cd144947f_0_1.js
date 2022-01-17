function () {
            cachedDrawer.drawBuffer(webAudio.currentBuffer);

            waveDrawer.cursorStep=cachedDrawer.cursorStep;
            console.log(waveDrawer.cursorStep);
            waveDrawer.xx=-cachedDrawer.cursorStep;
            waveDrawer.drawContinuous(cachedDrawer.canvasArray);


        }