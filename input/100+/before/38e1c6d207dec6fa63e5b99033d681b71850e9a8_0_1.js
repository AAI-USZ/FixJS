function(result) {
            if (!result) {
                bwg._loading.resolve({ success: false });
                return;
            }

            bwg.fileSize = headerSlice.totalSize;
            var header = result;
            var sa = new Int16Array(header);
            var la = new Int32Array(header);
            if (la[0] == bwg.BIG_WIG_MAGIC) {
                bwg.type = 'bigwig';
            } else if (la[0] == bwg.BIG_BED_MAGIC) {
                bwg.type = 'bigbed';
            } else {
                console.error( 'Format '+la[0]+' not supported' );
                bwg._loading.resolve({ success: false });
                return;
            }
            //        dlog('magic okay');

            bwg.version = sa[2];             // 4
            bwg.numZoomLevels = sa[3];       // 6
            bwg.chromTreeOffset = (la[2] << 32) | (la[3]);     // 8
            bwg.unzoomedDataOffset = (la[4] << 32) | (la[5]);  // 16
            bwg.unzoomedIndexOffset = (la[6] << 32) | (la[7]); // 24
            bwg.fieldCount = sa[16];         // 32
            bwg.definedFieldCount = sa[17];  // 34
            bwg.asOffset = (la[9] << 32) | (la[10]);    // 36 (unaligned longlong)
            bwg.totalSummaryOffset = (la[11] << 32) | (la[12]);    // 44 (unaligned longlong)
            bwg.uncompressBufSize = la[13];  // 52

            // dlog('bigType: ' + bwg.type);
            // dlog('chromTree at: ' + bwg.chromTreeOffset);
            // dlog('uncompress: ' + bwg.uncompressBufSize);
            // dlog('data at: ' + bwg.unzoomedDataOffset);
            // dlog('index at: ' + bwg.unzoomedIndexOffset);
            // dlog('field count: ' + bwg.fieldCount);
            // dlog('defined count: ' + bwg.definedFieldCount);

            bwg.zoomLevels = [];
            for (var zl = 0; zl < bwg.numZoomLevels; ++zl) {
                var zlReduction = la[zl*6 + 16];
                var zlData = (la[zl*6 + 18]<<32)|(la[zl*6 + 19]);
                var zlIndex = (la[zl*6 + 20]<<32)|(la[zl*6 + 21]);
                //          dlog('zoom(' + zl + '): reduction=' + zlReduction + '; data=' + zlData + '; index=' + zlIndex);
                bwg.zoomLevels.push({reductionLevel: zlReduction, dataOffset: zlData, indexOffset: zlIndex});
            }

            // parse the totalSummary if present (summary of all data in the file)
            if( bwg.totalSummaryOffset ) {
                if( Float64Array ) {
                    (function() {
                        var ua = new Uint32Array( header, bwg.totalSummaryOffset, 2 );
                        var da = new Float64Array( header, bwg.totalSummaryOffset+8, 4 );
                        var s = {
                            basesCovered: ua[0]<<32 | ua[1],
                            minVal: da[0],
                            maxVal: da[1],
                            sumData: da[2],
                            sumSquares: da[3]
                        };
                        bwg._stats = s;
                        // rest of these will be calculated on demand in getGlobalStats
                    }).call();
                } else {
                    console.warn("BigWig statistics not available, this web browser is not capable of handing 64-bit floating point typed arrays (Float64Array)");
                }
            }

            bwg._readChromTree(function() {
                bwg._loading.resolve({success: true});
            });
        }