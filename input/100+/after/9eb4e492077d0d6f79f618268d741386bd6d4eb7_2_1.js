function(data) {

    // Set up VS box
    var opponent = data.opponent
      , user = data.me
      , question = data.question
      , remaining
      , elapsed = 0
      , limit = 300 //amount of time in seconds

      , timer = setInterval(function() {
          elapsed++;
          remaining = limit - elapsed;
          $("#timer").html(function() { //display time
            return lpad(Math.floor(remaining / 60), 2) + ":" + lpad(remaining - (Math.floor(remaining / 60) * 60), 2);
          });

          if (remaining === 0) { //timer finished
            clearInterval(timer);
            $('#console').prepend('<li>Time out. You BOTH lose!</li>');
          }
        }, 1000);
    
    // setting the challenge text
    $('#challenge_text').text(question.question);

		// setting user profile info 
    templateUserBox(user, $('#self'));
    templateUserBox(opponent, $('#opponent'));

    // Set up function header
    you.setValue('function(s) {\n\n' + '\t// your code here\n\n' + '\treturn s;\n' + '}');

    function templateUserBox(user, $box) {
      console.log(user.avatar);
      $box.find('.avatar').css('background-image', "url('" + user.avatar + "')");
      $box.find('.username').text(user.name);
      $box.find('.username').attr('href', 'http://twitter.com/' + user.name);
    }

    // Handle timer
    // pad timer with zeros
    function lpad(value, padding) {
      var zeroes = "0", i;

      for( i = 0; i < padding; i++) {
        zeroes += "0";
      }

      return (zeroes + value).slice(padding * -1);
    }

  }