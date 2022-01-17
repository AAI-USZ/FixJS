function(pos,dir) {
             var startPos = pos.slice(0);
             var startX = this.startX, startZ = this.startZ;
             var endX = this.startX+this.sizeX, endZ = this.startZ+this.sizeZ;
 
             var cellSize = this.cellSize;
             var vec2 = base.vec2;
             var vec3 = base.vec3;
             var dirNormalized = vec3.normalize(dir);

             var ray2d = [dirNormalized[0],dirNormalized[2]];
             var pos2d = [startPos[0],startPos[2]];
             
             // is our starting position outside the heightfield area?  if so cast it to one of the edges
             if (startPos[0] < startX || startPos[0] > endX || startPos[2] < startZ || startPos[2] > endZ) {
                 var corners = [
                     [startX,startZ],
                     [endX,startZ],
                     [startX,endZ],
                     [endX,endZ]
                 ];
             
                 // limit test to possible edges
                 var edges = [];
             
                 if (startPos[0] >= endX) {
                     edges.push([corners[1],corners[3]]);
                 } 
                 if (startPos[0] <= startX) {
                     edges.push([corners[0],corners[2]]);
                 }
                 if (startPos[2] >= endZ) {
                     edges.push([corners[2],corners[3]]);
                 }
                 if (startPos[2] <= startZ) {
                     edges.push([corners[0],corners[1]]);
                 }
             
                 // check possible edges
                 if (edges.length !== 0) {
                     var intersects = [];
                     var i,iMax;
                     
                     // test intersect with possible edges
                     for (i = 0, iMax = edges.length; i<iMax; i++) {
                         var intersect = vec2.lineIntersect(pos2d,vec2.add(pos2d,ray2d),edges[i][0],edges[i][1]);
                         if (intersect!==false && vec2.onLine(edges[i][0],edges[i][1],intersect)) {
                             intersects.push(intersect);
                         }
                     }
                    
                     var dist = 0;
                     var ic = -1;
                 
                     // find the nearest edge intersection
                     for (i = 0, iMax = intersects.length; i<iMax; i++) {
                         var d = vec2.length(intersects[i],pos2d);
                         if (i === 0) {
                             dist = d;
                             ic = 0;
                             continue;
                         }
                         if (d < dist) {
                             ic = i;
                             dist = d;
                         }
                     }

                     // if we have an intersection, set the new startPos
                     if (ic != -1) {
                         mul = dist/vec2.length(ray2d);
                     
                         startPos = [intersects[ic][0],0,intersects[ic][1]];
                         startPos[1] = pos[1]+dirNormalized[1]*mul;
                     
                         // attempt to immediately discard if lower than the edge
                         if (startPos[1] <= this.getHeightValue(startPos[0],startPos[2])) {
                             return false;
                         }
                     } else {   // no edge intersection, ray points outside the area
                         return false;
                     }
                 }
                 pos2d = [startPos[0],startPos[2]];
             }  // end if outside area
             
             // nearest cell intersection to starting position
             var start_cell_x = Math.floor((pos2d[0]-startX)/cellSize);
             var start_cell_z = Math.floor((pos2d[1]-startZ)/cellSize);

             // ray step position x,y and weight
             var p_x, p_z, m;

             // initial offset step to nearest grid line X and Z
             var d_x = (pos2d[0]-(startX+start_cell_x*cellSize));
             var d_z = (pos2d[1]-(startZ+start_cell_z*cellSize));

             // step the ray at the same ray weight
             if (d_x < d_z) {
                 m = d_x/Math.abs(ray2d[0]);
             } else {
                 m = d_z/Math.abs(ray2d[1]);
             }

             // we're already on a grid line
             if (m === 0) {
                 p_x = pos2d[0];
                 p_z = pos2d[1];
             } else { // step to the nearest grid line
                 p_x = pos2d[0]+m*ray2d[0];
                 p_z = pos2d[1]+m*ray2d[1];
             }

             // cell step stride counter
             var init_step_x = (p_x-(startX+start_cell_x*cellSize));
             var init_step_z = (p_z-(startZ+start_cell_z*cellSize));
             
             // glass half full or half empty? (what's the remainder based on ray direction)
             var cell_step_x = ray2d[0]>=0?init_step_x:(cellSize-init_step_x);
             var cell_step_z = ray2d[1]>=0?init_step_z:(cellSize-init_step_z);
             
             var buffer = this.getFloat32Buffer();
             
             var ray_height_prev, ray_height, mul, mul_prev;
             
             while (1) {
                 // find next nearest grid line
                 var step_x = (cellSize-cell_step_x)/Math.abs(ray2d[0]);
                 var step_z = (cellSize-cell_step_z)/Math.abs(ray2d[1]);
                 var step;
             
                 if (step_x < step_z) {
                     step = step_x;
                 } else {
                     step = step_z;
                 }

                 // compute ray step
                 var ray_step_x = ray2d[0]*step;
                 var ray_step_z = ray2d[1]*step;
             
                 // increase offset counter
                 cell_step_x += Math.abs(ray_step_x);
                 cell_step_z += Math.abs(ray_step_z);

                 var c_x,c_z;
                 
                 // find center of ray
                 c_x = (p_x+(p_x+ray_step_x))/2.0;
                 c_z = (p_z+(p_z+ray_step_z))/2.0;

                 // step ray
                 p_x += ray_step_x;
                 p_z += ray_step_z;

                 // find cell at center of ray
                 var cell_x = Math.floor((c_x-startX)/cellSize);
                 var cell_z = Math.floor((c_z-startZ)/cellSize);

                 // roll the offset counter
                 if ((cell_step_x >= cellSize)) {
                     while (cell_step_x >= cellSize) {
                         cell_step_x -= cellSize;
                     }
                 }
                 
                 if ((cell_step_z >= cellSize)) {
                     while (cell_step_z >= cellSize) {
                         cell_step_z -= cellSize;
                     }
                 }
                 
                 // previous and current ray weights
                 mul = vec2.length(pos2d,[p_x,p_z])/vec2.length(ray2d);
                 mul_prev = vec2.length(pos2d,[p_x-ray_step_x,p_z-ray_step_z])/vec2.length(ray2d);
                 
                 // height of ray at previous and current ray intersect
                 ray_height = startPos[1]+dirNormalized[1]*mul;
                 ray_height_prev = startPos[1]+dirNormalized[1]*mul_prev;

                 // check if we've stepped out of the area
                 if (cell_x > this.divX || cell_x < 0 || cell_z > this.divZ || cell_z < 0) {
                     return false;
                 }
                 
                 // find the heights surrounding the cell
                 var z1 = buffer[cell_z*this.divX+cell_x];
                 var z2 = buffer[cell_z*this.divX+cell_x+1];
                 var z3 = buffer[(cell_z+1)*this.divX+cell_x];
                 var z4 = buffer[(cell_z+1)*this.divX+cell_x+1];
                 
                 var epsilon = 0.00000001;
                 
                 
                 // check if any of the heights surrounding are above the current and previous intersections
                 // if so, we have a possible ray hit in this cell
                 if (((ray_height-z1)<=0) || ((ray_height-z2)<=0) || ((ray_height-z3)<=0) || ((ray_height-z4)<=0) || 
                     ((ray_height_prev-z1))<=0 || ((ray_height_prev-z2))<=0 || ((ray_height_prev-z3))<=0 || ((ray_height_prev-z4))<=0) {

                     // construct the buffer indices for the triangles in this cell
                     var faceIndicesA = [(cell_x) + ((cell_z + 1) * this.divX), (cell_x + 1) + ((cell_z) * this.divX), (cell_x) + ((cell_z) * this.divX)];
                     var faceIndicesB = [(cell_x) + ((cell_z + 1) * this.divX), (cell_x + 1) + ((cell_z + 1) * this.divX), (cell_x + 1) + ((cell_z) * this.divX)];
                     // get the nearest grid intersection
                     var xpos = startX+cellSize*cell_x;
                     var zpos = startZ+cellSize*cell_z;
                     
                     // construct the triangle normals for this cell
                     tmpNormA = base.triangle.normal(
                          [xpos,buffer[faceIndicesA[0]],zpos+cellSize], 
                          [xpos+cellSize,buffer[faceIndicesA[1]],zpos], 
                          [xpos,buffer[faceIndicesA[2]],zpos]
                     );

                     tmpNormB = base.triangle.normal(
                           [xpos,buffer[faceIndicesB[0]],zpos+cellSize], 
                           [xpos+cellSize,buffer[faceIndicesB[1]],zpos+cellSize], 
                           [xpos+cellSize,buffer[faceIndicesB[2]],zpos]  
                     );

                     // test the first triangle
                     var iA = vec3.linePlaneIntersect(tmpNormA, [xpos,buffer[faceIndicesA[0]],zpos+cellSize], startPos, vec3.add(startPos,dirNormalized));

                     var slope = Math.abs((startZ+(cell_z+1)*cellSize)-iA[0]) / Math.abs((startX+cell_x*cellSize)-iA[2]);

                     // if intersection lies within the bounds and correct half of the cell for first triangle, return a ray hit
                     if ((slope >= 1) && (iA[0]>=xpos-epsilon) && (iA[0] <= xpos+cellSize+epsilon) && (iA[2]>=zpos-epsilon) && (iA[2] <= zpos+epsilon+cellSize)) {
                         return iA;
                     }
                     
                     // test the second triangle
                     var iB = vec3.linePlaneIntersect(tmpNormB, [xpos,buffer[faceIndicesB[0]],zpos+cellSize], startPos, vec3.add(startPos,dirNormalized));

                     // if intersection lies within the bounds and correct half of the cell for second triangle, return a ray hit
                     if ((slope < 1) && (iB[0] >= xpos-epsilon) && (iB[0] <= xpos+cellSize+epsilon) && (iB[2] >= zpos-epsilon) && (iB[2] <= zpos+cellSize+epsilon)) {
                         return iB;
                     }
                     
                     // if (((ray_height-z1)<=0 && (ray_height-z2)<=0 && (ray_height-z3)<=0 || (ray_height-z4)<=0) &&
                     // ((ray_height_prev-z1)<=0 && (ray_height_prev-z2)<=0 && (ray_height_prev-z3)<=0 && (ray_height_prev-z4)<=0)) {
                     //   console.log("!a",iA[0]-xpos,iA[2]-zpos,iA[0]-(xpos+cellSize),iA[2]-(zpos+cellSize));  
                     //   console.log("!b",iB[0]-xpos,iB[2]-zpos,iB[0]-(xpos+cellSize),iB[2]-(zpos+cellSize));
                     //   // return (slope>=1)?iA:iB;
                     //   return false;
                     // } 
                          
                 }
             }
         }