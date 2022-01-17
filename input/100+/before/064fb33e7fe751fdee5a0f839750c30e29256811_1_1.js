function (expandedChat, layout, path) {
        var attachTo = (expandedChat === true) ? ".chat-container" : "#outer",
            bodyWidth = $('body').width(),
            outerWidth = $('#outer').width(),
            outerHeight = $('#outer').height()
            usersListLeft = (expandedChat === true) ? bodyWidth - 205 : (bodyWidth - outerWidth) / 2 + outerWidth;

         if ($('#ttpUsersList').length < 1) {
            $('<div id="ttpUsersList"><div class="ttpUsersListHeader"><span style="padding: 0 0 0 5px;">Votes: </span><span id="ttpRoomHearts" title="Number of Times Queued">0</span><span id="ttpRoomUpvotes" title="Awesomes">0</span><span id="ttpRoomDownvotes" title="Lames">0</span></div><div class="ttpBanner"><a href="' + path + 'settings.html" target="_blank"><img src="' + path + 'images/banner-logo.png" width="66" height="38" style="margin-left: 1px;" /></a><a href="#" id="ttp-allow-custom"><img src="' + path + 'images/script-add.png" width="19" height="18" class="ttpCusto" title="Allow Room Customizations" /></a><a href="#" id="ttp-disable-custom"><img src="' + path + 'images/script-remove.png" width="19" height="18" class="ttpCusto" title="Disable Room Customizations" /></a><a href = "#" id="ttp-stop-animation"><img src="' + path + 'images/noAnimation.png" width="20" height="23" style="margin-left:40px; margin-bottom:8px;"id="ttpAnimation" title="Toggle Animations" /></a><img src="' + path + 'images/banner-listeners.png" width="23" height="18" style="position:absolute;top:10px;right:38px;"><span id="ttpRoomListeners">0</span></div><div class="ttpUsersList"></div><div id="ttpUserSearch"><input type="text" placeholder="search users" /></div></div>').insertAfter(attachTo);

            $('#ttpUsersList .ttpUsersList').append('<div id="ttpUserActions"><span class="ttpUserActionsIdle">Idle: <span class="ttpIdleTime"></span></span><br /><span class="icon ttpFan" title="Fan"></span><span class="icon ttpProfile" title="View Profile"></span><span class="icon ttpTtdash" title="View Turntable Dashboard Profile"></span><span class="icon ttpAddMod" title="Grant Moderator Privileges"></span><span class="icon ttpIgnore" title="Ignore User"></span><span class="icon ttpBoot" title="Boot User"></span><span class="icon ttpRemoveDj" title="Remove DJ"></span></div>');

            $(window).click(function () {
                if ($('#ttpUserActions').css('display') === 'block') {
                    $('#ttpUserActions').slideUp(200, function () {
                        $('#ttpUsersList .ttpUsersList .ttpUser').removeClass('ttpUserSelected');
                    });
                }
            });


            // Edited By Nathan Follin 05/29/2012
            $('#ttp-stop-animation').on("click", function (e) {
                e.preventDefault();
                ttp.animations = !ttp.animations;

                // disable animations
                 if (ttp.animations === true) {
                    var a, c = null, b = null;
                    // store current functions
                    ttp.danceAnim = ttp.roommanager.add_animation_to;
                    ttp.speakAnim = ttp.roommanager.speak;

                    // remove dancing and speaking animations
                    ttp.roommanager.add_animation_to = $.noop;
                    ttp.roommanager.speak = $.noop;

                    // hide meter needle (animated movement)
                    $("#meterNeedle").hide();

                    // stop DJs from dancing
                    for (dj in ttp.roommanager.djs_uid) {
                        ttp.roommanager.djs_uid[dj][0].stop();
                    }

                    // stop listeners from dancing
                    for (listener in ttp.roommanager.listeners) {
                        ttp.roommanager.listeners[listener].stop();
                    }

                    // hide vibrating speaker animations
                    $("#top-panel").next().children("div").first().hide();

                    // replace animations icon
                    $("#ttpAnimation").attr("src", path + "images/animationOn.png");
                } else {
                    // re-enable animations
                    var a, c = null, b = null;

                    // replace dancing and speaking animations
                    ttp.roommanager.add_animation_to = ttp.danceAnim;
                    ttp.roommanager.speak = ttp.speakAnim;

                    // show meter needle (animated movement)
                    $("#meterNeedle").show();

                    // make DJ avatars dance (if current DJ or if upvoted)
                    for (dj in ttp.roommanager.djs_uid) {
                        if (dj === ttp.roominfo.currentDj){
                            ttp.roommanager.add_animation_to(ttp.roommanager.djs_uid[dj][0], 'bob');
                        }

                        if ($.inArray(dj, ttp.roominfo.upvoters) !== -1) {
                            ttp.roommanager.add_animation_to(ttp.roommanager.djs_uid[dj][0], 'rock');
                        }
                    }
                    
                    // make listeners dance (if upvoted)
                    for (listener in ttp.roommanager.listeners) {
                        if ($.inArray(listener, ttp.roominfo.upvoters) !== -1) {
                            ttp.roommanager.add_animation_to(ttp.roommanager.listeners[listener], 'rock');
                        }
                    }

                    // show vibrating speaker animation
                    $("#top-panel").next().children("div").first().show();

                    // replace animation icon
                    $("#ttpAnimation").attr("src", path + "images/noAnimation.png");
                }
            });

            $('#ttpUsersList .ttpUsersList .ttpUser').live('click', function (e) {
                e.stopPropagation();
                var selected = this,
                    userid   = $(selected).attr('id').substr(4),
                    username = $(selected).attr('ttpusername');
                $('#ttpUsersList .ttpUsersList .ttpUser').removeClass('ttpUserSelected');
                if ($(selected).next().attr('id') === 'ttpUserActions' && $('#ttpUserActions').css('display') === 'block') {
                    $('#ttpUserActions').slideUp(200);
                    return;
                }
                $(selected).addClass('ttpUserSelected');
                $('#ttpUserActions').slideUp(200, function () {
                    var moderators = (ttp.roominfo.moderators.length) ? new RegExp(ttp.roominfo.moderators.join("|"), "i") : false,
                        djs = (ttp.roominfo.djIds.length) ? new RegExp(ttp.roominfo.djIds.join("|"), "i") : false,
                        fanOf = (turntable.user.fanOf.length) ? new RegExp(turntable.user.fanOf.join("|"),"i") : false,
                        ignoredUsers = (ttp.roominfo.ignoredUsers.length) ? new RegExp(ttp.roominfo.ignoredUsers.join("|"), "i") : false;

                    $(this).find('.ttpFan,.ttpUnfan').hide();
                    $(this).find('.ttpProfile').unbind('click').click(function (e) {
                        e.stopPropagation();
                        var getProfile = $.Deferred(),
                            getPlacements = $.Deferred();
                        $.when(getProfile, getPlacements).done(ttp.roominfo.setupProfileOverlay);
                        ttp.request({api: "user.get_profile", userid: userid}, function(res) {
                            getProfile.resolve(res);
                        });
                        ttp.request({api: "sticker.get_placements", userid: userid}, function(res) {
                            var placements = {};
                            placements[userid] = res.placements;
                            $(document).trigger("add_sticker_placements", placements);
                            getPlacements.resolve(res);
                        });
                    });
                    $(this).find('.ttpTtdash').unbind('click').click(function (e) {
                        e.stopPropagation();
                        window.open('http://ttdashboard.com/user/uid/' + userid + '/');
                    });
                    if (turntable.user.id === userid) {
                        $(this).find('.ttpBoot,.ttpRemoveDj,.ttpAddMod,.ttpRemMod,.ttpIgnore,.ttpUnignore').hide();
                        $(selected).after($(this));
                        if (e.pageX && e.pageY) {
                            $(this).slideDown(400);
                        } else {
                            $(this).show();
                        }
                        e.stopPropagation();
                        return;
                    }
                    if (moderators && moderators.test(turntable.user.id) || +turntable.user.acl > 0) {
                        if (moderators.test(userid) && ttp.roominfo.users[userid] !== undefined && +ttp.roominfo.users[userid].acl === 0) {
                            $(this).find('.ttpAddMod').removeClass('ttpAddMod').addClass('ttpRemMod').prop('title', 'Remove Moderator Privileges');
                            $(this).find('.ttpRemMod').css('display', 'inline-block').unbind('click').click(function (e) {
                                e.stopPropagation();
                                ttp.request({
                                    api: "room.rem_moderator",
                                    roomid: ttp.roominfo.roomId,
                                    target_userid: userid
                                });
                                $(selected).find('.ttpMod').remove();
                                if ($(selected).hasClass('.ttpDj')) {
                                    $(selected).attr('ttpusertype', '40').attr('ttpusersort', '40' + username.toUpperCase());
                                } else if ($(selected).hasClass('.ttpFanned')) {
                                    $(selected).attr('ttpusertype', '50').attr('ttpusersort', '50' + username.toUpperCase());
                                } else {
                                    $(selected).attr('ttpusertype', '60').attr('ttpusersort', '60' + username.toUpperCase());
                                }
                                $('#ttpUsersList .ttpUsersList .ttpUser').sortElements(function (a, b) {
                                    return $(a).attr('ttpusersort') > $(b).attr('ttpusersort') ? 1 : -1;
                                });
                                $('#ttpUserActions').hide();
                                $(selected).click();
                            });
                        } else {
                            $(this).find('.ttpRemMod').removeClass('ttpRemMod').addClass('ttpAddMod').prop('title', 'Grant Moderator Priviliges');
                            $(this).find('.ttpAddMod').css('display', 'inline-block').unbind('click').click(function (e) {
                                e.stopPropagation();
                                ttp.request({
                                    api: "room.add_moderator",
                                    roomid: ttp.roominfo.roomId,
                                    target_userid: userid
                                });
                                $(selected).prepend('<span class="ttpMod" title="Moderator"></span>').attr('ttpusertype', '30').attr('ttpusersort', '30' + username.toUpperCase());
                                $('#ttpUsersList .ttpUsersList .ttpUser').sortElements(function (a, b) {
                                    return $(a).attr('ttpusersort') > $(b).attr('ttpusersort') ? 1 : -1;
                                });
                                $('#ttpUserActions').hide();
                                $(selected).click();
                            });
                        }
                        $(this).find('.ttpBoot').css('display', 'inline-block').unbind('click').click(function (e) {
                            e.stopPropagation();
                            util.showOverlay(util.buildTree(Room.layouts.bootConfirmView(ttp.roominfo.users[userid].name, function () {
                                var request = {
                                    api: "room.boot_user",
                                    roomid: ttp.roominfo.roomId,
                                    target_userid: userid
                                },
                                reason = $.trim($(".bootReasonField").val());
                                if (reason && reason !== "(optional)") {
                                    request.reason = reason;
                                }
                                ttp.request(request);
                                window.util.hideOverlay();
                            })));
                        });
                        if (userid === ttp.roominfo.creatorId) {
                            $(this).find('.ttpAddMod,.ttpRemMod').hide().unbind('click');
                        }
                        if (ttp.roominfo.users[userid] !== undefined && ttp.roominfo.users[userid].acl > 0) {
                            $(this).find('.ttpBoot').hide().unbind('click');
                        }
                        if (djs && djs.test(userid)) {
                            $(this).find('.ttpRemoveDj').css('display', 'inline-block').unbind('click').click(function (e) {
                                e.stopPropagation();
                                ttp.request({
                                    api: "room.rem_dj",
                                    roomid: ttp.roominfo.roomId,
                                    djid: userid
                                });
                                $(this).hide();
                            });
                        } else {
                            $(this).find('.ttpRemoveDj').hide();
                        }
                    } else {
                        $(this).find('.ttpBoot,.ttpRemoveDj,.ttpAddMod,.ttpRemMod').hide();
                    }
                    if (fanOf && fanOf.test(userid)) {
                        $(this).find('.ttpFan').removeClass('ttpFan').addClass('ttpUnfan').prop('title', 'Unfan');
                        $(this).find('.ttpUnfan').show().unbind('click').click(function (e) {
                            var x = 0,
                                length = turntable.user.fanOf.length;

                            e.stopPropagation();
                            for (; x < length; x += 1) {
                                if (turntable.user.fanOf[x] === userid) {
                                    turntable.user.fanOf.splice(x, 1);
                                    break;
                                }
                            }
                            ttp.roominfo.users[userid].fanof = false;
                            ttp.request({
                                api: "user.remove_fan",
                                djid: userid
                            });
                            $(selected).find('.ttpFanned').remove();
                            if ($(selected).attr('ttpusertype') === "50") {
                                $(selected).attr('ttpusertype', '60').attr('ttpusersort', '60' + username.toUpperCase());
                            }
                            $('#ttpUsersList .ttpUsersList .ttpUser').sortElements(function (a, b) {
                                return $(a).attr('ttpusersort') > $(b).attr('ttpusersort') ? 1 : -1;
                            });
                            $('#ttpUserActions').hide();
                            $(selected).click();
                        });
                    } else {
                        $(this).find('.ttpUnfan').removeClass('ttpUnfan').addClass('ttpFan').prop('title', 'Fan');
                        $(this).find('.ttpFan').show().unbind('click').click(function (e) {
                            e.stopPropagation();
                            turntable.user.fanOf.push(userid);
                            ttp.roominfo.users[userid].fanof = true;
                            ttp.request({
                                api: "user.become_fan",
                                djid: userid
                            });
                            $(selected).append('<span class="ttpFanned" title="You\'re a fan"></span>');
                            if ($(selected).attr('ttpusertype') === "60") {
                                $(selected).attr('ttpusertype', '50').attr('ttpusersort', '50' + username.toUpperCase());
                            }
                            $('#ttpUsersList .ttpUsersList .ttpUser').sortElements(function (a, b) {
                                return $(a).attr('ttpusersort') > $(b).attr('ttpusersort') ? 1 : -1;
                            });
                            $('#ttpUserActions').hide();
                            $(selected).click();
                        });
                    }
                    if (ignoredUsers && ignoredUsers.test(userid)) {
                        $(this).find('.ttpIgnore').removeClass('ttpIgnore').addClass('ttpUnignore').prop('title', 'Unignore User');
                        $(this).find('.ttpUnignore').show().unbind('click').click(function (e) {
                            var x = 0,
                                length = ttp.roominfo.ignoredUsers.length;

                            e.stopPropagation();
                            ttp.saveSettings({
                                unignoreUser: {
                                    userid: userid
                                }
                            });
                            for (; x < length; x += 1) {
                                if (ttp.roominfo.ignoredUsers[x] === userid) {
                                    ttp.roominfo.ignoredUsers.splice(x, 1);
                                }
                                ttp.roominfo.appendChatMessage(userid, ttp.roominfo.users[userid].name, " will be ignored no more.");
                            }
                            $('#ttpUserActions').hide();
                            $(selected).click();
                        });
                    } else {
                        $(this).find('.ttpUnignore').removeClass('ttpUnignore').addClass('ttpIgnore').prop('title', 'Ignore User');
                        $(this).find('.ttpIgnore').show().unbind('click').click(function (e) {
                            e.stopPropagation();
                            ttp.saveSettings({
                                ignoreUser: {
                                    userid: userid
                                }
                            });
                            ttp.roominfo.ignoredUsers.push(userid);
                            ttp.roominfo.appendChatMessage(userid, ttp.roominfo.users[userid].name, " will be ignored.");
                            $('#ttpUserActions').hide();
                            $(selected).click();
                        });
                    }
                    $(selected).after($(this));
                    if (e.pageX && e.pageY) {
                        $(this).slideDown(400);
                    } else {
                        $(this).show();
                    }
                });
            });

            $('#ttpUsersList .ttpUsersList .ttpUser').live('dblclick', function (e) {
                e.stopPropagation();
                ttp.roominfo.handlePM({senderid: $(this).attr('id').substr(4)}, true);
            });

            // add user search
            if ($('#ttpUserSearch').length > 0) {
                $('#ttpUserSearch input').keyup(function (e) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        e.stopPropagation();
                    } else {
                        if (window.ttpUserSearchTimeout !== undefined) {
                            window.clearTimeout(window.ttpUserSearchTimeout);
                            delete window.ttpUserSearchTimeout;
                        }
                        window.ttpUserSearchTimeout = window.setTimeout(function () {
                            var $users = $('#ttpUsersList .ttpUsersList .ttpUser'),
                                search = $('#ttpUserSearch input').val(),
                                searchTerm;

                            $users.show();
                            if ($('#ttpUsersList .ttpUsersList .ttpUser.ttpUserSelected').length > 0) {
                                $('#ttpUserActions').show();
                            }
                            if ($('#ttpUserSearch input').val() === '') {
                                return;
                            }
                            searchTerm = new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').replace(/\s/g, '.*'), 'i');
                            $users.each(function () {
                                if (!searchTerm.test($(this).attr('ttpusername'))) {
                                    $(this).hide();
                                    if ($(this).next().attr('id') === 'ttpUserActions') {
                                        $(this).next().hide();
                                    }
                                }
                            });
                        }, 200);
                    }
                });
            }
        }

        if (layout.users.width < 205) {
            $('#ttpUsersList').css({
                width: "200px",
                height: outerHeight + "px",
                position: "absolute",
                top: "0px",
                left: usersListLeft + "px"
            });
            $('#ttpUsersList .ttpUsersList').height(outerHeight - 99 + 'px');
        } else {
            $('#ttpUsersList').css({
                width: layout.users.width + "px",
                height: layout.users.height + "px",
                position: "absolute",
                top: layout.users.top + "px",
                left: layout.users.left + "px"
            });
            $('#ttpUsersList .ttpUsersList').height(layout.users.height - 99 + 'px');
        }

        return true;
    }