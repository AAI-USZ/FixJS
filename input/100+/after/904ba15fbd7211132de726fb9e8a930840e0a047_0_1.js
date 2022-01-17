function(count) {
  var t_1 = performance.webkitNow();
  var boneCount = 200;
  var srcVertices = [];
  var dstVertices = [];
  var weights = [];
  var i;
  var bbones = new Float32Array(16*boneCount);
  var bones = [];
  var workers = [];
  var workerCount = this.workerCount;
  var workUnitSize = Math.floor(count/workerCount);
  var unitDiff = count - (workUnitSize*workerCount);
  var allWeights = this.makeWeights(count, boneCount);
  var allVerts = this.makeBMArray(count);
  var off = 0;
  for (i=0; i<workerCount; i++) {
    if (i == 0) workUnitSize += unitDiff;
    srcVertices.push(allVerts.buffer.slice(off*4*4, (off+workUnitSize)*4*4));
    dstVertices.push(new ArrayBuffer(workUnitSize*4*4));
    weights.push(allWeights.buffer.slice(off*4*5, (off+workUnitSize)*4*5));
    off += workUnitSize;
    if (i == 0) workUnitSize -= unitDiff;
    var bb = new Float32Array(bbones.length);
    bb.set(bbones);
    bones.push(bb.buffer);
    var w = new Worker('bones.js');
    workers.push(w);
  }
  var t0 = performance.webkitNow();
  console.log("init", t0-t_1);

  Bones.runBenchmark = function(callback) {
    Bones.dstVertices = null;
    var bbones = new Float32Array(bones[0]);
    var t = Date.now()/1000;
    var xFac = Bones.xFac, yFac = Bones.yFac, xtFac = Bones.xtFac, ytFac = Bones.ytFac;
    for (var i=0; i<bbones.length; i+=16) {
      var sx = Math.sin(t+i/160)*(0.5*Math.sin(t+i*xFac+t*xtFac));
      var sy = Math.cos(t+i/160)*(0.5*Math.sin(t+i*yFac+t*ytFac));
      bbones[i] = 1; bbones[i+1] = 0; bbones[i+2] = 0; bbones[i+3] = 0;
      bbones[i+4] = 0; bbones[i+5] = 1; bbones[i+6] = 0; bbones[i+7] = 0;
      bbones[i+8] = 0; bbones[i+9] = 0; bbones[i+10] = 1; bbones[i+11] = 0;
      bbones[i+12] = sx; bbones[i+13] = sy; bbones[i+14] = Math.abs(Math.sin(t+i)); bbones[i+15] = 1;
    }
    for (var j=1; j<workerCount; j++) {
      new Float32Array(bones[j]).set(bbones);
    }
    var t0 = performance.webkitNow();
    var working = workers.length;
    for (var i=0; i<workers.length; i++) {
      var w = workers[i];
      w.onmessage = function(ev) {
        var res = ev.data;
        srcVertices[res.index] = res.src;
        dstVertices[res.index] = res.dst;
        weights[res.index] = res.weights;
        bones[res.index] = res.bones;
        working--;
        if (working == 0) {
          // all done
          var t1 = performance.webkitNow();
          var d = new Float32Array(dstVertices[0]);
          Bones.dstVertices = dstVertices;
          callback(t1-t0);
        }
      };
      var req = {
        index: i,
        useSSE: Bones.useSSE,
        src: srcVertices[i],
        dst: dstVertices[i],
        weights: weights[i],
        bones: bones[i]
      };
      if (Bones.singleThreaded) {
        Bones.processWorkerRequest(req);
        w.onmessage({data: req});
      } else {
        w.webkitPostMessage(req, [ srcVertices[i], dstVertices[i], weights[i], bones[i] ]);
      }
    }
  };
}