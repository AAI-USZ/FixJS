function(data, dims) {
  
  var vertices = []
    , faces = []
    , n = 0
    , x = new Int32Array(3)
    , R = new Int32Array([1, (dims[0]+1), (dims[0]+1)*(dims[0]+1)])
    , grid = new Float32Array(8)
    , buf_no = 1;
   
  //Resize buffer if necessary 
  if(R[2] * 2 > buffer.length) {
    buffer = new Int32Array(R[2] * 2);
  }
  
  //March over the voxel grid
  for(x[2]=0; x[2]<dims[2]-1; ++x[2], n+=dims[0], buf_no ^= 1, R[2]=-R[2]) {
    var m = 1 + (dims[0]+1) * (1 + buf_no * (dims[1]+1));
    for(x[1]=0; x[1]<dims[1]-1; ++x[1], ++n, m+=2)
    for(x[0]=0; x[0]<dims[0]-1; ++x[0], ++n, ++m) {
    
      //Read in field values
      var mask = 0, g = 0, idx = n;
      for(var k=0; k<2; ++k, idx += dims[0]*(dims[1]-2))
      for(var j=0; j<2; ++j, idx += dims[0]-2)      
      for(var i=0; i<2; ++i, ++g, ++idx) {
        var p = data[idx];
        grid[g] = p;
        mask |= (p < 0) ? (1<<g) : 0;
      }
      
      //Check edge mask
      if(mask === 0 || mask === 0xff) {
        continue;
      }
      var edge_mask = edge_table[mask];
      
      //Sum up edge intersections
      var v = [0.0,0.0,0.0], e_count = 0;
      for(var i=0; i<12; ++i) {
        if(!(edge_mask & (1<<i))) {
          continue;
        }
        ++e_count;
        var e0 = cube_edges[ i<<1 ]
          , e1 = cube_edges[(i<<1)+1]
          , g0 = grid[e0]
          , g1 = grid[e1]
          , t  = g0 - g1;
        if(Math.abs(t) > 1e-6) {
          t = g0 / t;
        } else {
          continue;
        }
        for(var j=0, k=1; j<3; ++j, k<<=1) {
          var a = e0 & k
            , b = e1 & k;
          if(a !== b) {
            v[j] += a ? 1.0 - t : t;
          } else {
            v[j] += a ? 1.0 : 0;
          }
        }
      }
      
      //Average edge intersections to get vertex
      var s = 1.0 / e_count;
      for(var i=0; i<3; ++i) {
        v[i] = x[i] + s * v[i];
      }
      buffer[m] = vertices.length;
      vertices.push(v);
      
      //Connect faces together
      for(var i=0; i<3; ++i) {
        if(!(edge_mask & (1<<i)) ) {
          continue;
        }
        var iu = (i+1)%3
          , iv = (i+2)%3
        if(x[iu] === 0 || x[iv] === 0) {
          continue;
        }
        var du = R[iu]
          , dv = R[iv];
        if(mask & 1) {
          faces.push([buffer[m], buffer[m-du], buffer[m-du-dv], buffer[m-dv]]);
        } else {
          faces.push([buffer[m], buffer[m-dv], buffer[m-du-dv], buffer[m-du]]);
        }
      }
    }
  }
  
  return { vertices: vertices, faces: faces };
}