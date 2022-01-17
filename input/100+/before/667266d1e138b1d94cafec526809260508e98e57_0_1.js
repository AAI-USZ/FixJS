function(){
      var self = this,
          feedbackList = self.locationModel.get('feedback'),
          feedbackLen = feedbackList.length;
      self.$list.empty();

      _.each(feedbackList, function(attrs, i) {
        var color = self.options.colors[i % self.options.colors.length];
            charClass = '';

        if (attrs.desc.length < 50) {
          charClass = 'lt50';
        } else if (attrs.desc.length < 100) {
          charClass = 'lt100';
        }

        self.$list.append('<li data-index="'+i+'" class="'+ color +'"><span class="'+charClass+'">' +
          '<a href="#">'+ attrs.desc + '</a></span></li>');
      });

      if (feedbackLen > 0) {
        self.focusOnFeedback(feedbackList, feedbackLen-1);
        self.$list.show();
      } else {
        self.$list.hide();
      }

      if (feedbackLen > 1) self.$nav.show(); else self.$nav.hide();
    }