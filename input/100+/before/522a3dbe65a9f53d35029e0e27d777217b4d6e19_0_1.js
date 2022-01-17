function() {
    var story = RB.$('#story_template').children().first().clone();
    
    this.getList().prepend(story);
    o = RB.Factory.initialize(RB.Story, story[0]);
    o.edit();
    story.find('.editor' ).first().focus();
    RB.$('html,body').animate({
        scrollTop: story.find('.editor').first().offset().top-100
        }, 200);
  }