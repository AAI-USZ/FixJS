function(ajax) {
    try {
        var slice = ajax ? caap.tempAjax : caap.appBodyDiv, currentMonster = {}, time = [], tempDiv = $j(), tempText = '', tempArr = [], counter = 0, monstHealthImg = '', totalCount = 0, ind = 0, len = 0, searchStr = '', searchRes = $j(), achLevel = 0, maxDamage = 0, maxToFortify = 0, isTarget = false, KOBenable = false, KOBbiasHours = 0, KOBach = false, KOBmax = false, KOBminFort = false, KOBtmp = 0, KOBtimeLeft = 0, KOBbiasedTF = 0, KOBPercentTimeRemaining = 0, KOBtotalMonsterTime = 0,
        monsterDiv = $j("div[style*='dragon_title_owner'],div[style*='monster_header_'],div[style*='monster_'][style*='_header'],div[style*='boss_'][style*='_header'],div[style*='boss_header_']" + (config.getItem("festivalTower", false) ? ",div[style*='festival_monsters_top_']" : ""), slice), actionDiv = $j(), damageDiv = $j(), damageDivNew = false, monsterInfo = {}, targetFromfortify = {}, tStr = '', tNum = 0, tBool = false, fMonstStyle = '', nMonstStyle = '', nMonstStyle2 = '', id = 0, userName = '', mName = '', feedMonster = '', md5 = '',
        //page              = session.getItem('page', 'battle_monster'),
        page = $j(".game", ajax ? slice : caap.globalContainer).eq(0).attr("id").replace(caap.domain.id[caap.domain.which], ''), matches = true, ctaDiv = $j(), dragonDiv = $j(".dragonContainer", slice), dleadersDiv = $j("td:eq(1) div[style*='bold']:eq(0) div:last", dragonDiv), maxJoin = dleadersDiv.text().regex(/(\d+)/), countJoin = 0, it = 0, jt = 0, groups = {}, groupMatch = false, found = false;
            // new monster layout logic
        if (dleadersDiv.text() == '') {
            var dleadersDiv2 = $j("div[id*='leaderboard_0']")[0].children;
            maxJoin = dleadersDiv2[0].children[1].innerHTML.regex(/(\d+)/);
            /* this is the begining of logic that will loop through the leaders and count them for the X/Y stuff, not really important so I'm skipping it for now
            for (var ii = 1; ii < dleadersDiv2.length; ii++) {		// start at 1 to skip the title 'Damage Leaders:'
                if (dleadersDiv2[ii].children.length > 0) {
                    con.log (1, "dleadersDiv2 each", ii, dleadersDiv2[ii].children.length, dleadersDiv2[ii], dleadersDiv2[ii].innerHTML);
                }
            }*/
        } else {		// this is for monster still on the old style, Tower 1, Tower 2, Conquest
            con.log(3, "Damage Leaders", dleadersDiv.text(), maxJoin);
            tempDiv = $j("td[colspan='2']:contains('Levels'),td[colspan='2']:contains('Allies')", dragonDiv);
            if($u.hasContent(tempDiv)) {
                tempDiv.each(function(index) {
                    $j(this).parent().attr("id", "mark" + index);
                });

                tempDiv.each(function(index) {
                    var group = $j(this), levels = $j("b", group).text(), start = levels.regex(/Levels (\d+)/), max = group.text().trim().innerTrim().replace(levels, '').trim(), maxNum = max.regex(/(\d+)/), count = group.parent().nextUntil("#mark" + (index + 1)).find("a[href*='keep.php']").length;

                    con.log(3, "groups", index, levels, start, maxNum, count);
                    groups[levels] = {
                        'level' : start,
                        'max' : maxNum,
                        'count' : count
                    };
                    countJoin += count;
                    if(!feed.isScan && !ajax) {
                        group.html("<div><b>" + levels + "</b> [" + count + "/" + maxNum + " max]</div>");
                    }
                });
            } else {
                tempDiv = $j("table:eq(1) a", dragonDiv);
                countJoin = tempDiv.length;
            }
        }

        groups['total'] = {
            'max' : maxJoin,
            'count' : countJoin
        };
        con.log(3, "groups", groups);
        if(!feed.isScan && !ajax) {
            dleadersDiv.html("[" + countJoin + "/" + maxJoin + "max]");
        }

        if((feed.isScan || ajax) && $u.hasContent(feed.scanRecord['page']) && feed.scanRecord['page'] !== page) {
            page = feed.scanRecord['page'];
            con.log(2, "Page mismatch so using feed.scanRecord page", page, feed.scanRecord['page']);
            if(config.getItem("DebugLevel", 1) > 1) {
                $j().alert("Page mismatch so using feed.scanRecord page<br />" + page + '<br />' + feed.scanRecord['page']);
            }
        }

        con.log(3, "GAME PAGE", page);
        if(!feed.isScan && !ajax) {
            battle.checkResults();
            if(config.getItem("enableTitles", true)) {
                spreadsheet.doTitles();
            }

            caap.chatLink(slice, "#" + caap.domain.id[caap.domain.which] + "chat_log div[style*='hidden'] div[style*='320px']");
        }

        con.log(4, "monsterDiv", monsterDiv);
        if($u.hasContent(monsterDiv)) {
            fMonstStyle = monsterDiv.attr("style").regex(/(festival_monsters_top_\S+\.jpg)/);
            con.log(2, "fMonstStyle", fMonstStyle);
            if(!$u.hasContent(fMonstStyle)) {
                nMonstStyle = monsterDiv.attr("style").regex(new RegExp(".+\\/(.+_header_\\S+\\.jpg)"));
                nMonstStyle2 = monsterDiv.attr("style").regex(new RegExp(".+\\/(.+_header.jpg)"));
                con.log(2, "nMonstStyle", nMonstStyle);
            }

            if($u.hasContent(fMonstStyle) || $u.hasContent(nMonstStyle) || $u.hasContent(nMonstStyle2)) {
                tempDiv = monsterDiv.find(":contains('summoned'):last,:contains('Summoned'):last");
                if($u.hasContent(fMonstStyle)) {
                    tempText = $u.setContent(tempDiv.text(), '').trim().innerTrim().replace(/summoned/i, monster.getFestName(fMonstStyle));
                } else {
                    if($u.hasContent(nMonstStyle)) {
                        tempText = $u.setContent(tempDiv.text(), '').trim().innerTrim().replace(/ summoned/i, "'s " + monster.getNewName(nMonstStyle));
                    } else {
                        tempText = $u.setContent(tempDiv.text(), '').trim().innerTrim().replace(/ summoned/i, "'s " + monster.getNewName(nMonstStyle2));
                    }
                }
            } else {
                // old pages - shouldn't exist any more
                tempText = $u.setContent(monsterDiv.children(":eq(2)").text(), '').trim().innerTrim();
            }

            con.log(3, "tempText", tempText);
        } else {
            monsterDiv = $j("div[style*='nm_top']", slice);
            if($u.hasContent(monsterDiv)) {
                tempText = $u.setContent(monsterDiv.children(":eq(0)").children(":eq(0)").text(), '').trim().innerTrim();
                tempDiv = $j("div[style*='nm_bars']", slice);
                if($u.hasContent(tempDiv)) {
                    tempText += ' ' + $u.setContent(tempDiv.children(":eq(0)").children(":eq(0)").children(":eq(0)").siblings(":last").children(":eq(0)").text(), '').trim().replace("'s Life", "");
                } else {
                    con.warn("Problem finding nm_bars");
                    return;
                }
            } else {
                if($u.hasContent(fMonstStyle)) {
                    $j().alert(fMonstStyle + "<br />I do not know this monster!<br />Please inform me.");
                }

                if($u.hasContent($j("div[style*='no_monster_back.jpg']", slice))) {
                    con.log(2, "No monster");
                } else {
                    con.warn("Problem finding dragon_title_owner and nm_top");
                }

                feed.checked(monster.getItem(''));
                return;
            }
        }

        if($u.hasContent(monsterDiv)) {
            id = $u.setContent($j("input[name*='casuser']", $j("form[onsubmit*='newsFeed']"))[0].value, '');
            id = $u.setContent(id, $j("img[src*='profile.ak.fbcdn.net']", monsterDiv).attr("uid"), '').regex(/(\d+)/);
            id = $u.setContent(id, $u.setContent($j(".fb_link[href*='profile.php']", monsterDiv).attr("href"), '').regex(/id=(\d+)/));
            id = $u.setContent(id, $u.setContent($j("img[src*='graph.facebook.com']", monsterDiv).attr("src"), '').regex(/\/(\d+)\//));
            id = $u.setContent(id, $u.setContent($j("button[onclick*='ajaxSectionUpdate']", slice).attr("onclick") + "", '').regex(/user=(\d+)/));
            if ($j("input[name*='guild_creator_id']").length > 0)
                id = $u.setContent(id, $j("input[name*='guild_creator_id']")[0].value);
            id = $u.setContent(id, (feed.isScan || ajax) ? feed.scanRecord['id'] : 0);
            con.log(3, "USER ID", id);
            if(id === 0 || !$u.hasContent(id)) {
                con.warn("Unable to get id!");
                if(config.getItem("DebugLevel", 1) > 1) {
                    $j().alert("Unable to get id!");
                }

                if(feed.isScan || ajax) {
                    feed.checked(monster.getItem(''));
                }

                return;
            }

            if(/Aurelius, Lion's Rebellion/.test(tempText)) {
                feedMonster = "Aurelius, Lion's Rebellion";
                userName = tempText.replace(feedMonster, '').trim();
            } else {
                feedMonster = tempText.replace(new RegExp(".+'s (.+)$"), '$1');
                userName = tempText.replace(feedMonster, '').trim();
                feedMonster = feedMonster.trim().innerTrim().toLowerCase().ucWords();
            }

            if(!$u.hasContent(feedMonster)) {
                con.warn("Unable to get monster string!!");
            }

            if(id === caap.stats['FBID']) {
                con.log(2, "Your monster found", tempText);
                userName = 'Your';
            }
        } else {
            con.warn("checkResults_viewFight monsterDiv issue!");
        }
        mName = userName + ' ' + feedMonster;
        con.log(2, "Monster name", mName);
        if(feed.isScan || ajax) {
            if(feed.scanRecord['id'] !== id) {
                con.warn("User ID doesn't match!");
                if(config.getItem("DebugLevel", 1) > 1) {
                    $j().alert("User ID doesn't match!<br />" + id + '<br />' + feed.scanRecord['id']);
                }
                matches = false;
            }

            if(feed.scanRecord['monster'] !== feedMonster) {
                con.warn("Monster doesn't match!");
                if(config.getItem("DebugLevel", 1) > 1) {
                    $j().alert("Monster doesn't match!<br />" + feed.scanRecord['monster'] + '<br />' + feedMonster);
                }
                matches = false;
            }

            if(!feed.scanRecord['url'].hasIndexOf(page)) {
                con.warn("Page doesn't match!");
                if(config.getItem("DebugLevel", 1) > 1) {
                    $j().alert("Page doesn't match!<br />" + page + '<br />' + feed.scanRecord['url']);
                }
                matches = false;
            }

            if(!matches) {
                feed.checked(monster.getItem(''));
            }
        }
        md5 = (id + ' ' + feedMonster + ' ' + page).toLowerCase().MD5();
        if((feed.isScan || ajax) && matches && feed.scanRecord['md5'] !== md5) {
            con.warn("MD5 mismatch!", md5, feed.scanRecord['md5']);
            if(config.getItem("DebugLevel", 1) > 1) {
                $j().alert("md5 mismatch!<br />" + md5 + '<br />' + feed.scanRecord['md5']);
            }

            throw "MD5 mismatch!";
        }
        currentMonster = monster.getItem(md5);
        currentMonster['save'] = true;
        if((!$u.hasContent(currentMonster['userId']) || currentMonster['userId'] === 0) && $u.hasContent(id) && id !== 0) {
            currentMonster['userId'] = id;
            con.log(3, "Set monster id", currentMonster['userId']);
        }

        if(!$u.hasContent(currentMonster['name']) && $u.hasContent(mName)) {
            currentMonster['name'] = mName;
            con.log(3, "Set monster name", currentMonster['name']);
        }

        if(!$u.hasContent(currentMonster['monster']) && $u.hasContent(feedMonster)) {
            currentMonster['monster'] = feedMonster;
            con.log(3, "Set monster monster", currentMonster['monster']);
        }

        if(!$u.hasContent(currentMonster['userName']) && $u.hasContent(userName)) {
            currentMonster['userName'] = userName;
            con.log(3, "Set monster userName", userName);
        }

        if(!$u.hasContent(currentMonster['md5'])) {
            currentMonster['md5'] = md5;
            con.log(3, "Set monster md5", currentMonster['md5']);
        }

        if(!$u.hasContent(currentMonster['page']) && $u.hasContent(page)) {
            currentMonster['page'] = page;
            con.log(3, "Set monster page", page);
        }

        if(!$u.hasContent(currentMonster['feedLink'])) {
            if(feed.isScan || ajax) {
                currentMonster['save'] = false;
                currentMonster['feedLink'] = feed.scanRecord['url'];
                con.log(3, "Set monster feedLink ajax", currentMonster['feedLink']);
            } else {
                feed.scanRecord = feed.getItem(md5);
                if(feed.scanRecord) {
                    currentMonster['feedLink'] = feed.scanRecord['url'];
                    con.log(3, "Set monster feedLink from feed.scanRecord", currentMonster['feedLink']);
                } else {
                    currentMonster['feedLink'] = page + '.php?';
                    currentMonster['feedLink'] += page !== 'festival_battle_monster' ? 'twt2&' : '';
                    currentMonster['feedLink'] += 'causer=' + id;
                    ctaDiv = $j("input[name*='help with']", slice).parents("form").eq(0);
                    tStr = $j("input[name='mpool']", ctaDiv).attr("value");
                    currentMonster['feedLink'] += $u.hasContent(tStr) ? '&mpool=' + tStr.parseInt() : '';
                    tStr = $j("input[name='mid']", ctaDiv).attr("value");
                    currentMonster['feedLink'] += $u.hasContent(tStr) ? '&mid=' + tStr : '';
                    con.log(2, "Set monster feedLink", currentMonster['feedLink']);
                    /*
                     if (config.getItem("DebugLevel", 1) > 1) {
                     $j().alert("Set monster feedLink<br />" + currentMonster['feedLink']);
                     }
                     */
                }
            }
        }

        if($u.hasContent(currentMonster['feedLink'])) {
            tNum = currentMonster['feedLink'].regex(/mpool=(\d+)/);
            currentMonster['mpool'] = $u.hasContent(tNum) ? '&mpool=' + tNum : '';
            tStr = currentMonster['feedLink'].regex(/mid=(\S+)[&]*/);
            currentMonster['mid'] = $u.hasContent(tStr) ? '&mid=' + tStr : '';
            tNum = currentMonster['feedLink'].regex(/rix=(\d+)/);
            currentMonster['rix'] = $u.hasContent(tNum) ? tNum : -1;
        }

        currentMonster['hide'] = false;
        currentMonster['fImg'] = $u.setContent(fMonstStyle, '');
        currentMonster['type'] = $u.setContent(currentMonster['type'], '');
        monsterInfo = monster.getInfo(currentMonster);
        con.log(2, "monsterInfo", currentMonster['monster'], monsterInfo);
        if($u.hasContent(monsterInfo.levels)) {
            for( it = 0; it < monsterInfo.levels.length; it += 1) {
                groupMatch = false;
                for(jt in groups) {
                    if(groups.hasOwnProperty(jt)) {
                        if(groups[jt]['level'] === monsterInfo.levels[it]) {
                            currentMonster['joinable']['group' + it] = groups[jt];
                            groupMatch = true;
                        }
                    }
                }

                if(!groupMatch) {
                    currentMonster['joinable']['group' + it] = {
                        'level' : monsterInfo.levels[it],
                        'max' : monsterInfo.join[it],
                        'count' : 0
                    };
                }
            }
        }

        currentMonster['joinable']['total'] = groups['total'];
        con.log(3, "Joinable", currentMonster['joinable']);
        if(currentMonster['monster'] === 'The Deathrune Siege') {
            tempDiv = $j("div[style*='raid_back']", slice);
            if($u.hasContent(tempDiv)) {
                if($u.hasContent($j("img[src*='raid_1_large.jpg']", tempDiv))) {
                    currentMonster['type'] = 'Raid I';
                } else if($u.hasContent($j("img[src*='raid_b1_large.jpg']", tempDiv))) {
                    currentMonster['type'] = 'Raid II';
                } else if($u.hasContent($j("img[src*='raid_1_large_victory.jpg']", tempDiv))) {
                    con.log(2, "Siege Victory!");
                    currentMonster['hide'] = true;
                    currentMonster['joinable'] = {};
                } else {
                    con.log(2, "Problem finding raid image! Probably finished.");
                    currentMonster['hide'] = true;
                    currentMonster['joinable'] = {};
                }

                con.log(2, "Raid Type", currentMonster['type']);
            } else {
                con.warn("Problem finding raid_back");
                return;
            }
        }

        currentMonster['review'] = Date.now();
        state.setItem('monsterRepeatCount', 0);
        // Extract info
        tempDiv = $j("#" + caap.domain.id[caap.domain.which] + "monsterTicker", slice);
        if($u.hasContent(tempDiv)) {
            time = $u.setContent(tempDiv.text(), '').regex(/(\d+):(\d+):(\d+)/);
        } else {
            if(caap.hasImage("dead.jpg")) {
                currentMonster['hide'] = true;
                currentMonster['joinable'] = {};
            } else {
                con.warn("Could not locate Monster ticker.");
            }
        }

        if($u.hasContent(time) && time.length === 3 && monsterInfo && monsterInfo.fort) {
            currentMonster['fortify'] = currentMonster['type'] === "Deathrune" || currentMonster['type'] === 'Ice Elemental' ? 100 : 0;
            switch (monsterInfo.defense_img) {
                case 'bar_dispel.gif' :
                    tempDiv = $j("img[src*='" + monsterInfo.defense_img + "']", slice).parent();
                    if($u.hasContent(tempDiv)) {
                        currentMonster['fortify'] = (100 - tempDiv.getPercent('width')).dp(2);
                        tempDiv = tempDiv.parent().parent().siblings().eq(0).children().eq(0).children().eq(1);
                        found = true;
                    } else {
                        currentMonster['fortify'] = 100;
                        con.warn("Unable to find defense bar", monsterInfo.defense_img);
                    }

                    break;
                case 'seamonster_ship_health.jpg' :
                    tempDiv = $j("img[src*='" + monsterInfo.defense_img + "']", slice).parent();
                    if($u.hasContent(tempDiv)) {
                        currentMonster['fortify'] = tempDiv.getPercent('width').dp(2);
                        found = true;
                        if(monsterInfo.repair_img) {
                            found = false;
                            tempDiv = $j("img[src*='" + monsterInfo.repair_img + "']", slice).parent();
                            if($u.hasContent(tempDiv)) {
                                currentMonster['fortify'] = (currentMonster['fortify'] * (100 / (100 - tempDiv.getPercent('width')))).dp(2);
                                found = true;
                            } else {
                                currentMonster['fortify'] = 100;
                                con.warn("Unable to find repair bar", monsterInfo.repair_img);
                            }
                        }

                        if(found) {
                            tempDiv = tempDiv.parent().parent().siblings().eq(0).children().eq(0).children().eq(1);
                        }
                    } else {
                        currentMonster['fortify'] = 100;
                        con.warn("Unable to find defense bar", monsterInfo.defense_img);
                    }

                    break;
                case 'nm_green.jpg' :
                    tempDiv = $j("img[src*='" + monsterInfo.defense_img + "']", slice).parent();
                    if($u.hasContent(tempDiv)) {
                        currentMonster['fortify'] = tempDiv.getPercent('width').dp(2);
                        found = true;
                        tempDiv = tempDiv.parent();
                        if($u.hasContent(tempDiv)) {
                            currentMonster['strength'] = tempDiv.getPercent('width').dp(2);
                            tempDiv = tempDiv.parent().siblings().eq(0).children().eq(0);
                        } else {
                            currentMonster['strength'] = 100;
                            con.warn("Unable to find defense bar strength");
                        }
                    } else {
                        currentMonster['fortify'] = 100;
                        currentMonster['strength'] = 100;
                        con.warn("Unable to find defense bar fortify");
                    }

                    break;
                default:
                    con.warn("No match for defense_img", monsterInfo.defense_img);
            }

            if(!feed.isScan && !ajax && found && config.getItem("monsterEnableLabels", true)) {
                tempText = tempDiv.text().trim();
                if(!$u.hasContent(tempDiv.children()) && (tempText.toLowerCase().hasIndexOf('health') || tempText.toLowerCase().hasIndexOf('defense') || tempText.toLowerCase().hasIndexOf('armor'))) {
                    tempDiv.text(tempText + " (" + (monsterInfo.defense_img === 'bar_dispel.gif' ? (100 - currentMonster['fortify']).dp(2) : currentMonster['fortify']) + "%" + (monsterInfo.defense_img === 'nm_green.jpg' ? '/' + currentMonster['strength'] + '%' : '') + ")");
                }
            }
        }
        // Get damage done to monster
        actionDiv = $j("#" + caap.domain.id[caap.domain.which] + "action_logs", slice);
        damageDiv = $j("td[class='dragonContainer']:first td[valign='top']:first a[href*='user=" + caap.stats['FBID'] + "']:first", actionDiv);
        if($u.hasContent(damageDiv)) {
            if(monsterInfo && monsterInfo.defense) {
                tempArr = $u.setContent(damageDiv.parent().parent().siblings(":last").text(), '').trim().innerTrim().regex(/([\d,]+ dmg) \/ ([\d,]+ def)/);
                if($u.hasContent(tempArr) && tempArr.length === 2) {
                    currentMonster['attacked'] = $u.setContent(tempArr[0], '0').numberOnly();
                    currentMonster['defended'] = $u.setContent(tempArr[1], '0').numberOnly();
                    currentMonster['damage'] = currentMonster['attacked'] + currentMonster['defended'];
                } else {
                    con.warn("Unable to get attacked and defended damage");
                }
            } else if(currentMonster['monster'] === 'The Deathrune Siege') {
                currentMonster['attacked'] = $u.setContent(damageDiv.parent().siblings(":last").text(), '0').numberOnly();
                currentMonster['damage'] = currentMonster['attacked'];
            } else {
                currentMonster['attacked'] = $u.setContent(damageDiv.parent().parent().siblings(":last").text(), '0').numberOnly();
                currentMonster['damage'] = currentMonster['attacked'];
            }

            if(!feed.isScan && !ajax) {
                damageDiv.parents("tr").eq(0).css('background-color', ( gm ? gm.getItem("HighlightColor", '#C6A56F', hiddenVar) : '#C6A56F'));
            }

            currentMonster['hide'] = true;
        } else {
            var dleadersDiv2 = $j("div[id*='leaderboard_0']");
            if (dleadersDiv2.length == 0) {
                currentMonster['hide'] = !$u.hasContent($j("input[name='Attack Dragon'],input[name='raid_btn']", slice));
                con.log(2, "Player hasn't done damage yet");
            } else {
                damageDivNew = true;
                dleadersDiv2 = $j("a[href*='user=" + caap.stats['FBID'] + "']", dleadersDiv2[0].children);
                if (dleadersDiv2.length == 0) {		// yinzanat - this is repeated to prevent errors
                    currentMonster['hide'] = !$u.hasContent($j("input[name='Attack Dragon'],input[name='raid_btn']", slice));
                    con.log(2, "Player hasn't done damage yet");
                } else {
                    if(monsterInfo && monsterInfo.defense) {
                        tempArr = $u.setContent(dleadersDiv2.parent().parent()[0].children[4].innerHTML).trim().innerTrim().regex(/([\d,]+ dmg) \/ ([\d,]+ def)/);
                        if($u.hasContent(tempArr) && tempArr.length === 2) {
                            currentMonster['attacked'] = $u.setContent(tempArr[0], '0').numberOnly();
                            currentMonster['defended'] = $u.setContent(tempArr[1], '0').numberOnly();
                            currentMonster['damage'] = currentMonster['attacked'] + currentMonster['defended'];
                        } else {
                            con.warn("Unable to get attacked and defended damage");
                        }
/*  Not sure if this needed for the new layout
                    } else if(currentMonster['monster'] === 'The Deathrune Siege') {
                        currentMonster['attacked'] = $u.setContent(damageDiv.parent().siblings(":last").text(), '0').numberOnly();
                        currentMonster['damage'] = currentMonster['attacked'];
*/
                    } else {
                        currentMonster['attacked'] = $u.setContent(dleadersDiv2.parent().parent()[0].children[4].innerHTML, '0').numberOnly();
                        currentMonster['damage'] = currentMonster['attacked'];
                    }
                    if(!feed.isScan && !ajax) {
                        dleadersDiv2.parent().parent().eq(0).css('background-color', ( gm ? gm.getItem("HighlightColor", '#C6A56F', hiddenVar) : '#C6A56F'));
                    }
                }
            }
        }
        tBool = currentMonster['monster'] === "The Deathrune Siege" ? true : false;
        if(/:ac\b/.test(currentMonster['conditions']) || (tBool && config.getItem('raidCollectReward', false)) || (!tBool && config.getItem('monsterCollectReward', false))) {
            counter = state.getItem('monsterReviewCounter', config.getItem("festivalTower", false) ? -4 : -3);
            // Change from using monster name to monster MD5 - need to keep an eye open for any more
            if(counter >= 0 && monster.records[counter] && monster.records[counter]['md5'] === currentMonster['md5'] && ($u.hasContent($j("a[href*='&action=collectReward']", slice)) || $u.hasContent($j("input[alt*='Collect Reward']", slice)))) {
                con.log(2, 'Collecting Reward');
                currentMonster['review'] = -1;
                state.setItem('monsterReviewCounter', counter -= 1);
                currentMonster['status'] = 'Collect Reward';
                currentMonster['rix'] = currentMonster['monster'] === "The Deathrune Siege" ? $u.setContent($u.setContent($j("a[href*='&rix=']", slice).attr("href"), '').regex(/&rix=(\d+)/), -1) : -1;
            }
        }
        monstHealthImg = monsterInfo && monsterInfo.alpha ? 'nm_red.jpg' : 'monster_health_background.jpg';
        monsterDiv = $j("img[src*='" + monstHealthImg + "']", slice).parent();
        if($u.hasContent(time) && time.length === 3 && $u.hasContent(monsterDiv)) {
            currentMonster['time'] = time;
            if($u.hasContent(monsterDiv)) {
                currentMonster['life'] = monsterDiv.getPercent('width').dp(2);
                if(!feed.isScan && !ajax && config.getItem("monsterEnableLabels", true)) {
                    tempDiv = monsterDiv.siblings().eq(0).children().eq(0);
                    if(!$u.hasContent(tempDiv)) {
                        tempDiv = monsterDiv.parent().parent().siblings().eq(0);
                        if($u.hasContent(tempDiv.children())) {
                            tempDiv = tempDiv.children().eq(0);
                        }
                    }
                    tempText = tempDiv.text().trim();
                    if(!$u.hasContent(tempDiv.children()) && (tempText.toLowerCase().hasIndexOf('life') || tempText.toLowerCase().hasIndexOf('soldiers'))) {
                        tempDiv.text(tempText + " (" + currentMonster['life'] + "%)");
                    }
                }
            } else {
                con.warn("Could not find monster health div.");
            }

            if(currentMonster['life'] && !monsterInfo) {
                monster.setItem(currentMonster);
                con.warn('Unknown monster', currentMonster);
                return;
            }
            if(($u.hasContent(damageDiv) || damageDivNew) && monsterInfo && monsterInfo.alpha) {
                // Character type stuff
                monsterDiv = $j("div[style*='nm_bottom']", slice);
                if($u.hasContent(monsterDiv)) {
                    tempText = $u.setContent(monsterDiv.children().eq(0).children().text(), '').trim().innerTrim();
                    if(tempText) {
                        con.log(4, "Character class text", tempText);
                        tStr = tempText.regex(/Class: (\w+) /);
                        if($u.hasContent(tStr)) {
                            currentMonster['charClass'] = tStr;
                            con.log(4, "character", currentMonster['charClass']);
                        } else {
                            con.warn("Can't get character", tempText);
                        }
                        tStr = tempText.regex(/Tip: ([\w ]+) Status/);
                        if($u.hasContent(tStr)) {
                            currentMonster['tip'] = tStr;
                            con.log(4, "tip", currentMonster['tip']);
                        } else {
                            con.warn("Can't get tip", tempText);
                        }
                        tempArr = tempText.regex(/Status Time Remaining: (\d+):(\d+):(\d+)\s*/);
                        if($u.hasContent(tempArr) && tempArr.length === 3) {
                            currentMonster['stunTime'] = Date.now() + (tempArr[0] * 60 * 60 * 1000) + (tempArr[1] * 60 * 1000) + (tempArr[2] * 1000);
                            con.log(4, "statusTime", currentMonster['stunTime']);
                        } else {
                            con.warn("Can't get statusTime", tempText);
                        }
                        tempDiv = $j("img[src*='nm_stun_bar']", monsterDiv);
                        if($u.hasContent(tempDiv)) {
                            tempText = tempDiv.getPercent('width').dp(2);
                            con.log(4, "Stun bar percent text", tempText);
                            if(tempText >= 0) {
                                currentMonster['stun'] = tempText;
                                con.log(4, "stun", currentMonster['stun']);
                            } else {
                                con.warn("Can't get stun bar width");
                            }
                        } else {
                            tempArr = currentMonster['tip'].split(" ");
                            if($u.hasContent(tempArr)) {
                                tempText = tempArr[tempArr.length - 1].toLowerCase();
                                tempArr = ["strengthen", "heal"];
                                if(tempText && tempArr.hasIndexOf(tempText)) {
                                    if(tempText === tempArr[0]) {
                                        currentMonster['stun'] = currentMonster['strength'];
                                    } else if(tempText === tempArr[1]) {
                                        currentMonster['stun'] = currentMonster['health'];
                                    } else {
                                        con.warn("Expected strengthen or heal to match!", tempText);
                                    }
                                } else {
                                    con.warn("Expected strengthen or heal from tip!", tempText);
                                }
                            } else {
                                con.warn("Can't get stun bar and unexpected tip!", currentMonster['tip']);
                            }
                        }

                        if(currentMonster['charClass'] && currentMonster['tip'] && currentMonster['stun'] !== -1) {
                            currentMonster['stunDo'] = new RegExp(currentMonster['charClass']).test(currentMonster['tip']) && currentMonster['stun'] < 100;
                            currentMonster['stunType'] = '';
                            if(currentMonster['stunDo']) {
                                con.log(2, "Do character specific attack", currentMonster['stunDo']);
                                tempArr = currentMonster['tip'].split(" ");
                                if($u.hasContent(tempArr)) {
                                    tempText = tempArr[tempArr.length - 1].toLowerCase();
                                    tempArr = ["strengthen", "cripple", "heal", "deflection"];
                                    if(tempText && tempArr.hasIndexOf(tempText)) {
                                        currentMonster['stunType'] = tempText.replace("ion", '');
                                        con.log(2, "Character specific attack type", currentMonster['stunType']);
                                    } else {
                                        con.warn("Type does match list!", tempText);
                                    }
                                } else {
                                    con.warn("Unable to get type from tip!", currentMonster);
                                }
                            } else {
                                con.log(3, "Tip does not match class or stun maxed", currentMonster);
                            }
                        } else {
                            con.warn("Missing 'class', 'tip' or 'stun'", currentMonster);
                        }
                    } else {
                        con.warn("Missing tempText");
                    }
                } else {
                    con.warn("Missing nm_bottom");
                }
            }

            if(monsterInfo) {
                if(monsterInfo.siege) {
                    currentMonster['miss'] = $u.setContent($u.setContent($j("div[style*='monster_layout'],div[style*='nm_bottom'],div[style*='raid_back']", slice).text(), '').trim().innerTrim().regex(/Need (\d+) more/i), 0);
                    for( ind = 0, len = monsterInfo.siege_img.length; ind < len; ind += 1) {
                        searchStr += "img[src*='" + monsterInfo.siege_img[ind] + "']";
                        if(ind < len - 1) {
                            searchStr += ",";
                        }
                    }
                    searchRes = $j(searchStr, slice);
                    if($u.hasContent(searchRes)) {
                        totalCount = currentMonster['monster'] === "The Deathrune Siege" ? $u.setContent(searchRes.attr("src"), '').basename().replace(new RegExp(".*(\\d+).*", "gi"), "$1").parseInt() : searchRes.size() + 1;
                    }

                    currentMonster['phase'] = Math.min(totalCount, monsterInfo.siege);
                    if($u.isNaN(currentMonster['phase']) || currentMonster['phase'] < 1) {
                        currentMonster['phase'] = 1;
                    }
                }

                currentMonster['t2k'] = monster.t2kCalc(currentMonster);
            }
        } else {
            con.log(2, 'Monster is dead or fled');
            currentMonster['color'] = 'grey';
            if(currentMonster['status'] !== 'Complete' && currentMonster['status'] !== 'Collect Reward') {
                currentMonster['status'] = "Dead or Fled";
            }

            currentMonster['hide'] = true;
            currentMonster['joinable'] = {};
            session.setItem('resetselectMonster', true);
            monster.setItem(currentMonster);
            return;
        }

        if($u.hasContent(damageDiv) || damageDivNew) {
            achLevel = monster.parseCondition('ach', currentMonster['conditions']);
            if(monsterInfo && achLevel === false) {
                achLevel = monsterInfo.ach;
            }
            maxDamage = monster.parseCondition('max', currentMonster['conditions']);
            maxToFortify = monster.parseCondition('f%', currentMonster['conditions']);
            maxToFortify = maxToFortify !== false ? maxToFortify : config.getItem('MaxToFortify', 0);
            targetFromfortify = state.getItem('targetFromfortify', new monster.energyTarget().data);
            if(currentMonster['md5'] === targetFromfortify['md5']) {
                switch (targetFromfortify['type']) {
                    case 'Fortify' :
                        if(currentMonster['fortify'] > maxToFortify) {
                            session.setItem('resetselectMonster', true);
                        }

                        break;
                    case 'Strengthen':
                        if(currentMonster['strength'] >= 100) {
                            session.setItem('resetselectMonster', true);
                        }

                        break;
                    case 'Stun':
                        if(!currentMonster['stunDo']) {
                            session.setItem('resetselectMonster', true);
                        }

                        break;
                    default:
                }
            }

            // Start of Keep On Budget (KOB) code Part 1 -- required variables
            con.log(2, 'Start of Keep On Budget (KOB) Code');

            //default is disabled for everything
            KOBenable = false;

            //default is zero bias hours for everything
            KOBbiasHours = 0;

            //KOB needs to follow achievment mode for this monster so that KOB can be skipped.
            KOBach = false;

            //KOB needs to follow max mode for this monster so that KOB can be skipped.
            KOBmax = false;

            //KOB needs to follow minimum fortification state for this monster so that KOB can be skipped.
            KOBminFort = false;

            //create a temp variable so we don't need to call parseCondition more than once for each if statement
            KOBtmp = monster.parseCondition('kob', currentMonster['conditions']);
            if(KOBtmp !== false && $u.isNaN(KOBtmp)) {
                con.log(2, 'KOB NaN branch');
                KOBenable = true;
                KOBbiasHours = 0;
            } else if(KOBtmp === false) {
                con.log(2, 'KOB false branch');
                KOBenable = false;
                KOBbiasHours = 0;
            } else {
                con.log(2, 'KOB passed value branch');
                KOBenable = true;
                KOBbiasHours = KOBtmp;
            }

            //test if user wants kob active globally
            if(!KOBenable && ( gm ? gm.getItem('KOBAllMonters', false, hiddenVar) : false)) {
                KOBenable = true;
            }

            //disable kob if in level up mode or if we are within 5 stamina of max potential stamina
            if(caap.inLevelUpMode() || caap.stats['stamina']['num'] >= caap.stats['stamina']['max'] - 5) {
                KOBenable = false;
            }

            if(KOBenable) {
                con.log(2, 'Level Up Mode: ', caap.inLevelUpMode());
                con.log(2, 'Stamina Avail: ', caap.stats['stamina']['num']);
                con.log(2, 'Stamina Max: ', caap.stats['stamina']['max']);

                //log results of previous two tests
                con.log(2, 'KOBenable: ', KOBenable);
                con.log(2, 'KOB Bias Hours: ', KOBbiasHours);
            }

            //Total Time alotted for monster
            KOBtotalMonsterTime = monsterInfo.duration;
            if(KOBenable) {
                con.log(2, 'Total Time for Monster: ', KOBtotalMonsterTime);

                //Total Damage remaining
                con.log(2, 'HP left: ', currentMonster['life']);
            }

            //Time Left Remaining
            KOBtimeLeft = time[0] + (time[1] * 0.0166);
            if(KOBenable) {
                con.log(2, 'TimeLeft: ', KOBtimeLeft);
            }

            //calculate the bias offset for time remaining
            KOBbiasedTF = KOBtimeLeft - KOBbiasHours;

            //for 7 day monsters we want kob to not permit attacks (beyond achievement level) for the first 24 to 48 hours
            // -- i.e. reach achievement and then wait for more players and siege assist clicks to catch up
            if(KOBtotalMonsterTime >= 168) {
                KOBtotalMonsterTime = KOBtotalMonsterTime - ( gm ? gm.getItem('KOBDelayStart', 48, hiddenVar) : 48);
            }

            //Percentage of time remaining for the currently selected monster
            KOBPercentTimeRemaining = Math.round(KOBbiasedTF / KOBtotalMonsterTime * 1000) / 10;
            if(KOBenable) {
                con.log(2, 'Percent Time Remaining: ', KOBPercentTimeRemaining);
            }

            // End of Keep On Budget (KOB) code Part 1 -- required variables

            isTarget = (currentMonster['name'] === state.getItem('targetFromraid', '') || currentMonster['name'] === state.getItem('targetFrombattle_monster', '') || currentMonster['name'] === targetFromfortify['name']);

            if(maxDamage && currentMonster['damage'] >= maxDamage) {
                currentMonster['color'] = 'red';
                currentMonster['over'] = 'max';
                //used with KOB code
                KOBmax = true;
                //used with kob debugging
                if(KOBenable) {
                    con.log(2, 'KOB - max activated');
                }

                if(isTarget) {
                    session.setItem('resetselectMonster', true);
                }
            } else if(currentMonster['fortify'] !== -1 && currentMonster['fortify'] < config.getItem('MinFortToAttack', 1)) {
                currentMonster['color'] = 'purple';
                //used with KOB code
                KOBminFort = true;
                //used with kob debugging
                if(KOBenable) {
                    con.log(2, 'KOB - MinFort activated');
                }

                if(isTarget) {
                    session.setItem('resetselectMonster', true);
                }
            } else if(currentMonster['damage'] >= achLevel && (config.getItem('AchievementMode', false) || monster.parseCondition('ach', currentMonster['conditions']) !== false)) {
                currentMonster['color'] = 'darkorange';
                currentMonster['over'] = 'ach';
                //used with KOB code
                KOBach = true;
                //used with kob debugging
                if(KOBenable) {
                    con.log(2, 'KOB - achievement reached');
                }

                if(isTarget && currentMonster['damage'] < achLevel) {
                    session.setItem('resetselectMonster', true);
                }
            }

            //Start of KOB code Part 2 begins here
            if(KOBenable && !KOBmax && !KOBminFort && KOBach && currentMonster['life'] < KOBPercentTimeRemaining) {
                //kob color
                currentMonster['color'] = 'magenta';
                // this line is required or we attack anyway.
                currentMonster['over'] = 'max';
                //used with kob debugging
                if(KOBenable) {
                    con.log(2, 'KOB - budget reached');
                }

                if(isTarget) {
                    session.setItem('resetselectMonster', true);
                    con.log(1, 'This monster no longer a target due to kob');
                }
            } else {
                if(!KOBmax && !KOBminFort && !KOBach) {
                    //the way that the if statements got stacked, if it wasn't kob it was painted black anyway
                    //had to jump out the black paint if max, ach or fort needed to paint the entry.
                    currentMonster['color'] = $u.bestTextColor(state.getItem("StyleBackgroundLight", "#E0C961"));
                }
            }
            //End of KOB code Part 2 stops here.
        } else {
            currentMonster['color'] = $u.bestTextColor(state.getItem("StyleBackgroundLight", "#E0C961"));
        }

        monster.setItem(currentMonster);
        con.log(3, "currentMonster", currentMonster);
        monster.select(true);
        caap.updateDashboard(true);
        if(schedule.check('battleTimer')) {
            window.setTimeout(function() {
                caap.setDivContent('monster_mess', '');
            }, 2000);
        }
    } catch (err) {
        con.error("ERROR in checkResults_viewFight: " + err);
    }
}