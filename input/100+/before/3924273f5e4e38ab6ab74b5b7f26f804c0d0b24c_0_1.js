function() {
      var bucketsChannel, pusher, tweetsChannel;
      pusher = new Pusher($('#pusher_api').html());
      pusher.connection.bind("failed", function() {
        var flashVersionInfo;
        flashVersionInfo = swfobject.getFlashPlayerVersion();
        return alert("Falling back to FLASH " + flashVersionInfo.major + "." + flashVersionInfo.minor + "." + flashVersionInfo.release);
      });
      tweetsChannel = pusher.subscribe("tweets");
      bucketsChannel = pusher.subscribe("buckets");
      tweetsChannel.bind("tweet", function(tweet) {
        var linkifiedText, template;
        linkifiedText = $("<p>" + tweet.text + "</p>").linkify().html();
        template = $("#tweet-template").html().replace("{{TWEET_ID_STR}}", tweet.id_str).replace("{{PROFILE_IMAGE}}", tweet.user.profile_image_url).replace("{{TEXT}}", linkifiedText).replace("{{CREATED_AT}}", tweet.created_at).replace("{{USER_NAME_HREF}}", tweet.user.screen_name).replace("{{USER_NAME}}", tweet.user.screen_name).replace("{{USER_NAME_HREF}}", tweet.user.screen_name).replace("{{FULL_NAME}}", tweet.user.name).replace("{{USER_LOCATION}}", tweet.user.location).replace("{{FOLLOWERS_COUNT}}", tweet.user.followers_count);
        return $(template).hide().prependTo("#tweets").slideDown("fast");
      });
      tweetsChannel.bind("star", function(star) {
        return $("#" + star.twid).addClass("starred");
      });
      bucketsChannel.bind("new_bucket", function(bucket) {
        var bucket_element, word_spans;
        word_spans = app.create_word_spans(bucket.words);
        console.log(word_spans);
        bucket_element = $("#bucket-template").html().replace("{{BUCKET_ID}}", bucket.id).replace("{{BUCKET_COUNT}}", $("#spinner-template").html()).replace("{{BUCKET_NAME}}", bucket.name).replace("{{BUCKET_WORDS}}", word_spans);
        return $(bucket_element).hide().prependTo("#buckets").slideDown("fast");
      });
      bucketsChannel.bind("count_bucket", function(bucket_count) {
        return $("#" + bucket_count.id + " .bucket_count").html(app.commaFormat(bucket_count.count));
      });
      return bucketsChannel.bind("recount_bucket", function(new_bucket_count) {
        return $("#" + new_bucket_count.id + " .bucket_count").html(app.commaFormat(new_bucket_count.count));
      });
    }