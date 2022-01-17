function() {
        this.addMetaTags('itemprop', {
            'name': this.listing_public_title,
            'description': this.summary,
            'image': 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/41604_200032480112098_936268874_n.jpg'
        });
        pl('#gplusbanner').html('<g:plusone size="medium" annotation="inline" width="290" href="' + this.listing_url + '"></g:plusone>');
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
    }