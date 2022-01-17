function(event){
    event.preventDefault();
    var hashId = this.hash;
    if (hashId == '#write-review-link'){
      jQuery(hashId).parents('form').parent('.block-content').slideToggle('slow');
    }
    jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top}, 500);
  }