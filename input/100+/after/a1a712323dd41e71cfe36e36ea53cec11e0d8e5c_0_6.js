function (x, z) {
             var triangle = base.triangle;

             if (typeof (x) === 'object') {
                 return this.getHeightValue(x[0], x[2]);
             }

             var faceLoc = this.getIndicesAt(x, z);

             if (faceLoc === -1) {
                 return 0;
             }

             var ofs_x = this.startX;
             var ofs_z = this.startZ;

             var pointLoc = faceLoc[2];
             var xpos = faceLoc[0]*this.cellSize+ofs_x;
             var zpos = faceLoc[1]*this.cellSize+ofs_z;
             var faceOfs = faceLoc[3];
             
             var tmpNorm;
             
             if (faceOfs === 0) {
                 tmpNorm = triangle.normal(
                      [xpos,this.hfFloatBuffer[pointLoc[0]],zpos+this.cellSize], 
                      [xpos+this.cellSize,this.hfFloatBuffer[pointLoc[1]],zpos], 
                      [xpos,this.hfFloatBuffer[pointLoc[2]],zpos]  
                  );
             } else {
                 tmpNorm = triangle.normal(
                      [xpos,this.hfFloatBuffer[pointLoc[0]],zpos+this.cellSize], 
                      [xpos+this.cellSize,this.hfFloatBuffer[pointLoc[1]],zpos+this.cellSize], 
                      [xpos+this.cellSize,this.hfFloatBuffer[pointLoc[2]],zpos]  
                  );
             } 
             
             var na = tmpNorm[0];
             var nb = tmpNorm[1];
             var nc = tmpNorm[2];

             var tmpPoint = [xpos,this.hfFloatBuffer[pointLoc[0]],zpos+this.cellSize];

             var d = -(na * tmpPoint[0]) - (nb * tmpPoint[1]) - (nc * tmpPoint[2]);

             return (((na * x) + (nc * z) + d) / (-nb)); // add height ofs here
         }