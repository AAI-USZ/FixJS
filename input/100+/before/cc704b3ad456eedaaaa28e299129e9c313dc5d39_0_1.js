function(selectedObj) {
		    if (selectedObj !== undefined) {
		        var currObj = selectedObj;
		        
		        console.log(selectedObj);
		        var pos = selectedObj.getRefStagePos();
		        
		        // Save the last object pos
                lastStageX = pos.x;
                lastStageY = pos.y;
		        
		        
		        var scale = selectedObj.getParentScale();
    		    this.objectModifier.css("left", pos.x - selectedObj.getWidth() * selectedObj.getRefX() * scale.scaleX * selectedObj.getScaleX());
                this.objectModifier.css("top", pos.y - selectedObj.getHeight() * selectedObj.getRefY() * scale.scaleY * selectedObj.getScaleY());
                this.objectModifier.css("width", selectedObj.getWidth() * pos.scaleX);
                this.objectModifier.css("height", selectedObj.getHeight() * pos.scaleY);
                
                
                var omRotation = pos.rotation % 360;
                var omScaleX = pos.scaleX;
                var omScaleY = pos.scaleY;
                // Set the correct resize icons
                if (omRotation == null || (omRotation < 45 || omRotation > 315) ) {
                    $("#omTopLeft").css("cursor", "nw-resize");
                    $("#omTopRight").css("cursor", "ne-resize");
                    $("#omBottomLeft").css("cursor", "sw-resize");
                    $("#omBottomRight").css("cursor", "se-resize");
                } else if (omRotation != null && (omRotation < 135 && omRotation > 45) ) {
                    $("#omTopLeft").css("cursor", "ne-resize");
                    $("#omTopRight").css("cursor", "se-resize");
                    $("#omBottomLeft").css("cursor", "nw-resize");
                    $("#omBottomRight").css("cursor", "sw-resize");
                } else if (omRotation != null && (omRotation < 225 && omRotation > 135) ) {
                    $("#omTopLeft").css("cursor", "se-resize");
                    $("#omTopRight").css("cursor", "sw-resize");
                    $("#omBottomLeft").css("cursor", "ne-resize");
                    $("#omBottomRight").css("cursor", "nw-resize");
                } else if (omRotation != null && (omRotation < 315 && omRotation > 225) ) {
                    $("#omTopLeft").css("cursor", "sw-resize");
                    $("#omTopRight").css("cursor", "nw-resize");
                    $("#omBottomLeft").css("cursor", "se-resize");
                    $("#omBottomRight").css("cursor", "ne-resize");
                }
                // Set the correct Rotation icons
                if (omRotation == null || (omRotation < 45 || omRotation > 315)) {
                    $("#orTopLeft").css("cursor", "URL('widgets/Input/rotateTL.gif') 10 10, default");
                    $("#orTopRight").css("cursor", "URL('widgets/Input/rotateTR.gif') 10 10, default");
                    $("#orBottomLeft").css("cursor", "URL('widgets/Input/rotateBL.gif') 10 10, default");
                    $("#orBottomRight").css("cursor", "URL('widgets/Input/rotateBR.gif') 10 10, default");
                } else if (omRotation != null && (omRotation < 135 && omRotation > 45)) {
                    $("#orTopLeft").css("cursor", "URL('widgets/Input/rotateTR.gif') 10 10, default");
                    $("#orTopRight").css("cursor", "URL('widgets/Input/rotateBR.gif') 10 10, default");
                    $("#orBottomLeft").css("cursor", "URL('widgets/Input/rotateTL.gif') 10 10, default");
                    $("#orBottomRight").css("cursor", "URL('widgets/Input/rotateBL.gif') 10 10, default");
                } else if (omRotation != null && (omRotation < 225 && omRotation > 135)) {
                    $("#orTopLeft").css("cursor", "URL('widgets/Input/rotateBR.gif') 10 10, default");
                    $("#orTopRight").css("cursor", "URL('widgets/Input/rotateBL.gif') 10 10, default");
                    $("#orBottomLeft").css("cursor", "URL('widgets/Input/rotateTR.gif') 10 10, default");
                    $("#orBottomRight").css("cursor", "URL('widgets/Input/rotateTL.gif') 10 10, default");
                } else if (omRotation != null && (omRotation < 315 && omRotation > 225)) {
                    $("#orTopLeft").css("cursor", "URL('widgets/Input/rotateBL.gif') 10 10, default");
                    $("#orTopRight").css("cursor", "URL('widgets/Input/rotateTL.gif') 10 10, default");
                    $("#orBottomLeft").css("cursor", "URL('widgets/Input/rotateBR.gif') 10 10, default");
                    $("#orBottomRight").css("cursor", "URL('widgets/Input/rotateTR.gif') 10 10, default");
                }
                
                if (selectedObj.getRefX() !== undefined && selectedObj.getRefY() !== undefined) {
                    this.objectRefX = selectedObj.getRefX();
                    this.objectRefY = selectedObj.getRefY();
                    
                } else {
                    this.objectRefX = 0.5;
                    this.objectRefY = 0.5;
                }
                
                this.omRefPoint.css("left", (this.objectRefX * 100)  + "%");
                this.omRefPoint.css("top", (this.objectRefY * 100)  + "%");
                this.objectModifier.css("-moz-transform-origin", "" + (this.objectRefX * 100) + "% " + (this.objectRefY * 100) + "%");
                this.objectModifier.css("-webkit-transform-origin", "" + (this.objectRefX * 100) + "% " + (this.objectRefY * 100) + "%");
                
                this.objectModifier.css("-moz-transform", "rotate(" + omRotation + "deg)");
                this.objectModifier.css("-webkit-transform", "rotate(" + omRotation + "deg)");
                
                this.objectModifier.show();
            } else {
                this.objectModifier.hide();
            }
		}