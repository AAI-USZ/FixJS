function(name, host, properties, onCreate) {
             console.log(properties);
        var room = this; 

        var teams = {};
        
        //set up properties
        if (!properties.type) {
          properties.type = app.Constants.Multiplayer.GAME_TYPE_FFA;
          properties.maxOccupancy = 10;
        }
        if (properties.type == app.Constants.Multiplayer.GAME_TYPE_FFA) {
          for (var i = 0; i <  properties.maxOccupancy; i++){
            var team = new Model.Multiplayer.Team(i+1, 1, room);
            teams[i+1] = team; 
          }
        } else if (properties.type == app.Constants.Multiplayer.GAME_TYPE_TEAM) {
          for (var i = 0; i <  properties.numTeams; i++){
            var team = new Model.Multiplayer.Team(i+1, properties.teamLimit, room);
            teams[i+1] = team; 
          }
        }

        var name = name;
        var host = host;
        var created = new Date();
        var game = new Model.Multiplayer.Game(room);
        this.game = game;

        var users = [];
        var userToTeam = {};
        var channel;
        var channelName = Model.Constants.Bridge.ROOM_CHANNEL_PREFIX+name;
        var serviceName = Model.Constants.Bridge.ROOM_SERVICE_PREFIX+name;

        Model.Multiplayer.Room.ChannelHandler = function(properties){
          this.onChat = function(user, message) {
            properties.onChat(app.getUsers()[user], message);
          }
          this.onSystemBroadcast = function(message) {
            properties.onSystemBroadcast(message);
          }
          this.onJoin = function(user) {
            properties.onJoin(user);
          }
          this.onLeave = function(user) {
            properties.onLeave(user);
          }
          this.onStartQuestion = function() {
            properties.onStartQuestion();
          }
          this.onBuzz = function(user) {
            properties.onBuzz(user);
          }
          this.onNewWord = function(word) {
            properties.onNewWord(word);
          }
          this.onUpdateScore = function(scores) {
            properties.onUpdateScore(scores);
          }
          this.onAnswer = function(user, answer) {
            properties.onAnswer(user, answer);
          }
          this.onQuestionTimeout = function(){
            properties.onQuestionTimeout();
          }
          this.onFinish = function() {
            properties.onFinish();
          }
          this.onSit = function(user, team) {
            properties.onSit(user, team);
          }
          this.onCompleteQuestion = function(question) {
            properties.onCompleteQuestion(question);
          }
        }

        Model.Multiplayer.Room.ServiceHandler = function(user){
          this.chat = function(message) {
            channel.onChat(user, message);
          }
          this.buzz = function() {
            game.buzz(user);
          }
          this.answer = function(answer, callback) {
            game.answer(user, answer, callback);
          }
          this.leave = function() {
            channel.onLeave(user);
          }
          this.sit = function(team, callback) {
            if (teams[team]) {
              var sat = teams[team].sit(user, callback);
              if (sat) {
                channel.onSit(app.getUsers()[user], team);
              }
            } else {
              callback(false);
            }
          }
        }

        this.join = function(user, handler, onJoin) {
          users.push(user);
          app.bridge.joinChannel(
            channelName,
            handler,
            function(){
              app.log(app.Constants.Tag.MULTIPLAYER, [app.getUsers()[user].name,"joined",channelName]);
              onJoin(new Model.Multiplayer.Room.ServiceHandler(user));
            }
          );
        }
        this.start = function(user) {
          if (!game.started) {
            if (user == host) {
              game.start();
              app.log(app.Constants.Tag.MULTIPLAYER,["Game started"]);
            } else {
              app.dao.user.get(user, function(u) {
                app.log(app.Constants.Tag.MULTIPLAYER,["Oh please, you're not the gamemaster. Don't try to be something you aren't, "+u.name]);
              });
            }
          }
        }
        this.getName = function(callback){
          if (callback) {
            callback(name);
          }
          return name;
        }
        this.getHost = function(callback){
          if (callback) {
            callback(host);
          }
          return host;
        }
        this.getCreated = function(callback){
          if (callback) {
            callback(created);
          }
          return created;
        }
        this.getUsers = function(callback){
          if (callback) {
            callback(users);
          }
          return users;
        }
        this.getUserToTeam = function(callback){
          if (callback) {
            callback(userToTeam);
          }
          return userToTeam;
        }
        this.getChannel = function(callback){
          if (callback) {
            callback(channel);
          }
          return channel;
        }
        this.getTeams = function(callback) {
          if (callback) {
            callback(teams);
          }
          return teams;
        }
        this.getProperties = function(callback) {
          if (callback) {
            callback(properties);
          }
          return properties;
        }
        app.bridge.publishService(serviceName, room);
        app.bridge.joinChannel(channelName, 
          new Model.Multiplayer.Room.ChannelHandler({
            onChat : function(user, message) {
            },
            onSystemBroadcast : function(message) {
            },
            onJoin : function(user) {
            },
            onLeave : function(user) {
            },
            onStartQuestion : function() {
            },
            onBuzz : function(user) {
              app.log(app.Constants.Tag.MULTIPLAYER, [user.name, "buzzed in"]);
            },
            onNewWord : function(word) {
            },
            onUpdateScore : function(scores) {
            },
            onAnswer : function(user, answer) {
            },
            onQuestionTimeout : function(){
            },
            onFinish : function() {
            },
            onSit : function(user, team) {
              app.log(app.Constants.Tag.MULTIPLAYER, [user.name, "sat on Team",team]);
            },
            onCompleteQuestion : function(question) {
            }
          }), function(c) {
            channel = c;
            app.bridge.getService(serviceName, function(obj){
              onCreate(obj);
              app.log(app.Constants.Tag.MULTIPLAYER, [app.getUsers()[host].name,"created",serviceName]);
            });
          }
        );
      }