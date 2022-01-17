function(sourceCanvas){
            var canvas, styles, world, worldData;

            canvas = document.application.njUtils.make("canvas", sourceCanvas.className, this.application.ninja.currentDocument);
            canvas.width = sourceCanvas.width;
            canvas.height = sourceCanvas.height;
            //end - clone copied canvas

            //genenerate data-RDGE-id only for shapes
            if (sourceCanvas.elementModel.shapeModel && !canvas.getAttribute( "data-RDGE-id" )) canvas.setAttribute( "data-RDGE-id", document.application.njUtils.generateRandom() );

            if(sourceCanvas.ownerDocument.defaultView.getComputedStyle(sourceCanvas).getPropertyValue("position") === "absolute"){
                styles = canvas.elementModel.data || {};
                styles.top = "" + (this.application.ninja.elementMediator.getProperty(sourceCanvas, "top", parseInt) + (25 * this.pasteCounter))+"px";
                styles.left = "" + (this.application.ninja.elementMediator.getProperty(sourceCanvas, "left", parseInt) + (25 * this.pasteCounter)) + "px";
            }else{
                styles = null;
            }

            var addDelegate = this.application.ninja.elementMediator.addDelegate;
            this.application.ninja.elementMediator.addDelegate = null;
            this.application.ninja.elementMediator.addElements(canvas, styles, false);
            this.application.ninja.elementMediator.addDelegate = addDelegate;

            worldData = sourceCanvas.elementModel.shapeModel ? sourceCanvas.elementModel.shapeModel.GLWorld.exportJSON(): null;
            if(worldData)
            {
                var jObj;
                var index = worldData.indexOf( ';' );
                if ((worldData[0] === 'v') && (index < 24))
                {
                    // JSON format.  separate the version info from the JSON info
                    var jStr = worldData.substr( index+1 );
                    jObj = JSON.parse( jStr );

                    world = new World(canvas, jObj.webGL);
                    canvas.elementModel.shapeModel.GLWorld = world;
                    canvas.elementModel.shapeModel.useWebGl = jObj.webGL;
                    world.importJSON(jObj);
                    this.application.ninja.currentDocument.model.webGlHelper.buildShapeModel( canvas.elementModel, world );
                }
            }

            return canvas;
        }