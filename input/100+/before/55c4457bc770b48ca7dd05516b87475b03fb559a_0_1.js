function (from, to, message) {
  if (from === 'firebot') {
    console.log("ignoreing firebot")
    return;
  }

  console.log(from + ' => ' + to + ': ' + message);
  logger.log({channel:to, from:from, message:message});
  if (message.search(nick) >= 0){
    if (message.search(" hi[ $]?") >= 1){
      client.say(to, "Hi hi " + from);
    }
    if (message.search("damn you") >= 0) {
      client.say(to, "I am so sorry " + from + ", can we hug?");
    }
  }


  if (message.search(":gist") === 0){
    client.say(to, "Please paste >3 lines of text to http://pastebin.mozilla.org");
  }

  if (message.search(":help") === 0){
    for (var item in help){
      client.say(from, item + " : " + help[item]);
    }
  }

  if (message.search(":yt") === 0){
    var options = {
        host: 'gdata.youtube.com',
        port: 443,
        path: "/feeds/api/videos?q=" + message.substring(4).replace(/ /g, '+') + "&alt=json",
        method: 'GET'
    };
    var req = http.request(options, function(res) {
      var apiResult = '';
          
      res.on('data', function(d) {
        apiResult += d;
      });
      res.on('end', function(){
        try{
          data = JSON.parse(apiResult);
          title = data["feed"]["entry"][0]["title"]["$t"]
          link = data["feed"]["entry"][0]["link"][0]["href"];
          client.say(to, title + " -- " + link);
        } catch(e) {
          console.error(e.message);
        }
      });
    });
    req.end();
  }

  if (message.search(/bug \d+/i) >= 0 || message.search(/https:\/\/bugzilla.mozilla.org\/show_bug.cgi\?id=(\d+)/i) >= 0 ){
    var bugID = "";
    if (/bug (\d+)/i.exec(message)) {
      bugID = /bug (\d+)/i.exec(message)[1]
    } else {
      bugID = /https:\/\/bugzilla.mozilla.org\/show_bug.cgi\?id=(\d+)/i.exec(message)[1];
    }

    var options = {
        host: 'api-dev.bugzilla.mozilla.org',
        port: 443,
        path: "/0.9/bug?id=" + bugID,
        method: 'GET'
    };
    var apiResult = ''
    var req = http.request(options, function(res) {
      res.on('data', function(d) {
      apiResult += d; 
      });
            
      res.on('end', function(){
        var returnMessage = '';
        try{
          data = JSON.parse(apiResult);
          url = "https://bugzilla.mozilla.org/show_bug.cgi?id=" + bugID;
          if (data["bugs"].length === 0){
            returnMessage = "Sorry " + from + " that bug doesn't exist! I suggest you get raising more bugs until it does!";
            logger.log({channel:to, from:nick, message:returnMessage}); 
            client.say(to, returnMessage);
            return;
          }
          summary = data["bugs"]["0"]["summary"];
          severity = data["bugs"]["0"]["severity"];
          status = data["bugs"]["0"]["status"];
          resolution = data["bugs"]["0"]["resolution"];
          returnMessage = "Bug " + url + " " + severity + ", " + status + " " + resolution + ", " + summary;
          logger.log({channel:to, from:nick, message:returnMessage});
          client.say(to, returnMessage); 
        }catch(e){
          console.error(e);            
        }
      });
    });

    req.on('error', function (error) {
      console.error(error);
      client.say(to, "Unfortunately there was an error trying to retrieve that bug, please try again. If this happens again please ping AutomatedTester");
    });

    req.end();
  }

  if (message.search(":source") === 0){
    client.say(to, "My details and code lives at http://automatedtester.github.com/automation-services-bot/. Go have a look!");
  }

  if (message.search(":pivotal") === 0){
    var projects = {
        "team" : "https://www.pivotaltracker.com/projects/323503",
        "shared modules" : "https://www.pivotaltracker.com/projects/344657",
        "web apps" : "https://www.pivotaltracker.com/projects/350145",
        "mozmill automation" : "https://www.pivotaltracker.com/projects/298905",
        "api refactor" : "https://www.pivotaltracker.com/projects/311747",
        "dashboard" : "https://www.pivotaltracker.com/projects/294869",
    }

    var project = /^:pivotal ((\w+)?(\s\w+)?)/.exec(message)
    if (project === null){
      for (var item in projects){
        client.say(to, item + ' - ' + projects[item]);
      }
    } else {
      try {
        console.log(project);
        client.say(to, project[1] + ' - ' + projects[project[1]]);
      } catch (e) {
        client.say(to, "Unfortunately that project doesn't appear to exist"); 
      }
    }
  }

  if (message.search(":list") === 0){
    var search = /:list (.+)/.exec(message);
    if (search === null){
      client.say(to, "http://groups.google.com/group/mozilla.dev.automation");
    } else {
      client.say(to, "http://groups.google.com/group/mozilla.dev.automation/search?group=mozilla.dev.automation&q=" + search[1].replace(/ /g, '+') + "&qt_g=Search+this+group");
    }
  }

  if (message.search(":standup") === 0){
    console.log(to.substring(1).toLowerCase());
    if (meeting[to.substring(1).toLowerCase()].standup){
      client.say(to, meeting[to.substring(1).toLowerCase()].standup);
    }
  }

  if (message.search(":meeting") === 0){
    if (meeting[to.substring(1).toLowerCase()].meeting){
      client.say(to, meeting[to.substring(1).toLowerCase()].meeting);
    }
  }

  if (message.search(":newissue") >= 0){
    var project = /:newissue ([a-z-_]+)/.exec(message);
    if (project !== null){
      var key = to.substring(1).toLowerCase();
      console.log(key);
      if (github[key][project[1]]){
        client.say(to, "Please raise an issue at " + github[key][project[1]] + "/issues/new");
      } else {
        client.say(to, "I am sorry I don't know of that project. Please raise an issue on " +
            "http://oss.theautomatedtester.co.uk/automation-services-bot/ if I should know about it");
      }
    } else {
      client.say(to, "please use the syntax :newissue project. You can get a list of projects by calling :github");
    }
  }

  if (message.search(":issues") >= 0){
    var project = /:issues ([a-z-_]+)/.exec(message);
    if (project !== null){
      var key = to.substring(1).toLowerCase();
      console.log(key);
      if (github[key] && github[key][project[1]]){
        client.say(to, "Issues for " + project[1] +  " can be found at " + github[key][project[1]] + "/issues");
      } else {
        client.say(to, "I am sorry I don't know of that project. Please raise an issue on " +
            "http://oss.theautomatedtester.co.uk/automation-services-bot/ if I should know about it");
      }
    } else {
      client.say(to, "please use the syntax :issues project. You can get a list of projects by calling :github");
    }
  }

  if (message.search(":github") === 0){
    var projects = github[to.substring(1).toLowerCase()];
    for (var item in projects){
      client.say(from, item + " : " + projects[item]);
    }
  }
}