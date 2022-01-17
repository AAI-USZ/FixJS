function(json) {
        var cat,
            catprefix,
            catlink,
            addr;
        this.status = json.status;
        if (!this.status) {
            this.daystext = '';
        }
        else if (this.status === 'active' && json.asked_fund) {
            this.daystext = 'Bidding open';
        }
        else if (this.status === 'active' && !json.asked_fund && json.listing_date) {
            this.daysago = DateClass.prototype.daysBetween(DateClass.prototype.dateFromYYYYMMDD(json.listing_date), DateClass.prototype.todayDate());
            this.daystext = this.daysago === 0 ? 'Listed today' : this.daysago + ' days ago';
        }
        else {
            this.daystext = SafeStringClass.prototype.ucfirst(this.status);
        }
        this.imgClass = json.logo ? '' : 'noimage';
        this.imgStyle = json.logo ? 'background: url(' + json.logo + ') no-repeat scroll left top' : '';
        this.posted = json.posted_date ? DateClass.prototype.format(json.posted_date) : 'not posted';
        this.name = json.title || 'No Company Name';

        this.category = json.category || 'Other';
        this.categoryUC = json.category ? json.category.toUpperCase() : 'OTHER';
        cat = this.category || '';
        catprefix = !cat || (cat !== 'Other' && !cat.match(/^[AEIOU]/)) ? 'A' : 'An';
        catlink = cat && cat !== 'Other' ? '<a href="/main-page.html?type=category&val=' + encodeURIComponent(cat) + '">' + cat + '</a>' : '';
        this.catlinked = catprefix + ' ' + catlink + ' company';

        addr = json.brief_address;
        this.brief_address = json.brief_address
            ? '<a class="hoverlink" href="/main-page.html?type=location&val=' + encodeURIComponent(json.brief_address) + '">'
                + '<div class="locicon"></div><span class="loctext">' + json.brief_address + '</span></a>'
            : '<span class="loctext">No Address</span>';
        this.brief_address_inp = json.brief_address
            ? '<a class="hoverlink" href="/main-page.html?type=location&val=' + encodeURIComponent(json.brief_address) + '">'
                + '<img src="../img/icons/location_16x16.gif" class="lociconinp"></img>&nbsp;<span class="loctextinp">' + json.brief_address + '</span></a>'
            : '<span class="loctext">No Address</span>';
        this.address = json.address || 'No Address';
        this.addrlinked = !addr ? '' : ' in <a href="/main-page.html?type=location&val=' + encodeURIComponent(addr) + '">' + addr + '</a>';
        this.categoryaddresstext = this.catlinked + this.addrlinked;

        if (this.status && json.asked_fund && json.suggested_amt && json.suggested_pct) {
            this.suggested_amt = CurrencyClass.prototype.format(json.suggested_amt);
            this.suggested_pct = PercentClass.prototype.format(json.suggested_pct) + '%';
            this.suggested_text = this.suggested_amt + ' for ' + this.suggested_pct;
            this.finance_line = this.daystext + ' at ' + this.suggested_text;
        }
        else if (this.status) {
            this.suggested_amt = '';
            this.suggested_text = 'Not raising funds';
            this.finance_line = this.daystext;
        }
        else {
            this.suggested_amt = '';
            this.suggested_text = '';
            this.finance_line = '';
        }
        this.mantra = json.mantra || 'No Mantra';
        this.mantraplussuggest = this.mantra + '<br/>' + this.suggested_text;
        this.founders = json.founders || 'No Founders';
        this.foundertext = json.founders ? 'Founded by ' + json.founders : '';
        if (this.status === 'new') {
            this.url = '/new-listing-submit-page.html';
        }
        else if (this.status === 'posted' && !this.options.admin) {
            this.url = '/new-listing-submitted-page.html';
        }
        else {
            this.url = '/company-page.html?id=' + json.listing_id;
        }
        this.websitelink = json.website || '#';
        this.websiteurl = json.website ? new URLClass(json.website) : null;
        this.websitedomain = this.websiteurl ? this.websiteurl.getHostname() : 'No Website';
        this.openanchor = this.options.preview ? '' : '<a href="' + this.url + '">';
        this.closeanchor = this.options.preview ? '' : '</a>';
    }