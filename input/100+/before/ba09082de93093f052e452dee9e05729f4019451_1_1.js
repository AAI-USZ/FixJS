function(chr, min, max, callback) {
        var thisB = this;
        if (!this.cirHeader) {
            // dlog('No CIR yet, fetching');
            this.bwg.data.slice(this.cirTreeOffset, 48).fetch(function(result) {
                                                                  thisB.cirHeader = result;
                                                                  var la = new Int32Array(thisB.cirHeader);
                                                                  thisB.cirBlockSize = la[1];
                                                                  thisB.readWigDataById(chr, min, max, callback);
                                                              });
            return;
        }

        var blocksToFetch = [];
        var outstanding = 0;

        var beforeBWG = Date.now();

        var cirFobRecur = function(offset, level) {
            outstanding += offset.length;

            var maxCirBlockSpan = 4 +  (thisB.cirBlockSize * 32);   // Upper bound on size, based on a completely full leaf node.
            var spans;
            for (var i = 0; i < offset.length; ++i) {
                var blockSpan = new Range(offset[i], Math.min(offset[i] + maxCirBlockSpan, thisB.cirTreeOffset + thisB.cirTreeLength));
                spans = spans ? union(spans, blockSpan) : blockSpan;
            }

            var fetchRanges = spans.ranges();
            // dlog('fetchRanges: ' + fetchRanges);
            for (var r = 0; r < fetchRanges.length; ++r) {
                var fr = fetchRanges[r];
                cirFobStartFetch(offset, fr, level);
            }
        };

        var cirFobStartFetch = function(offset, fr, level, attempts) {
            var length = fr.max() - fr.min();
            // dlog('fetching ' + fr.min() + '-' + fr.max() + ' (' + (fr.max() - fr.min()) + ')');
            thisB.bwg.data.slice(fr.min(), fr.max() - fr.min()).fetch(function(resultBuffer) {
                                                                          for (var i = 0; i < offset.length; ++i) {
                                                                              if (fr.contains(offset[i])) {
                                                                                  cirFobRecur2(resultBuffer, offset[i] - fr.min(), level);
                                                                                  --outstanding;
                                                                                  if (outstanding == 0) {
                                                                                      cirCompleted();
                                                                                  }
                                                                              }
                                                                          }
                                                                      });
        };

        var cirFobRecur2 = function(cirBlockData, offset, level) {
            var ba = new Int8Array(cirBlockData);
            var sa = new Int16Array(cirBlockData);
            var la = new Int32Array(cirBlockData);

            var isLeaf = ba[offset];
            var cnt = sa[offset/2 + 1];
            // dlog('cir level=' + level + '; cnt=' + cnt);
            offset += 4;

            if (isLeaf != 0) {
                for (var i = 0; i < cnt; ++i) {
                    var lo = offset/4;
                    var startChrom = la[lo];
                    var startBase = la[lo + 1];
                    var endChrom = la[lo + 2];
                    var endBase = la[lo + 3];
                    var blockOffset = (la[lo + 4]<<32) | (la[lo + 5]);
                    var blockSize = (la[lo + 6]<<32) | (la[lo + 7]);
                    if ((startChrom < chr || (startChrom == chr && startBase <= max)) &&
                        (endChrom   > chr || (endChrom == chr && endBase >= min)))
                    {
                        // dlog('Got an interesting block: startBase=' + startBase + '; endBase=' + endBase + '; offset=' + blockOffset + '; size=' + blockSize);
                        blocksToFetch.push({offset: blockOffset, size: blockSize});
                    }
                    offset += 32;
                }
            } else {
                var recurOffsets = [];
                for (var i = 0; i < cnt; ++i) {
                    var lo = offset/4;
                    var startChrom = la[lo];
                    var startBase = la[lo + 1];
                    var endChrom = la[lo + 2];
                    var endBase = la[lo + 3];
                    var blockOffset = (la[lo + 4]<<32) | (la[lo + 5]);
                    if ((startChrom < chr || (startChrom == chr && startBase <= max)) &&
                        (endChrom   > chr || (endChrom == chr && endBase >= min)))
                    {
                        recurOffsets.push(blockOffset);
                    }
                    offset += 24;
                }
                if (recurOffsets.length > 0) {
                    cirFobRecur(recurOffsets, level + 1);
                }
            }
        };


        var cirCompleted = function() {
            blocksToFetch.sort(function(b0, b1) {
                                   return (b0.offset|0) - (b1.offset|0);
                               });

            if (blocksToFetch.length == 0) {
                callback([]);
            } else {
                var features = [];
                var createFeature = function(fmin, fmax, opts) {
                    // dlog('createFeature(' + fmin +', ' + fmax + ')');

                    if (!opts) {
                        opts = {};
                    }

                    var f = new DASFeature();
                    f.segment = thisB.bwg.idsToChroms[chr];
                    f.min = fmin;
                    f.max = fmax;
                    f.type = 'bigwig';

                    for (k in opts) {
                        f[k] = opts[k];
                    }

                    features.push(f);
                };
                var maybeCreateFeature = function(fmin, fmax, opts) {
                    if (fmin <= max && fmax >= min) {
                        createFeature(fmin, fmax, opts);
                    }
                };
                var tramp = function() {
                    if (blocksToFetch.length == 0) {
                        var afterBWG = Date.now();
                        // dlog('BWG fetch took ' + (afterBWG - beforeBWG) + 'ms');
                        callback(features);
                        return;  // just in case...
                    } else {
                        var block = blocksToFetch[0];
                        if (block.data) {
                            var ba = new Uint8Array(block.data);

                            if (thisB.isSummary) {
                                var sa = new Int16Array(block.data);
                                var la = new Int32Array(block.data);
                                var fa = new Float32Array(block.data);

                                var itemCount = block.data.byteLength/32;
                                for (var i = 0; i < itemCount; ++i) {
                                    var chromId =   la[(i*8)];
                                    var start =     la[(i*8)+1];
                                    var end =       la[(i*8)+2];
                                    var validCnt =  la[(i*8)+3];
                                    var minVal    = fa[(i*8)+4];
                                    var maxVal    = fa[(i*8)+5];
                                    var sumData   = fa[(i*8)+6];
                                    var sumSqData = fa[(i*8)+7];

                                    if (chromId == chr) {
                                        var summaryOpts = {type: 'bigwig', score: sumData/validCnt};
                                        if (thisB.bwg.type == 'bigbed') {
                                            summaryOpts.type = 'density';
                                        }
                                        maybeCreateFeature(start, end, summaryOpts);
                                    }
                                }
                            } else if (thisB.bwg.type == 'bigwig') {
                                var sa = new Int16Array(block.data);
                                var la = new Int32Array(block.data);
                                var fa = new Float32Array(block.data);

                                var chromId = la[0];
                                var blockStart = la[1];
                                var blockEnd = la[2];
                                var itemStep = la[3];
                                var itemSpan = la[4];
                                var blockType = ba[20];
                                var itemCount = sa[11];

                                // dlog('processing bigwig block, type=' + blockType + '; count=' + itemCount);

                                if (blockType == BIG_WIG_TYPE_FSTEP) {
                                    for (var i = 0; i < itemCount; ++i) {
                                        var score = fa[i + 6];
                                        maybeCreateFeature(blockStart + (i*itemStep), blockStart + (i*itemStep) + itemSpan, {score: score});
                                    }
                                } else if (blockType == BIG_WIG_TYPE_VSTEP) {
                                    for (var i = 0; i < itemCount; ++i) {
                                        var start = la[(i*2) + 6];
                                        var score = fa[(i*2) + 7];
                                        maybeCreateFeature(start, start + itemSpan, {score: score});
                                    }
                                } else if (blockType == BIG_WIG_TYPE_GRAPH) {
                                    for (var i = 0; i < itemCount; ++i) {
                                        var start = la[(i*3) + 6] + 1;
                                        var end   = la[(i*3) + 7];
                                        var score = fa[(i*3) + 8];
                                        if (start > end) {
                                            start = end;
                                        }
                                        maybeCreateFeature(start, end, {score: score});
                                    }
                                } else {
                                    dlog('Currently not handling bwgType=' + blockType);
                                }
                            } else if (thisB.bwg.type == 'bigbed') {
                                var offset = 0;
                                while (offset < ba.length) {
                                    var chromId = (ba[offset+3]<<24) | (ba[offset+2]<<16) | (ba[offset+1]<<8) | (ba[offset+0]);
                                    var start = (ba[offset+7]<<24) | (ba[offset+6]<<16) | (ba[offset+5]<<8) | (ba[offset+4]);
                                    var end = (ba[offset+11]<<24) | (ba[offset+10]<<16) | (ba[offset+9]<<8) | (ba[offset+8]);
                                    offset += 12;
                                    var rest = '';
                                    while (true) {
                                        var ch = ba[offset++];
                                        if (ch != 0) {
                                            rest += String.fromCharCode(ch);
                                        } else {
                                            break;
                                        }
                                    }

                                    var featureOpts = {};

                                    var bedColumns = rest.split('\t');
                                    if (bedColumns.length > 0) {
                                        featureOpts.label = bedColumns[0];
                                    }
                                    if (bedColumns.length > 1) {
                                        featureOpts.score = stringToInt(bedColumns[1]);
                                    }
                                    if (bedColumns.length > 2) {
                                        featureOpts.orientation = bedColumns[2];
                                    }
                                    if (bedColumns.length > 5) {
                                        var color = bedColumns[5];
                                        if (thisB.BED_COLOR_REGEXP.test(color)) {
                                            featureOpts.override_color = 'rgb(' + color + ')';
                                        }
                                    }

                                    if (bedColumns.length < 9) {
                                        if (chromId == chr) {
                                            maybeCreateFeature(start + 1, end, featureOpts);
                                        }
                                    } else if (chromId == chr && start <= max && end >= min) {
                                        // Complex-BED?
                                        // FIXME this is currently a bit of a hack to do Clever Things with ensGene.bb

                                        var thickStart = bedColumns[3]|0;
                                        var thickEnd   = bedColumns[4]|0;
                                        var blockCount = bedColumns[6]|0;
                                        var blockSizes = bedColumns[7].split(',');
                                        var blockStarts = bedColumns[8].split(',');

                                        featureOpts.type = 'bb-transcript';
                                        var grp = new DASGroup();
                                        grp.id = bedColumns[0];
                                        grp.type = 'bb-transcript';
                                        grp.notes = [];
                                        featureOpts.groups = [grp];

                                        if (bedColumns.length > 10) {
                                            var geneId = bedColumns[9];
                                            var geneName = bedColumns[10];
                                            var gg = new DASGroup();
                                            gg.id = geneId;
                                            gg.label = geneName;
                                            gg.type = 'gene';
                                            featureOpts.groups.push(gg);
                                        }

                                        var spans = null;
                                        for (var b = 0; b < blockCount; ++b) {
                                            var bmin = (blockStarts[b]|0) + start;
                                            var bmax = bmin + (blockSizes[b]|0);
                                            var span = new Range(bmin, bmax);
                                            if (spans) {
                                                spans = union(spans, span);
                                            } else {
                                                spans = span;
                                            }
                                        }

                                        var tsList = spans.ranges();
                                        for (var s = 0; s < tsList.length; ++s) {
                                            var ts = tsList[s];
                                            createFeature(ts.min() + 1, ts.max(), featureOpts);
                                        }

                                        if (thickEnd > thickStart) {
                                            var tl = intersection(spans, new Range(thickStart, thickEnd));
                                            if (tl) {
                                                featureOpts.type = 'bb-translation';
                                                var tlList = tl.ranges();
                                                for (var s = 0; s < tlList.length; ++s) {
                                                    var ts = tlList[s];
                                                    createFeature(ts.min() + 1, ts.max(), featureOpts);
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                dlog("Don't know what to do with " + thisB.bwg.type);
                            }
                            blocksToFetch.splice(0, 1);
                            tramp();
                        } else {
                            var fetchStart = block.offset;
                            var fetchSize = block.size;
                            var bi = 1;
                            while (bi < blocksToFetch.length && blocksToFetch[bi].offset == (fetchStart + fetchSize)) {
                                fetchSize += blocksToFetch[bi].size;
                                ++bi;
                            }

                            thisB.bwg.data.slice(fetchStart, fetchSize).fetch(function(result) {
                                                                                  var offset = 0;
                                                                                  var bi = 0;
                                                                                  while (offset < fetchSize) {
                                                                                      var fb = blocksToFetch[bi];

                                                                                      var data;
                                                                                      if (thisB.bwg.uncompressBufSize > 0) {
                                                                                          // var beforeInf = Date.now();
                                                                                          data = jszlib_inflate_buffer(result, offset + 2, fb.size - 2);
                                                                                          // var afterInf = Date.now();
                                                                                          // dlog('inflate: ' + (afterInf - beforeInf) + 'ms');
                                                                                      } else {
                                                                                          var tmp = new Uint8Array(fb.size);    // FIXME is this really the best we can do?
                                                                                          arrayCopy(new Uint8Array(result, offset, fb.size), 0, tmp, 0, fb.size);
                                                                                          data = tmp.buffer;
                                                                                      }
                                                                                      fb.data = data;

                                                                                      offset += fb.size;
                                                                                      ++bi;
                                                                                  }
                                                                                  tramp();
                                                                              });
                        }
                    }
                };
                tramp();
            }
        };

        cirFobRecur([thisB.cirTreeOffset + 48], 1);
    }