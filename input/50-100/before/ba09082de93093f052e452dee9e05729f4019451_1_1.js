function(chrName, min, max, callback) {
        var chr = this.bwg.chromsToIDs[chrName];
        if (chr === undefined) {
            // Not an error because some .bwgs won't have data for all chromosomes.

            // dlog("Couldn't find chr " + chrName);
            // dlog('Chroms=' + miniJSONify(this.bwg.chromsToIDs));
            return callback([]);
        } else {
            return this.readWigDataById(chr, min, max, callback);
        }
    }