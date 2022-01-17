function(options) {
        var addnote = options && options.last ? this.bidslist.makeAddNote() : ''; // removing note from accept/reject/withdraw actions
            addbuttons = options && options.last ? this.bidslist.makeAddButtons() : '';
            amtidattr = options && options.last ? ' id="existing_bid_amt"' : '';
            pctidattr = options && options.last ? ' id="existing_bid_pct"' : '';
            validattr = options && options.last ? ' id="existing_bid_val"' : '';
        return '\
        <div class="messageline investorbidline ' + this.typeclass + '">\
            <p class="span-2">' + this.usertext + '</p>\
            <p class="span-2">' + this.typetext + '</p>\
            <p class="span-3 sideboxnum"' + amtidattr + '>' + this.amttext + '</p>\
            <p class="span-2 sideboxnum"' + pctidattr + '>' + this.pcttext + '</p>\
            <p class="span-3 sideboxnum"' + validattr + '>' + this.valtext + '</p>\
            <p class="span-9 investorbidnote">' + this.bidtext + '</p>\
            <p class="investorbiddate">' + this.datetext + '</p>\
        ' + addbuttons + '\
        </div>\
        ';
    }