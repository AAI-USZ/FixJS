function(offset, level) {
        this.outstanding += offset.length;

        var maxCirBlockSpan = 4 +  (this.window.cirBlockSize * 32);   // Upper bound on size, based on a completely full leaf node.
        var spans;
        for (var i = 0; i < offset.length; ++i) {
            var blockSpan = new Range(offset[i], Math.min(offset[i] + maxCirBlockSpan, this.window.cirTreeOffset + this.window.cirTreeLength));
            spans = spans ? spans.union( blockSpan ) : blockSpan;
        }

        var fetchRanges = spans.ranges();
        //dlog('fetchRanges: ' + fetchRanges);
        for (var r = 0; r < fetchRanges.length; ++r) {
            var fr = fetchRanges[r];
            this.cirFobStartFetch(offset, fr, level);
        }
    }