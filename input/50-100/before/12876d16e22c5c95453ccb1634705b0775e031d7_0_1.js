function(){
      var shards = 6,
          branchName = $(this).html(),
          $ol = $('<ol></ol>');

      for(var index = 1; index <= shards; index++) {
        $('<li>Checking...</li>').appendTo($ol).jenGit({
          url: "http://builder.soundcloud.com/job/soundcloud_" + branchName + "_specs_00" + index + "/lastBuild/api/json"
        });
      }

      $(".content-body.markdown-body.markdown-format:first").append($('<div class="jengit"><b>Tests:</b></div>').append($ol));
    }