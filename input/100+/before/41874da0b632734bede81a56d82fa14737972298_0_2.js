function() {

  if(window.tte != undefined && window.tte.ui != undefined)

    turntable.removeEventListener("message", window.tte.ui.listener);

  

  window.tte = {

    ttObj: null,

    attempts: 0,

    timers: [],

    timerHover: null,

    downvoters: [],

    spotSaving: {

      spot_saving: false,

      spot_attempts: [],

      boot_msg: 'Please stop trying to get on deck, the spot is reserved!',

      spot_users: []

    },

    settings: {

      boot_linkers: true

    },

    isAfk: function(uid) {

      for(var prop in window.tte.timers) {

        if(window.tte.timers[prop].userid == uid) {

          var afk = (window.tte.timers[prop].time <= ((new Date().getTime()) - 600000));

          window.tte.timers[prop].time = new Date().getTime();

          return afk;

        }

      }

      // person doesn't exist in array, so add them

      window.tte.timers.push({userid: uid, time: new Date().getTime()});

      return false;

    },

    getAfkTime: function(uid) {

      var t = (new Date()).getTime();

      for(var prop in window.tte.timers) {

        if(window.tte.timers[prop].userid == uid) {

          t = window.tte.timers[prop].time;

          break;

        }

      }

      var seconds = ((new Date()).getTime() - t) / 1000,

          minutes = seconds / 60,

          hours = minutes / 60,

          time = "";

      if(hours >= 1) {

        hours = Math.round(hours);

        if(hours < 10)

          time += "0";

        time += hours + ":";

      }

      else

        time += "00:";



      if(minutes >= 1) {

        minutes = parseInt(minutes % 60);

        if(minutes < 10)

          time += "0";

        time += minutes + ":";

      }

      else

        time += "00:";



      if(seconds >= 1) {

        seconds = parseInt(seconds % 60);

        if(seconds < 10)

          time += "0";

        time += seconds;

      }

      else

        time += "00";



      return time;

    },

    sendMsg: function(msg) {

      turntable.socket.send(JSON.stringify({

        api: "room.speak",

        roomid: TURNTABLE_ROOMID,

        text: msg,

        msgid: turntable.messageId++,

        clientid: turntable.clientId,

        userid: turntable.user.id,

        userauth: turntable.user.auth

      }));

    },

    sendPm: function(userid, msg) {

      turntable.socket.send(JSON.stringify({

        api: "pm.send",

        receiverid: userid,

        text: msg,

        msgid: turntable.messageId++,

        clientid: turntable.clientId,

        userid: turntable.user.id,

        userauth: turntable.user.auth

      }));

    },

    eventManager: {

      event: document.createEvent("Event"),

      messages: [],

      queue: function(params, callback) {

        var msgId = window.tte.eventManager.messages.push(callback),

            data = $.extend({'msgId': msgId}, params);

        $('#tteui-msg').html(JSON.stringify(data))[0].dispatchEvent(window.tte.eventManager.event);

      },

      init: function() {

        // setup event handler

        window.tte.eventManager.event.initEvent("tteEventWeb", true, true);

        $('#tteui-msg').bind('tteEventExt', function() {

          var data = JSON.parse($(this).html()),

              func = window.tte.eventManager.messages[data.msgId-1];

          console.log('Received from extension: ');

          console.log(data);

          if(func != undefined)

            func(data);

          delete window.tte.eventManager.messages[data.msgId-1];

        });

      }

    },

    init: function() {

      window.tte.eventManager.init();

    }

  };



  window.tte.utils = {

    getNameByUserId: function(userId) {

      return window.tte.ttObj.users[userId.toString()].name;

    },

    getUserIdByName: function(name) {

      var users = window.tte.ttObj.users;

      for(var i in users) {

        if(users[i].name.toLowerCase() == $.trim(name.toLowerCase()))

          return users[i].userid;

      }

      return 0;

    },

    isNumeric: function(vTestValue)

    {

      // put the TEST value into a string object variable

      var sField = new String($.trim(vTestValue));

      

      // check for a length of 0 - if so, return false

      if(sField.length==0) {return false;}

      else if(sField.length==1 && (sField.charAt(0) == '.' || sField.charAt(0) == ',' || (sField.charAt(0) == '-'))) {return false;}

      

      // loop through each character of the string

      for(var x=0; x < sField.length; x++) {

        // if the character is < 0 or > 9, return false (not a number)

        if((sField.charAt(x) >= '0' && sField.charAt(x) <= '9') || sField.charAt(x) == '.' || sField.charAt(x) == ',' || (sField.charAt(x) == '-' && x==0)) { /* do nothing */ }

        else { return false; }

      }

      

      // made it through the loop - we have a number

      return true;

    }

  };



  window.tte.ui = {

    settings: {

      animations: true,

      favorites: [],

      notifierKeywords: [],

      displayType: 0

    },

    version: '2.2.0',

    newUpdatesMsg: '<ul>'

                  +'<li>New Feature: Command Line Interface (CLI). Integrates a command-like feeling. (Try it out by typing \'/\' in the chat textbox to see a list of commands.</li>'

                  +'<li>Bug Fix: When saving a spot and a moderator hops up on deck, it no longer let\'s them stay on deck and turns off spot saving, it instead kicks them off.</li>'

                  +'<li>Bug Fix: Various CSS bugs fixed.</li>'

                  +'<li>Bug Fix: Fixed bug causing popup not to show if you clicked on a person\'s name in chat.</li>'

                  +'</ul>',

    upvotes: 0,

    downvotes: 0,

    snags: 0,



    listener: function(d) {

      switch(d.command) {

        case 'snagged':

          var val = parseInt(window.tte.ui.votes.find('span:last-child').html());

          window.tte.ui.votes.find('span:last-child').html(++val);

          window.tte.isAfk(d.senderid);



          // Update Snag count

          window.tte.ui.snags += 1;

          window.tte.ui.updateVoteDisplays(window.tte.ui.upvotes,window.tte.ui.downvotes,window.tte.ui.snags,-1);

          break;

          

        case 'update_votes':

          $(window.tte.ui.votes.find('span')[1]).html(d.room.metadata.upvotes);

          $(window.tte.ui.votes.find('span')[0]).html(d.room.metadata.downvotes);

          

          // Get upvotes count

          window.tte.ui.upvotes = d.room.metadata.upvotes;



          var $user = $('#' + d.room.metadata.votelog[0][0]);

          if(!$user.length)

            $user = guestListAddUser(d.room.metadata.votelog[0][0]);

          if(d.room.metadata.votelog[0][1] == "up") {

            $user.addClass('voteup').removeClass('votedown');

            var pos = $.inArray(d.room.metadata.votelog[0][0], window.tte.downvoters)

            if(pos >= 0)

              delete window.tte.downvoters[pos];



            // Reconcile downvotes

            window.tte.ui.downvotes = d.room.metadata.downvotes;

          }

          else {

            $user.addClass('votedown').removeClass('voteup');

            if($.inArray(d.room.metadata.votelog[0][0], window.tte.downvoters) == -1)

              window.tte.downvoters.push(d.room.metadata.votelog[0][0]);



            // Update downvote tally

            window.tte.ui.downvotes += 1;

          }

          window.tte.isAfk(d.room.metadata.votelog[0][0]);

          break;

          

        case 'newsong':

          $(window.tte.ui.votes.find('span')[0]).html(0);

          $(window.tte.ui.votes.find('span')[1]).html(0);

          window.tte.ui.votes.find('span:last-child').html(0);

          window.tte.downvoters = [];

          window.tte.ui.guestList();

          window.tte.ui.updateSongCount();



          // Reset Vote Counts

          window.tte.ui.upvotes = 0;

          window.tte.ui.downvotes = 0;

          window.tte.ui.snags = 0;



          break;

          

        case 'registered':

          window.tte.ui.guestListAddUser(d.user[0]);

          $("span#totalUsers").text(window.tte.ui.numUsers());

          window.tte.timers.push({userid: d.user[0].userid, time: new Date().getTime()});

          break;

          

        case 'deregistered':

          window.tte.ui.guestListRemoveUser(d.user[0].userid);

          $("span#totalUsers").text(window.tte.ui.numUsers());

          for(var prop in window.tte.timers) {

            if(window.tte.timers[prop].userid == d.user[0].userid) {

              delete window.tte.timers[prop];

              break;

            }

          }

          break;

          

        case 'pmmed':

          window.tte.ui.sendNotification('PM Notification', turntable.buddyList.pmWindows[d.senderid].otherUserName + ': ' + d.text);

          window.tte.isAfk(d.senderid);

          break;

          

        case 'speak':

          var list = window.tte.ttObj.users[window.tte.ttObj.selfId].name;

          $.each(window.tte.ui.settings.notifierKeywords, function(i, v) {

            if(v != undefined && v.length > 0)

              list += '|' + v;

          });

          if(d.text.search(new RegExp(list, 'i')) >= 0) {

            window.tte.ui.sendNotification('Chat Notification', d.name + ': ' + d.text);

          }

          if(window.tte.settings.boot_linkers && d.text.search(/https?:\/\/(www.)?(((tt|turntable)\.fm)|(plug\.dj))(\/[a-zA-Z0-9\-\_]*)*\/?/ig) >= 0 && window.tte.ttObj.isMod() && !window.tte.ttObj.isMod(d.userid)) {

            window.tte.socket({

              api: 'room.boot_user',

              roomid: TURNTABLE_ROOMID,

              target_userid: d.userid,

              reason: 'Please do not link to other turntable rooms.'

            });

          }

          window.tte.isAfk(d.userid);

          break;

          

        case 'rem_dj':

          window.tte.ui.guestListAddUser(d.user[0]);

          break;

          

        case 'add_dj':

          window.tte.ui.guestListAddUser(d.user[0]);

          if(window.tte.ttObj.isMod() && window.tte.spotSaving.spot_saving) {

            var allOnDeck = 0;

            var total = window.tte.spotSaving.spot_users.length;

            $.each(window.tte.spotSaving.spot_users, function(i, v) {

              var uid = '';

              $.each(window.tte.ttObj.users, function(i2, v2) {

                if(v2.name.toLowerCase() == v.toLowerCase())

                  uid = v2.userid;

              });



              if(uid == '')

                total--; //person not in the room, so don't take him into account'

              else {

                if($.inArray(uid, window.tte.ttObj.djIds) >= 0) {

                  allOnDeck++;

                };

              }

            });

            if(allOnDeck == total)

              window.tte.spotSaving.spot_saving = false;

            else {

              if($.inArray(d.user[0].name.toLowerCase(), window.tte.spotSaving.spot_users) < 0) {

                if(allOnDeck != total) {

                  window.tte.spotSaving.spot_attempts.push(d.user[0].userid);

                  var count = 0;

                  $.each(window.tte.spotSaving.spot_attempts, function(i, v) {

                    if(v == d.user[0].userid) count++;

                  });

                  if(count > 2) { 

                    window.tte.socket({

                      api: 'room.boot_user',

                      roomid: TURNTABLE_ROOMID,

                      target_userid: d.user[0].userid,

                      reason: window.tte.spotSaving.boot_msg

                    });

                  }

                  else {

                    window.tte.callback('remove_dj', d.user[0].userid);

                    window.tte.sendMsg(':exclamation:Sorry ' + d.user[0].name + ', that spot is reserved!');

                  }

                }

                else {

                  window.tte.spotSaving.spot_attempts = [];

                  window.tte.spotSaving.spot_saving = false;

                }

              }

            }

          }

          break;

          

        case 'new_moderator':

          if (d.userid == window.turntable.user.id) {

            

          }

          break;

          

        case 'rem_moderator':

          if (d.userid == window.turntable.user.id) {

            

          }

          break;

      }

    },



    override_set_dj_points: function(points) {

      setTimeout(function(){window.tte.ui.updateVoteDisplays(window.tte.ui.upvotes,window.tte.ui.downvotes,window.tte.ui.snags,points);},250);

    },



    updateVoteDisplays: function(upvotes,downvotes,snags,points) {

      if(points < 0) {points = Number(window.tte.ttRoomObjs.current_dj[3].html().split(" ")[0].replace(',',''));}

      var suffix = " points";

      suffix += "<br/>+" + upvotes.toString();

      suffix += " / -" + downvotes.toString();

      suffix += " / &#9829;" + snags.toString();



      // Dj Display

      if(window.tte.ttRoomObjs.current_dj)

      {

        window.tte.ttRoomObjs.current_dj[3].show();

        window.tte.ttRoomObjs.current_dj[3].html(window.tte.ttRoomObjs.commafy(points) + suffix);

        window.tte.ttRoomObjs.current_dj[4].points = points;

      }



      // Song List Display

      if($('div.songlog:first div.song:first div.tteTrackHistoryVotes:first').length <= 0)

      {

        var content = $('<div class="tteTrackHistoryVotes"> </div>');

        content.css({

          fontSize:"10px",

          textAlign:"center"

        });

        $('div.songlog:first div.song:first div.songinfo:first').append(content);

      }

      $('div.songlog:first div.song:first div.tteTrackHistoryVotes:first').html('+' + upvotes + '/-' + downvotes + '<br/>&#9829; ' + snags);

    },



    numUsers: function() {

      var count = 0;

      for(var prop in window.tte.ttObj.users)

        count++;

      return count;

    },

    userSort: function (j, i) {

      var h = j.name.toLowerCase(),

          k = i.name.toLowerCase();

      return (k > h) ? -1 : (k < h) ? 1 : 0;

    },

    guestList: function () {

      var supers = [],

          mods = [],

          djs = [],

          fans = [],

          users = [],

          g = $(".guest-list-container .guests");

      

      // get each type

      for (var f in window.tte.ttObj.users) {

        if(window.tte.ttObj.isDj(f))

          djs.push(window.tte.ttObj.users[f]);

        else if(window.tte.ttObj.isSuperuser(f))

          supers.push(window.tte.ttObj.users[f]);

        else if(window.tte.ttObj.isMod(f))

          mods.push(window.tte.ttObj.users[f]);

        else if(window.tte.ttObj.users[f].fanof)

          fans.push(window.tte.ttObj.users[f]);

        else

          users.push(window.tte.ttObj.users[f]);

      }



      var c = g.find(".guest.selected").data("id");

      g.find("div").remove();



      // sort

      window.tte.ui.guestListAddUsers(g, 'super', supers.sort(window.tte.ui.userSort));;

      window.tte.ui.guestListAddUsers(g, 'mod', mods.sort(window.tte.ui.userSort));

      window.tte.ui.guestListAddUsers(g, 'dj', djs.sort(window.tte.ui.userSort));

      window.tte.ui.guestListAddUsers(g, 'fan', fans.sort(window.tte.ui.userSort));

      window.tte.ui.guestListAddUsers(g, 'user', users.sort(window.tte.ui.userSort));

      //window.tte.ui.guestListAddUsers(g, 'user', $.merge(fans.sort(window.tte.ui.userSort), users.sort(window.tte.ui.userSort)));

      

      if(fans.length > 0)

        $('#desc-user > div.desc').hide();

      

      $.each(window.tte.ttObj.upvoters, function(i, v) {

        g.find('#' + v).addClass('voteup');

      });

      

      $("span#totalUsers").text(window.tte.ui.numUsers());

    },

    guestListAddUsers: function(obj, type, userList) {

      var title = '',

          html = '';

          

      switch(type) {

        case 'super':

          title = 'Super Users';

          break;

        

        case 'mod':

          title = 'Moderators';

          break;

          

        case 'dj':

          title = 'DJs';

          break;

          

        case 'fan':

          title = 'Users';

          break;

          

        default:

          title = 'Users';

          break;

      }

      

      groupContainer = $('<div id="desc-' + type + '" ' + ((!userList.length) ? 'style="display:none;"' : '') + '></div>');

      groupHeader = $('<div class="desc black-right-header"' + ((type == 'super') ? ' style="display: none;"' : '') + '><div class="desc-inner header-text">' + title + '</div></div>');

      groupContainer.append(groupHeader);

      $.each(userList, function(i, v) {

        groupContainer.append(window.tte.ui.guestListGetUserHtml(type, v));

      });

      obj.append(groupContainer);

    },

    guestListAddUser: function(user) {

      var type, $s;

      if(window.tte.ttObj.isDj(user.userid))

        type = 'dj';

      else if(window.tte.ttObj.isSuperuser(user.userid))

        type = 'super';

      else if(window.tte.ttObj.isMod(user.userid))

        type = 'mod';

      else if(user.fanof) {

        type = 'fan';

        $('#desc-user > div.desc').hide();

      }

      else

        type = 'user';

      $('#' + user.userid).remove();

      

      $s = $('#desc-' + type);

      var text = window.tte.ui.guestListGetUserHtml(type, user),

          found = undefined;

      $s.find('div.guest').each(function() {

        var $this = $(this);

        if(window.tte.ui.userSort(user, {name: $this.find('div.guestName').html()}) <= 0) {

          found = $this;

          return false;

        }

      });

      if(found == undefined)

        $s.append(text);

      else

        found.before(text);

      $s.show();

      return text;

    },

    guestListRemoveUser: function(uid) {

      var $e = $('#' + uid);

      if($e.parent().find('div.guest').length == 1)

        $e.parent().hide();

      $e.remove();

    },

    guestListGetUserHtml: function(type, user) {

      var icons = '';

      if(window.tte.ttObj.isSuperuser(user.userid))

        icons += '<img src="http://static.turntable.fm.s3.amazonaws.com/images/room/superuser_icon.png" alt="Super User" />';

      else if(window.tte.ttObj.isMod(user.userid))

        icons += '<img src="http://static.turntable.fm.s3.amazonaws.com/images/room/mod_icon.png" alt="Moderator" />';

      

      var vote = '';

      if($.inArray(user.userid, window.tte.downvoters) >= 0)

        vote = 'votedown';

      else if($.inArray(user.userid, window.tte.ttObj.upvoters) >= 0)

        vote = 'voteup';

      

      return  $('<div class="guest ' + type + ' ' + vote + ' ' + ((user.fanof && type == user) ? 'fan' : '') + '" id="' + user.userid + '">'

            + '<div class="guestAvatar"><img src="https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/avatars/' + user.avatarid + '/scaled/55/headfront.png" height="20" alt="" /></div>'

            + '<div class="icons">' + icons + ((user.fanof) ? '<img src="http://www.pinnacleofdestruction.net/tt/images/heart_small.png" alt="Fan" />' : '') + '</div>'

            + '<div class="idletime"></div>'

            + '<div class="guestName">' + user.name + '</div>'

            + '</div>')

            .bind('click', function() {

              var $this = $(this),

                  l = Room.layouts.guestOptions(window.tte.ttObj.users[$this.attr('id')], window.tte.ttObj);

              delete l[3];

              l[2].push([

                'a.guestOption',

                {

                  event: {click: function() {

                    window.tte.eventManager.queue({api: 'getNote', userid: $this.attr('id')}, function(response) {

                      var $html = $(util.buildTree(

                        ["div.modal", {},

                          ["div.close-x", {event: {click: util.hideOverlay}}],

                          ["h1", "Set User Note"],

                          ["br"],

                          ["div", {}, "Enter any information you would like about this user below."],

                          ["br"],

                          ["textarea#userNoteField.textarea", {maxlength: 400} ],

                          ["br"], ["br"],

                          ["div.ok-button.centered-button", {event: {click: function() {

                                  var val = $('#userNoteField').val(), uid = $this.attr('id');

                                  window.tte.eventManager.queue({api: 'setNote', userid: uid, note: val});

                                  util.hideOverlay();

                                }

                              }

                            }

                          ]

                        ]

                      ));

                      $html.find('#userNoteField').val(response.note);

                      util.showOverlay($html);

                    });

                    $(this).parent().remove();

                  }},

                  href: '#'

                },

                'Set Note'

              ]);

              var c = $(util.buildTree(l)).css({

                top: $this.offset().top + 'px',

                left: $this.offset().left + 'px',

                right: 'auto'

              });

              $('body').append(c);

            })

            .bind('mouseenter', function() {

              $this = $(this);

              $this.find('div.idletime').html(window.tte.getAfkTime($this.attr('id'))).show();

              $this.find('div.icons').hide();

              clearInterval(window.tte.timerHover);

              window.tte.timerHover = setInterval(function() {

                $this.find('div.idletime').html(window.tte.getAfkTime($this.attr('id')));

              }, 1000);

            })

            .bind('mouseleave', function() {

              $(this).find('div.idletime').hide();

              $(this).find('div.icons').show();

              clearInterval(window.tte.timerHover);

            });

    },

    appendChatMessage: function (f, a, h, j) {

      var e = this.nodes.chatLog;

      var g = (e.scrollTop + $(e).height() + 20 >= e.scrollHeight);

      var b = util.buildTree(Room.layouts.chatMessage);

      var i = this;

      $(b).find(".speaker").text(a).click(function (e) {

        if(window.tte.ui.settings.showChatAvatarTooltip)

          window.tte.ttRoomObjs.toggle_tipsy(f);

        var l = Room.layouts.guestOptions(window.tte.ttObj.users[f], window.tte.ttObj);

        delete l[3];

        l[2].splice(4, 0, [

          'a.guestOption',

          {

            event: {click: function() {

              window.tte.eventManager.queue({api: 'getNote', userid: f}, function(response) {

                var $html = $(util.buildTree(

                  ["div.modal", {},

                    ["div.close-x", {event: {click: util.hideOverlay}}],

                    ["h1", "Set User Note"],

                    ["br"],

                    ["div", {}, "Enter any information you would like about this user below."],

                    ["br"],

                    ["textarea#userNoteField.textarea", {maxlength: 400} ],

                    ["br"], ["br"],

                    ["div.ok-button.centered-button", {event: {click: function() {

                            var val = $('#userNoteField').val();

                            window.tte.eventManager.queue({api: 'setNote', userid: f, note: val});

                            util.hideOverlay();

                          }

                        }

                      }

                    ]

                  ]

                ));

                $html.find('#userNoteField').val(response.note);

                util.showOverlay($html);

              });

              $('div.guestOptionsContainer').remove();

            }},

            href: '#'

          },

          'Set Note'

        ]);

        var c = $(util.buildTree(l)).css({

          top: $(this).offset().top + 'px',

          left: $(this).offset().left + 'px',

          right: 'auto'

        });

        $('body').append(c);

      });

      

      var list = window.tte.ttObj.users[window.tte.ttObj.selfId].name,

          c = $(b).find(".text");

      $.each(window.tte.ui.settings.notifierKeywords, function(i, v) {

        if(v != undefined && v.length > 0)

          list += '|' + v;

      });

      if(h.search(new RegExp(list, 'i')) >= 0)

        $(b).addClass('mention');

      

      h = util.stripComboDiacritics(h);

      if (h.length > 446) {

          c.attr("title", h.substr(0, 2) == ": " ? h.substr(2) : h);

          h = h.substr(0, 440) + "...";

      }

      c.html(util.messageFilter(h));

      if (j) {

          $(b).addClass(j);

      }

      $(e).append(b);

      if (g) {

          e.scrollTop += 9001;

      }

      var d = $(e).find(".message");

      if (d.length > 500) {

          d.slice(0, 2).remove();

      }

    },

    updateSongCount: function() {

      var count = 0;

      for(fid in turntable.playlist.songsByFid)

        count++;

      $('#totalSongs').html(count);

      return count;

    },

    sendNotification: function(title, text) {

      if(window.tte.ui.settings.notifications != 0 && $('html').hasClass('blur') && window.webkitNotifications.checkPermission() == 0) {

        var n = window.webkitNotifications.createNotification('', title, text);

        n.ondisplay = function() {setTimeout(function() {n.cancel()}, 10000);};

        //n.onclose = function() {  };

        n.show();

      }

    },

    toggleAnimations: function() {

      if(window.tte.ui.settings.animations) {

        window.tte.ui.settings.animations = false;

        window.tte.eventManager.queue({api: 'settings', code: 'set', settings: {animations: false}});

        window.tte.ui.setAnimations(false);

      }

      else {

        window.tte.ui.settings.animations = true;

        window.tte.eventManager.queue({api: 'settings', code: 'set', settings: {animations: true}});

        window.tte.ui.setAnimations(true);

      }

    },

    setAnimations: function(on) {

      if(on) {

        $('#tte-settings-menu-animations-icon').parent().find('div').first().css({backgroundImage: 'url(http://www.pinnacleofdestruction.net/tt/images/check.png)'});

        window.tte.ttRoomObjs.add_listener = window.tte.ttRoomObjs.__add_listener;

        delete window.tte.ttRoomObjs.__add_listener;

        for(var user in window.tte.ttObj.users)

          window.tte.ttObj.refreshRoomUser(window.tte.ttObj.users[user]);

      }

      else {

        $('#tte-settings-menu-animations-icon').parent().find('div').first().css({backgroundImage: 'url(http://www.pinnacleofdestruction.net/tt/images/cross.png)'});

        for(var listener in window.tte.ttRoomObjs.listeners)

          window.tte.ttRoomObjs.rem_listener({userid: listener});

        window.tte.ttRoomObjs.__add_listener = window.tte.ttRoomObjs.add_listener;

        window.tte.ttRoomObjs.add_listener = function() {return;}

      }

    },

    buddyListBuddy: function(d, g, f) {

      var b = ("roomName" in d && !f) ? ["div.room", { }, d.roomName] : "";

      var a = function() {

        d.fanof = true;

        var l = Room.layouts.guestOptions(d, window.tte.ttObj);

        delete l[3]; // delete arrow

        l[2].splice(2, 0, l[2].pop());

        var callback = l[2][2][1].event.click.prototype.constructor;

        l[2][2][1].event.click = function() {

          turntable.buddyList.toggle();

          var fcn = eval(callback);

          fcn();

        }

        // now remove unwanted options

        $.each(l[2], function(i, v) {

          if(i < 2) return;

          if(v[2] == "Make a Moderator" || v[2] == "Remove Moderator" || v[2] == "Boot User")

            delete l[2][i];

        });

        // add Go To Room item

        l[2].splice(4, 0, ["a#" + d.userid + ".guestOption", {event: {'click': function() {

          turntable.setPage(d.roomShortcut, d.roomId);

          $('div.guestOptionsContainer').remove();

          turntable.buddyList.toggle();

        }}, href: '#'}, "Go To Room"]);

        l[2].splice(4, 0, [

          'a.guestOption',

          {

            event: {click: function() {

              window.tte.eventManager.queue({api: 'getNote', userid: d.userid}, function(response) {

                var $html = $(util.buildTree(

                  ["div.modal", {},

                    ["div.close-x", {event: {click: util.hideOverlay}}],

                    ["h1", "Set User Note"],

                    ["br"],

                    ["div", {}, "Enter any information you would like about this user below."],

                    ["br"],

                    ["textarea#userNoteField.textarea", {maxlength: 400} ],

                    ["br"], ["br"],

                    ["div.ok-button.centered-button", {event: {click: function() {

                            var val = $('#userNoteField').val();

                            window.tte.eventManager.queue({api: 'setNote', userid: d.userid, note: val});

                            util.hideOverlay();

                          }

                        }

                      }

                    ]

                  ]

                ));

                $html.find('#userNoteField').val(response.note);

                util.showOverlay($html);

              });

              $('div.guestOptionsContainer').remove();

            }},

            href: '#'

          },

          'Set Note'

        ]);

        

        // add favorite item

        if($.inArray(d.userid, window.tte.ui.settings.favorites) >= 0) {

          l[2].splice(4, 0, ["a#" + d.userid + ".guestOption", {event: {'click': function() {

            var userid = $(this).attr('id');

            window.tte.eventManager.queue({api: 'favorite.remove', 'userid': userid});

            window.tte.ui.settings.favorites.splice($.inArray(userid, window.tte.ui.settings.favorites), 1);

            $('div.guestOptionsContainer').remove();

            $('#buddyList #bl' + $(this).attr('id')).removeClass('favorite');

            window.turntable.fetchBuddyPresence();

          }}, href: '#'}, "Un-Favorite User"]);

        }

        else {

          l[2].splice(4, 0, ["a#" + d.userid + ".guestOption", {event: {'click': function() {

            var userid = $(this).attr('id');

            window.tte.eventManager.queue({api: 'favorite.add', 'userid': userid});

            window.tte.ui.settings.favorites.push(userid);

            $('div.guestOptionsContainer').remove();

            $('#buddyList #bl' + $(this).attr('id')).addClass('favorite').find('div.name').append(' \u2605').end().prependTo($('#buddyList'));

          }}, href: '#'}, "Favorite User"]);          

        }

  

        var c = $(util.buildTree(l)).css({

          top: $(this).offset().top + 'px',

          left: $(this).offset().left + 'px',

          right: 'auto'

        });

        $('body').append(c);

      };

      

      var e = (f) ? "overflowListItem" : "buddy" + d.userid;

      var c;

      if("fbid" in d) {

        c = "https://graph.facebook.com/" + d.fbid + "/picture";

      }

      else {

        if("twitterid_lower" in d) {

          c = "https://api.twitter.com/1/users/profile_image?screen_name=" + d.twitterid_lower + "&size=normal";

        }

        else {

          c = "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/avatars/" + d.avatarid + "/scaled/55/headfront.png";

        }

      }

      return ["li#bl" + d.userid + "#" + e + ".buddy", {

          event: {

            click: a,

            mouseover: function() {

              $(this).addClass("hover");

            },

            mouseout: function() {

              $(this).removeClass("hover");

            }

          }

        },

        ["div.avatar", { }, ["img", {

          src: c,

          height: "20"

        }]],

        ["div.user", { }, ["div.name", { }, (($.inArray(d.userid, window.tte.ui.settings.favorites) >= 0) ? (d.name + ' \u2605') : d.name)],b],

        ["div##status" + d.userid + ".status." + d.status]

      ];

    },

    setDisplay: function(type, change) {

      var $outer = $('#outer'),

          $turntable = $('#turntable'),

          $roomView = $turntable.find('div.roomView'),

          $room = $($turntable.find('div.roomView > div')[1]),

          $topPanel = $('#top-panel'),

          $right = $('#right-panel'),

          height = $room.height(),

          width = $room.width();



      switch(type) {

        case -1:

          // remove share buttons only if in this view

          $topPanel.find('div.share-on').hide();

          if(change) {

            // rebind scroll events

            $(".chatHeader").mousedown(window.tte.ttObj.chatResizeStart);

            

            // move chat window back inside right-panel container

            var $chatContainer = $roomView.find('div.chat-container').css({top: '258px', left: '', 'height': '345px'});

            $chatContainer.find('div.messages').css({'height': '283px'});

            $chatContainer.appendTo($right);

            

            // update user list

            var $userContainer = $roomView.find('div.guest-list-container').css({top: '258px', left: '', 'height': '345px'});

            $userContainer.find('div.guests').css({'height': '283px'});

            $userContainer.appendTo($right);

            

            // update sizes on DJ Queue window

            var $playlist = $('#playlist');

            var $view = $playlist.find('div.mainPane');

            $playlist.height(259);

            $view.height(259);

            $view.find('div.songlist').height(166);

            $playlist.find('div.chatBar').remove();

          }

          break;

          

        case 0:

          // 3 Column

          if(change)

            window.tte.ui.setDisplay(-1, true);

          

          // unbind default events

          $(".chatHeader").unbind('mousedown');

          

          // move chat window outside panel container

          var $chatContainer = $right.find('div.chat-container').css({top: '99px', left: width+'px', 'height': height+'px'});

          $chatContainer.find('div.messages').css({'height': (height-62)+'px'});

          $chatContainer.appendTo($roomView);



          // update sizes on DJ Queue window

          var $playlist = $('#playlist');

          var $view = $playlist.find('div.mainPane');

          $playlist.height(height).parent().parent().height(height);

          $view.height(height-25-36);

          $view.find('div.songlist').height(height-25-68-36);

          if(!$('#totalSongs').length) {

            $playlist.append('<div class="chatBar"><div class="guestListSize"><span id="totalSongs">0</span> songs in your queue.</div></div>');

            if(window.tte.ui.updateSongCount() == 0)

              setTimeout(function() {window.tte.ui.updateSongCount();}, 10000);

          }



          // update user list

          var $userContainer = $right.find('div.guest-list-container').css({top: '99px', left: (width+307)+'px', 'height': height+'px'});

          $userContainer.find('div.guests').css({'height': (height-62)+'px'});

          $userContainer.appendTo($roomView);

          break;

          

        case 1:

          // Queue & Guest list stacked

          

          if(change)

            window.tte.ui.setDisplay(-1, true);

          

          // unbind default events

          $(".chatHeader").unbind('mousedown');

          

          // move chat window outside panel container

          var $chatContainer = $right.find('div.chat-container').css({top: '99px', left: width+'px', 'height': height+'px'});

          $chatContainer.find('div.messages').css({'height': (height-62)+'px'});

          $chatContainer.appendTo($roomView);



          // update sizes on DJ Queue window

          var $playlist = $('#playlist');

          var $view = $playlist.find('div.mainPane');

          $playlist.height(301).parent().parent().height(height);

          $view.height(301-25-36);

          $view.find('div.songlist').height(301-25-68-36);

          if(!$('#totalSongs').length) {

            $playlist.append('<div class="chatBar"><div class="guestListSize"><span id="totalSongs">0</span> songs in your queue.</div></div>');

            if(window.tte.ui.updateSongCount() == 0)

              setTimeout(function() {window.tte.ui.updateSongCount();}, 10000);

          }



          // update user list

          var $userContainer = $right.find('div.guest-list-container').css({top: '300px', 'height': '302px'});

          $userContainer.find('div.guests').css({'height': (height-301-62)+'px'});

          break;

          

        case 2:

          // Queue & Chat Stacked

          

          if(change)

            window.tte.ui.setDisplay(-1, true);

          

          // unbind default events

          $(".chatHeader").unbind('mousedown');

          

          // move chat window outside panel container

          var $chatContainer = $right.find('div.chat-container').css({top: '300px', 'height': '302px'});

          $chatContainer.find('div.messages').css({'height': (height-301-62)+'px'});



          // update sizes on DJ Queue window

          var $playlist = $('#playlist');

          var $view = $playlist.find('div.mainPane');

          $playlist.height(301).parent().parent().height(height);

          $view.height(301-25-36);

          $view.find('div.songlist').height(301-25-68-36);

          if(!$('#totalSongs').length) {

            $playlist.append('<div class="chatBar"><div class="guestListSize"><span id="totalSongs">0</span> songs in your queue.</div></div>');

            if(window.tte.ui.updateSongCount() == 0)

              setTimeout(function() {window.tte.ui.updateSongCount();}, 10000);

          }



          // update user list

          var $userContainer = $right.find('div.guest-list-container').css({top: '99px', left: width+'px', 'height': height+'px'});

          $userContainer.find('div.guests').css({'height': (height-62)+'px'});

          $userContainer.appendTo($roomView);

          break;

      }

      if(type >= 0)

        $topPanel.find('div.share-on').show();

    },

    lastValidCommaIndex: function (a) {

      var c = a.split(",");

      if (c.length > 1) {

        for (var b = c.length - 1; b >= 0; b--) {

          if (c[b].length)

            return (c.slice(0, b).join(",").length + 1);

        }

        if (c[0] == "")

          return 0;

      }

      return -1;

    },

    chooseSuggestedName: function (a, b) {

      if (!b) return;

      if (!a) a = $("#tteSpotSavingUsers")[0];

      if (b[0] == ",") b = b.slice(1);

      var e = a.value.substring(0, a.selectionEnd),

          f = a.value.substring(a.selectionEnd),

          d = window.tte.ui.lastValidCommaIndex(e);

      if(d < 0) d = 0;

      var c = e.slice(0, d + ((a.value[d] != " ") ? 0 : 1)) + b + ", ";

      $(a).val(c + f);

      a.selectionEnd = c.length;

      window.tte.ttObj.cancelNameSuggest();

    },

    addModTools: function() {

      $('#tte-settings-menu-moderation').remove();

      if(window.tte.ttObj.isMod()) {

        $('#menuh').find('div.menuItem').last().before('<div id="tte-settings-menu-moderation" class="menuItem">Room Moderation</div>');

        $('#tte-settings-menu-moderation').bind('click', function() {

          var settings = $(util.buildTree(

            ["div#tteui-settings.settingsOverlay.modal", {},

              ["div.close-x", {event: {click: util.hideOverlay}}],

              ["h1", "Room Moderation"],

              ["br"],

              ["div.spots", {} ],

              ["div.save-changes.centered-button", {event: {

                click: function() {

                  window.tte.spotSaving.spot_saving = ($('#tteui-settings input#tteSpotSaving')[0].checked);

                  window.tte.spotSaving.boot_msg = $('#tteui-settings input#tteSpotSavingBootMessage').val();

                  window.tte.settings.boot_linkers = ($('#tteui-settings input#tteBootRoomLinkers')[0].checked);



                  window.tte.spotSaving.spot_users = [];

                  var usersRaw = $('#tteSpotSavingUsers').val().split(',');

                  for(var i = 0; i < usersRaw.length; i++) {

                    var user = $.trim(usersRaw[i]);

                    if(user != "")

                      window.tte.spotSaving.spot_users.push(user);

                  }



                  util.hideOverlay();

                }

              }}],

              ["br"]

            ]

          ));



          var spots = settings.find('div.spots:first').append('<div><label for="tteBootRoomLinkers"><span class="tteOptionLabel">Boot Room Linkers?</span> <input type="checkbox" id="tteBootRoomLinkers" value="1"' + ((window.tte.settings.boot_linkers) ? 'checked' : '') + '><p>If enabled, will automatically boot non-mods from the room for linking to other Turntable.fm rooms.</p></label></div>'

          + '<div><label for="tteSpotSaving"><span class="tteOptionLabel">Save Spots?</span> <input type="checkbox" id="tteSpotSaving" value="1"' + ((window.tte.spotSaving.spot_saving) ? 'checked' : '') + '><p>Spot saving allows you to moderate who gets up on stage. If enabled, any of the usernames you list below will be allowed on deck, and anyone else who tries to get up will be automatically booted off stage.</p></label></div>'

          + '<div><span class="tteOptionLabel">Usernames:</span> <input type="text" id="tteSpotSavingUsers" /><p>Use commas to separate multiple names. Use two "@"s for names that start with them.</p></div>'

          + '<div><span class="tteOptionLabel">Boot Message:</span> <input type="text" id="tteSpotSavingBootMessage" /></div>');



          // build list

          spots.find('#tteSpotSavingBootMessage').val(window.tte.spotSaving.boot_msg)

          .end().find('#tteSpotSavingUsers').val(window.tte.spotSaving.spot_users.join(', '))

          .keydown(function(event) {

            var d = event;

            var a = d.target;

            var b = d.charCode || d.keyCode;

            if (window.tte.suggestedSpotSavingUser) {

              if (b == 13 || b == 9) {

                window.tte.ui.chooseSuggestedName(a, window.tte.suggestedSpotSavingUser);

                return false;

              } else if (b == 38) {

                var f = $(".suggestedName.selected").prev();

                if (f.length)

                  window.tte.suggestedSpotSavingUser = $(".suggestedName.selected").removeClass("selected").prev().addClass("selected").text();

                return false;

              } else if (b == 40) {

                var c = $(".suggestedName.selected").next();

                if (c.length)

                  window.tte.suggestedSpotSavingUser = $(".suggestedName.selected").removeClass("selected").next().addClass("selected").text();

                return false;

              } else if (b == 27 || (b == 39 && a.selectionEnd == a.value.length)) {

                window.tte.ttObj.cancelNameSuggest();

                return false;

              }

            }

          });



          window.tte.suggestedSpotSavingUser = false;

          spots.find('#tteSpotSavingUsers').keyup(function(c) {

            var g = c.target,

                h = c.charCode || c.keyCode,

                j = window.tte.ttObj;

            if (h == 38 || h == 40 || h == 27 || (h == 39 && g.selectionEnd == g.value.length)) return;

            

            var k = g.value.substring(0, c.target.selectionEnd),

                i = window.tte.ui.lastValidCommaIndex(k),

                b = k.toLowerCase();

            if (i >= 0)

              b = k.slice(i).toLowerCase();

            

            b = b.trim();

            

            $("#nameSuggest").remove();

            window.tte.suggestedSpotSavingUser = false;

            var f = [];

            $.each(window.tte.ttObj.users, function(x) {

              if (this.name.toLowerCase().slice(0, -1).indexOf(b) == 0)

                f.push(this.name);

            });

            if (f.length) {

              window.util.alphabetize(f);

              var a = window.util.buildTree(window.Room.layouts.nameSuggest(f));

              window.tte.suggestedSpotSavingUser = f[0];

              $("div.settingsOverlay").append(a);

              console.log("appending");

              var d = $("#tteSpotSavingUsers").position();

              $(a).css({

                left: d.left + 1 + "px",

                top: d.top + 1 - $(a).outerHeight() + "px"

              });

              $(".suggestedName").click(function(l) {

                window.tte.ui.chooseSuggestedName(false, $(l.target).text());

              }).mouseover(function(l) {

                if (!$(this).hasClass("selected")) {

                  window.tte.suggestedSpotSavingUser = $(this).text();

                  $(".suggestedName.selected").removeClass("selected");

                  $(this).addClass("selected");

                }

              });

            }

            return true;

          });



          util.showOverlay(settings);

        });

      }

    }

  };

  

  window.tte.ui.init = function() {

    for(var prop in window.turntable) {

      if(window.turntable[prop] != undefined && window.turntable[prop].hasOwnProperty('currentDj'))

        window.tte.ttObj = window.turntable[prop];

    }

    for(var prop in window.tte.ttObj) {

      if(prop.indexOf('Callback') >= 0 && prop != 'sampleCallback') {

        window.tte.callback = window.tte.ttObj[prop];

        break;

      }

    }

    for(var prop in window.tte.ttObj) {

      if(window.tte.ttObj[prop] != undefined && window.tte.ttObj[prop].hasOwnProperty('div'))

        window.tte.ttRoomObjs = window.tte.ttObj[prop];

    }

    

    if(window.tte.ttObj === null) {

      if(window.tte.attempts < 20) {

        window.tte.attempts++;

        return setTimeout(function() {window.tte.ui.init()}, 1000);

      }

      else

        return alert('Could not find turntable.fm objects. You should refresh your page and try again.');

    }

    window.tte.attempts = 0;

    window.tte.init();



    window.tte.socket = function (c, a) {

        if (c.api == "room.now") {

            return;

        }

        c.msgid = turntable.messageId;

        turntable.messageId += 1;

        c.clientid = turntable.clientId;

        if (turntable.user.id && !c.userid) {

            c.userid = turntable.user.id;

            c.userauth = turntable.user.auth;

        }

        var d = JSON.stringify(c);

        if (turntable.socketVerbose) {

            LOG(util.nowStr() + " Preparing message " + d);

        }

        var b = $.Deferred();

        turntable.whenSocketConnected(function () {

            if (turntable.socketVerbose) {

                LOG(util.nowStr() + " Sending message " + c.msgid + " to " + turntable.socket.host);

            }

            if (turntable.socket.transport.type == "websocket") {

                turntable.socketLog(turntable.socket.transport.sockets[0].id + ":<" + c.msgid);

            }

            turntable.socket.send(d);

            turntable.socketKeepAlive(true);

            turntable.pendingCalls.push({

                msgid: c.msgid,

                handler: a,

                deferred: b,

                time: util.now()

            });

        });

        return b.promise();

    }

    

    var $outer = $('#outer'),

        $turntable = $('#turntable'),

        $roomView = $turntable.find('div.roomView'),

        $room = $($turntable.find('div.roomView > div')[1]),

        $topPanel = $('#top-panel'),

        $right = $('#right-panel'),

        height = $room.height(),

        width = $room.width();



    // Set UI Title

    $('.playlist-container:first div.header-text:first').html('Turntable Enhanced');

    

    // rewrite guest list update function

    window.tte.ttObj.__updateGuestList = window.tte.ttObj.updateGuestList;

    window.tte.ttObj.updateGuestList = function() {return;};

    window.tte.ui.guestList();

    

    // add votes to top bar

    $('#top-panel div.votes').first().remove();

    window.tte.ui.votes = $('<div class="votes"><img src="http://www.pinnacleofdestruction.net/tt/images/arrow_down_red.png" alt="Lames" /> <span>0</span> <img src="http://www.pinnacleofdestruction.net/tt/images/arrow_up_green.png" alt="Awesomes" /> <span>' + window.tte.ttObj.upvoters.length + '</span> <img src="http://www.pinnacleofdestruction.net/tt/images/heart_votes.png" alt="Song Snags" /> <span>0</span></div>');

    $topPanel.find('div.info').append(window.tte.ui.votes);

    if(window.tte.ttObj.upvoters.length == 0) {

      setTimeout(function() {

        $(window.tte.ui.votes.find('span')[1]).html(window.tte.ttObj.upvoters.length);

        window.tte.ui.guestList();

      }, 2000);

    }



    // override set_dj_points

    window.tte.ttRoomObjs.set_dj_points = window.tte.ui.override_set_dj_points;

    

    turntable.addEventListener("message", window.tte.ui.listener);

    

    // setup AFK Timers

    for(var prop in window.tte.ttObj.users) {

      window.tte.isAfk(prop);

    }

    

    // update append Chat message function

    window.tte.ttObj.appendChatMessage = window.tte.ui.appendChatMessage;

    

    // add animations button to menu

    $('#tte-settings-menu-animations-icon').parent().remove();

    $('#menuh').find('div.menuItem').last().before('<div class="menuItem"><div class="settingsHead" id="tte-settings-menu-animations-icon" /><div class="text">Animations</div></div>');

    $('#tte-settings-menu-animations-icon')

    .parent()

    .bind('click', function() {

      window.tte.ui.toggleAnimations(this);

    });

    

    // add moderation button to menu

    window.tte.ui.addModTools();

    

    // setup buddy list enhancements

    window.BuddyListPM.layouts.buddyListBuddy = window.tte.ui.buddyListBuddy;

    //window.turntable.buddyList._updateBuddies = window.turntable.buddyList.updateBuddies;

    window.turntable.buddyList.updateBuddies = function(f) {

      if (f.success == true) {

        $(this.nodes.buddyList).empty();

        var a = [],

            favs = [],

            e = {};

        if (f.rooms && f.rooms.length) {

          for (var g = 0, l = f.rooms.length; g < l; g++) {

            var c = f.rooms[g];

            if (c.length && c[1].length) {

              for (var d = 0, n = c[1].length; d < n; d++) {

                var b = c[1][d];

                b.roomName = c[0].name;

                b.roomShortcut = c[0].shortcut;

                b.roomId = c[0].roomid;

                ($.inArray(b.userid, window.tte.ui.settings.favorites) >= 0) ? favs.push(b) : a.push(b);

                e[b.userid] = b;

              }

            }

          }

          this.onlineBuddies = {};

          a = util.alphabetize(a, "name");

          favs = util.alphabetize(favs, "name");

          a = favs.concat(a);

          for (var g = 0, l = a.length; g < l; g++)

            this.addBuddy(a[g]);

        }

        else

          $(this.nodes.buddyList).append(util.buildTree(BuddyListPM.layouts.noBuddies));

          

        for (var g in this.pmWindows) {

          var k = this.pmWindows[g].otherUserId;

          if (k in e)

            this.pmWindows[g].updateStatus(e[k].status, false);

          else {

            var m = (turntable.user.fanOf.indexOf(k) >= 0);

            var h = (turntable.user.buddies.indexOf(k) >= 0);

            if (m || h)

              this.pmWindows[g].updateStatus("offline", false);

          }

        }

      }

      //window.turntable.buddyList._updateBuddies(f);

    }

    window.turntable.fetchBuddyPresence();

    

    // add settings button to menu

    $('#tte-settings-menu-settings').remove();

    $('#menuh').find('div.menuItem').last().before('<div id="tte-settings-menu-settings" class="menuItem">TTEnhanced</div>');

    $('#tte-settings-menu-settings').bind('click', function() {

      var settings = $(util.buildTree(

        ["div#tteui-settings.settingsOverlay.modal", {},

          ["div.close-x", {event: {click: util.hideOverlay}}],

          ["h1", "TTEnhanced UI Settings"],

          ["br"],

          ["div.fields", {} ],

          ["div.save-changes.centered-button", {event: {

            click: function() {

              var type = Number($('select#tteUiStyle').val());

              window.tte.ui.settings.notifications = ($('#tteui-settings input.tteNotifications')[1].checked);

              window.tte.ui.settings.showChatAvatarTooltip = ($('#tteui-settings input.tteAvatarToolTip')[1].checked);



              if(type != window.tte.ui.settings.displayType)

                window.tte.ui.setDisplay(type, true);

              window.tte.ui.settings.displayType = type;

              

              window.tte.ui.settings.notifierKeywords = [];

              var keywordsRaw = $('#tteChatKeywords').val().split(',');

              for(var i = 0; i < keywordsRaw.length; i++) {

                console.log(keywordsRaw[i]);

                var word = $.trim(keywordsRaw[i])

                if(word != "")

                  window.tte.ui.settings.notifierKeywords.push(word);

              }



              window.tte.eventManager.queue({api: 'settings', code: 'set', settings: window.tte.ui.settings});

              util.hideOverlay();

            }

          }}],

          ["br"]

        ]

      ));

      var fields = settings.find('div.fields:first');

      fields.append('<div><span class="tteOptionLabel">Desktop Notifications</span> <label for="tteNotificationsNo"><input type="radio" name="tteNotifications" id="tteNotificationsNo" class="tteNotifications" value="0" ' + ((window.tte.ui.settings.notifications) ? '' : 'checked') + '> No / <label for="tteNotificationsYes"><input type="radio" name="tteNotifications" class="tteNotifications" id="tteNotificationsYes" value="1" ' + ((window.tte.ui.settings.notifications) ? 'checked' : '') + '> Yes</div>');

      fields.append('<div><span class="tteOptionLabel">Avatar Tooltip</span> <label for="tteAvatarToolTipNo"><input type="radio" name="tteAvatarToolTip" id="tteAvatarToolTipNo" class="tteAvatarToolTip" value="0" ' + ((window.tte.ui.settings.showChatAvatarTooltip) ? '' : 'checked') + '> No / <label for="tteAvatarToolTipYes"><input type="radio" name="tteAvatarToolTip" class="tteAvatarToolTip" id="tteAvatarToolTipYes" value="1" ' + ((window.tte.ui.settings.showChatAvatarTooltip) ? 'checked' : '') + '> Yes<p>Will show a bubble over the users avatar in the crowd if you click on their username in the chat window (if animations are on).</p></div>');

      fields.append('<div><span class="tteOptionLabel">Display</span><select name="tteUiStyle" id="tteUiStyle"><option value="-1" ' + ((window.tte.ui.settings.displayType != -1) ? '' : 'selected') + '>Default</option><option value="0" ' + ((window.tte.ui.settings.displayType != 0) ? '' : 'selected') + '>3 Columns</option><option value="1" ' + ((window.tte.ui.settings.displayType != 1) ? '' : 'selected') + '>2 Columns - Queue/Guest Stacked</option><option value="2" ' + ((window.tte.ui.settings.displayType != 2) ? '' : 'selected') + '>2 Columns - Queue/Chat Stacked</option></select></div>');

      fields.append('<div><span class="tteOptionLabel">Notification Keywords:</span><input type="text" id="tteChatKeywords"/><p>If you would like to receive notifications for keywords other than your own username, you can enter them here -- comma delimited.</p></div>');

      

      settings.ready(function(){

        setTimeout("$('#tteChatKeywords').val(window.tte.ui.settings.notifierKeywords.join(','))",500);

      });

      

      util.showOverlay(settings);

    });

    

    // get settings from extension

    window.tte.eventManager.queue({api: 'settings', code: 'get'}, function(response) {

      // check if want notifications

      window.tte.ui.settings = $.extend(window.tte.ui.settings, response.settings);

      if(response.settings.notifications == -1 && window.webkitNotifications.checkPermission() == 1) {

        util.showOverlay(util.buildTree([

            "div.modal", {}, ["div.close-x",

            {

                event: {

                    click: util.hideOverlay

                }

            }], ["h1", "Add Chat Notifications"], ["br"], ["div.field",

            {}, "Would you like chat notifications to appear when someone says your name or private messages you?", ["br"]], ["div.ok-button.centered-button",

            {

                event: {

                    click: function() {

                      window.webkitNotifications.requestPermission();

                      window.tte.eventManager.queue({api: 'settings', code: 'set', settings: {notifications: 1}});

                      window.tte.ui.settings = 1;

                      util.hideOverlay();

                    }

                }

            }], ["p.cancel.no-thanks",

            {

                event: {

                    click: function() {

                      util.hideOverlay();

                      window.tte.eventManager.queue({api: 'settings', code: 'set', settings: {notifications: 0}});

                      window.tte.ui.settings = 0;

                    }

                },

                style: {

                    "padding-top": "10px"

                }

            }, "No"]]

        ));

      }

      if(!window.tte.ui.settings.animations)

        window.tte.ui.setAnimations(false);

      

      // update UI if necessary

      window.tte.ui.setDisplay(window.tte.ui.settings.displayType, false);

      

      // setup new version notifier

      if(window.tte.ui.version !== window.tte.ui.settings.currentVersion) {

        window.tte.eventManager.queue({api: 'set_version', version: window.tte.ui.version});

        var html = $(util.buildTree(

          ["div.modal", {},

            ["div.close-x", {event: {click: util.hideOverlay}}],

            ["h1", "New Version " + window.tte.ui.version + "!"],

            ["br"],

            ["div.field", {}, ''],

            ["div.ok-button.centered-button", {event: {click: util.hideOverlay}} ]

          ]

        ));

        html.find('div.field').html("See what's new in this version: <br /><br />" + window.tte.ui.newUpdatesMsg);

        util.showOverlay(html);

      }

    });

  }

  

  $(document).ready(function() {

    var wait = 0,

    roomCheck = setInterval(function() {

      wait++;

      if($($('#turntable').find('div.roomView > div')[1]).height() > 0) {

        window.tte.ui.init();

        clearInterval(roomCheck);

      }

      else if(wait > 10)

        clearInterval(roomCheck);

    }, 1000);

  });

}