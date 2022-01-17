function vrange(val, meta, record, rI, cI, store) {
        --cI; //cI (columnIndex) was one too high because of the checkboxes column taking index 0.
        var range = maxvals[cI] - minvals[cI];
        var spl = val.split(',');
        var low = parseFloat(spl[0]);
        var high = parseFloat(spl[1]);
        var roffset = 0;
        var loffset = 0;
        if (range != 0) {
            loffset = ((low - minvals[cI]) / range) * 100 - 1;
            roffset = ((maxvals[cI] - high) / range) * 100 - 1;
        }
        
        if (range != 0 && low != NaN && high != NaN) {
            return '<div class="woot" low=' + low + ' high=' + high + '><div style="margin-right:' + roffset + '%; margin-left:' + loffset + '%;"></div></div>';
        } else {
            return '<div class="woot empty" low=' + low + ' high=' + high + '></div>';
        }
    }