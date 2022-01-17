function() {
        this.addMetaTags('property', {
            'og:title': this.listing_public_title,
            'og:type': 'company',
            'og:url': this.listing_url,
            'og:image': 'http://startupbidder.com/listing/logo/' + this.listing_id,
            'og:site_name': 'startupbidder',
            'fb:app_id': '3063944677997'
        });
        pl('#facebookbanner').html('<div class="fb-like" data-href="' + this.listing_url + '" data-send="false" data-width="290" data-show-faces="false" data-font="arial"></div>');
  (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
    }