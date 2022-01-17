function() {'use strict';

  var questionIndex = 1
		, question = $.hakadoo.questions[questionIndex]
	  // Connect to socket.io
		, socket = io.connect(window.Array.host)
		// User abilities
		, abilities = {
			  remove: 3,
			  swap: 4,
			  peek: 5
			}
		, opponentAbilities = {
			  remove: 3,
			  swap: 4,
			  peek: 5
			}
	  // Read the profile data for this user
	  , user = $.parseJSON($('#page-data').html())
	  , you
	  , them
	  , opponentText;
	
  // initializing codemirror hakadoo keyMapping
  CodeMirror.keyMap.hakadoo = {
    'Ctrl-Enter': function(cm) {
      compileHandler();
    },
    'fallthrough': ['basic']
  };

  socket.emit('introduction', user);

  //initing the ability counts
  updateAbilities(abilities, $('#left_buttons'));
  updateAbilities(opponentAbilities, $('#right_buttons'));

  //create codeing panels
  you = CodeMirror.fromTextArea(document.getElementById("user_code"), {
    lineNumbers: true,
    matchBrackets: true,
    onChange: function(e) {
      var text = you.getValue();
      console.log('sending text', text);
      socket.emit('textEntered', {
        text: text
      });
    },
    keyMap: 'hakadoo',
    theme: 'night',
    autofocus: true
  });

  them = CodeMirror.fromTextArea(document.getElementById("opponent_code"), {
    lineNumbers: true,
    matchBrackets: true,
    theme: 'night',
    readOnly: 'nocursor'
  });

  // init questions
  $('#challenge_text').text(question.question);

  // binding click handlers
  $('#compile_button').click(function() {
    compileHandler();
  });

  $('#left_buttons').find('.swap').click(function() {
    if(useAbility(abilities, 'swap', $('#left_buttons').find('.swap'))) {
      socket.emit('swap');
    }
  });

  $('#left_buttons').find('.remove').click(function() {
    if(useAbility(abilities, 'remove', $('#left_buttons').find('.remove'))) {
      socket.emit('remove');
    }
  });

  $('#left_buttons').find('.peek').click(function() {
    if(useAbility(abilities, 'peek', $('#left_buttons').find('.peek'))) {
      them.setValue(opponentText);
      setTimeout(function() {
        them.setValue(censor(opponentText));
      }, 1500);
      socket.emit('peek');
    }
  });

  // Disable Cut, Copy and Paste in the Code Mirror
  // $(".CodeMirror*").live("cut copy paste", function(e) {
  // e.preventDefault();
  // });

  // socket event handlers

  socket.on('peek', function() {
    useAbility(opponentAbilities, 'peek', $('#right_buttons').find('.peek'));
  });

  socket.on('swap', function() {
    var text = you.getValue().split(''), swap = Math.floor(Math.random() * text.length - 1), holder = text[swap];

    useAbility(opponentAbilities, 'swap', $('#right_buttons').find('.swap'));
    text[swap] = text[swap + 1]
    text[swap + 1] = holder;
    you.setValue(text.join(''));
  });

  socket.on('remove', function() {
    var lines = you.getValue().split('\n'), killLine = Math.floor(Math.random() * lines.length), newText = lines.filter(function(line, i) {
      return i !== killLine;
    }).join('\n');

    useAbility(opponentAbilities, 'remove', $('#right_buttons').find('.remove'));
    you.setValue(newText);
  });

  socket.on('textUpdate', function(data) {
    console.log('textUpdate' + data.text);
    opponentText = data.text;
    them.setValue(censor(data.text));
  });

  socket.on('waiting', function(data) {
    console.log('waiting');
  });

  socket.on('ready', function(data) {
    // Set up VS box
    var opponent = data.opponent, remaining, elapsed = 0, limit = 300//amount of
    // time in seconds
    , timer = setInterval(function() {
      elapsed++;
      remaining = limit - elapsed;
      $("#timer").html(function() {//display time
        return lpad(Math.floor(remaining / 60), 2) + ":" + lpad(remaining - (Math.floor(remaining / 60) * 60), 2);
      });
      if(remaining === 0) {//timer finished
        clearInterval(timer);
        $('#console').append('<li>Time out. You BOTH lose!</li>');
      }
    }, 1000);

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

  });

  socket.on('lose', function() {
    $('#console').append('<li>You lose!</li>');
  });

  function compileHandler() {
    var worked = false;
    console.log('compile');

    try {
      worked = $.hakadoo.validate(questionIndex, you.getValue());
      $('#console').append('<li>Congratulations! You win!</li>');
    } catch(e) {
      worked = false;
      $('#console').prepend('<li>' + e.message + '</li>');
    }
    socket.emit('compile', {
      worked: worked
    });
  }

  function censor(text) {
    return text.replace(/\w/g, '01');
  }

  function setAbility(store, ability, val, button) {
    store[ability] = val;
    if(abilities[ability] < 0) {
      button.toggleClass('disabled', true);
    } else {
      button.toggleClass('disabled', false);
    }
    button.find('.count').text(val > 0 ? val : 0);
    return val;
  }

  function useAbility(store, ability, button) {
    return setAbility(store, ability, store[ability] - 1, button) >= 0;
  }

  function updateAbilities(store, container) {
  	var k;
    for(k in store) {
      container.find('.' + k).find('.count').text(store[k]);
    }
  }

}