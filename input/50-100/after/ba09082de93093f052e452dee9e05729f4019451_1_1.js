function() {
            var chr = this.bwg.chromsToIDs[chrName];
            if (chr === undefined) {
                // Not an error because some .bwgs won't have data for all chromosomes.

                // dlog("Couldn't find chr " + chrName);
                // dlog('Chroms=' + miniJSONify(this.bwg.chromsToIDs));
                callback([]);
            } else {
                this.readWigDataById(chr, min, max, callback);
            }
        }