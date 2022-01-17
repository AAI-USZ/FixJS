function(glCanvas) {
                if(animate) {
                    glCanvas.elementModel.shapeModel.GLWorld._previewAnimation = true;
                    glCanvas.elementModel.shapeModel.GLWorld.restartRenderLoop();
                } else if (!glCanvas.elementModel.shapeModel.animate ) {
                    glCanvas.elementModel.shapeModel.GLWorld._previewAnimation = false;
                    glCanvas.elementModel.shapeModel.GLWorld._canvas.task.stop();
                }
            }