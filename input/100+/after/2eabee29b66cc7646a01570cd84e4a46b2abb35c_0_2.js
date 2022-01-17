function draw(imageData, y) {
        var cHalfWidth = cWidth/2;
        var ny = y - cHeight/2;

        scalarMultiply(crossProduct(turnOrthogonal(setTo(tempViewDirectionY, viewDirection)), viewDirection), ny*pixel);
	turnOrthogonal(setTo(tempViewDirectionX1, viewDirection));

    	for(var x=0; x<cWidth; x++) {
        
            var nx = x - cHalfWidth; 
        
            setTo(pixelLocation, nearFieldLocation);

            scalarMultiply(setTo(tempViewDirectionX2, tempViewDirectionX1), nx*pixel);
            add(pixelLocation, tempViewDirectionX2);
            add(pixelLocation, tempViewDirectionY);
        
            setTo(rayLocation, pixelLocation);
        
            normalize(subtract(setTo(rayDirection, rayLocation), eyeLocation));
        
            var distanceFromCamera = 0.0;
            var d = map(rayLocation);

            var iterations = 0;
            for(; iterations < MAX_ITER; iterations++) {
            
                if(d < halfPixel) {
                    break;
                }
        	
                //Increase rayLocation with direction and d:
                add(rayLocation, scalarMultiply(rayDirection, d));
                //And reset ray direction:
                normalize(rayDirection);

                //Move the pixel location:
                distanceFromCamera = length(subtract(setTo(temp, nearFieldLocation), rayLocation));

                if(distanceFromCamera > DEPTH_OF_FIELD) {
                    break;
                }
                d = map(rayLocation);
            }

            if(distanceFromCamera < DEPTH_OF_FIELD && distanceFromCamera > 0) {

                rayLocation[0] -= smallStep;
                var locationMinX = map(rayLocation);
                rayLocation[0] += bigStep;
                var locationPlusX = map(rayLocation);
                rayLocation[0] -= smallStep;
            	
                rayLocation[1] -= smallStep;
                var locationMinY = map(rayLocation);
                rayLocation[1] += bigStep;
                var locationPlusY = map(rayLocation);
                rayLocation[1] -= smallStep;

                rayLocation[2] -= smallStep;
                var locationMinZ = map(rayLocation);
                rayLocation[2] += bigStep;
                var locationPlusZ = map(rayLocation);
                rayLocation[2] -= smallStep;

            	//Calculate the normal:
                normal[0] = (locationMinX - locationPlusX); 
                normal[1] = (locationMinY - locationPlusY); 
                normal[2] = (locationMinZ - locationPlusZ); 
                normalize(normal);
            
            	//Calculate the ambient light:
                var dotNL = dotProduct(lightDirection, normal);
                var diff = saturate(dotNL);
            	
                //Calculate specular light:
                normalize(add(setTo(halfway, rayDirection), lightDirection));
    
                var dotNH = dotProduct(halfway, normal);
                var spec = Math.pow(saturate(dotNH),35);

                var shad = shadow(1.0, DEPTH_OF_FIELD, 16.0)+0.25;
                var brightness = (10.0 + (200.0 + spec * 45.0) * shad * diff) / 270.0;
            
                var red = 10+(380 * brightness);
                var green = 10+(280 * brightness);
                var blue = (180 * brightness);
            
                red = clamp(red, 0, 255.0);
                green = clamp(green, 0, 255.0);
                blue = clamp(blue, 0, 255.0);
            
                var pixels = 4 * ((y*cWidth) + x);
                imageData[pixels+0] = red;
                imageData[pixels+1] = green;
                imageData[pixels+2] = blue;
            } else {
                var pixels = 4 * ((y*cWidth) + x);
                imageData[pixels+0] = 155+clamp(iterations*1.5, 0.0, 100.0);
                imageData[pixels+1] = 205+clamp(iterations*1.5, 0.0, 50.0);
                imageData[pixels+2] = 255;
            }
        }
    return imageData;
}