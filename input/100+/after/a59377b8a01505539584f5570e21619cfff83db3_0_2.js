function getConversation(tweet) {
  // INPUT: single tweet object, as returned by Twitter get/status API
  // RESULT: builds javascript array of all tweet objects in the conversation
  //         and passes it on to getEmbedCodes()
  console.log('getConversation(tweet) ,', tweet);
  $('#constatus').html('Found: <span id="concount">1</span>');

  var conversation = [];

  var recursiveTweetFetch = function(tweet) {

    if (tweet.in_reply_to_status_id_str) {
      // tweet has parent - recursively call the function again
      console.log('recursiveTweetFetch recursing push ',conversation.push(tweet));
      $.ajax({
        url:'http://api.twitter.com/1/statuses/show/'+
          tweet.in_reply_to_status_id_str+'.json?'+
          'trim_user=1',
        error: displayError,
        success: recursiveTweetFetch
      });
    } else {
      // this is the last (first?) tweet in the conversation
      console.log('recursiveTweetFetch termination push ',conversation.push(tweet));
      getEmbedCodes(conversation);
    }
    $('#concount').html(conversation.length); // every time we loop we can add one
  };

  recursiveTweetFetch(tweet);
}