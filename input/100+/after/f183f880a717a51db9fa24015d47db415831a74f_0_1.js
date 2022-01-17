function(datas) {
      var i, l, tweetsElement, data, tweetElement;
      tweetsElement = $('#tweets ul');
      for(i=0, l=datas.length; i<l; i++) {
        data = datas[i];
        tweetElement = $('<li><span class="tweet" />&mdash; <a>tweet</a></li>');
        tweetElement.find('.tweet').text(data.text);
        tweetElement.find('a').attr('href', "http://twitter.com/rosylilly/status/" + data.id_str).html(data.id_str);
        tweetsElement.append(tweetElement);
      }
    }