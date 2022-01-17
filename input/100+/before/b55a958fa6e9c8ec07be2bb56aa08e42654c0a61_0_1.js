function() {
        try {
            var attrDiv = $j("#keepAltStats", caap.appBodyDiv), statsTB = $j("div[style*='keep_cont_treasure.jpg'] div:nth-child(3)>div>div>div>div", caap.appBodyDiv), keepTable1 = $j(".keepTable1 tr", caap.appBodyDiv), statCont = $j("div[style*='keep_cont_top.jpg']>div>div>div", caap.appBodyDiv), tempDiv = $j(), temp, row, head, body;

            if($u.hasContent(attrDiv)) {
                con.log(8, "Getting new values from player keep");
                // rank
                tempDiv = $j("img[src*='gif/rank']", caap.appBodyDiv);
                if($u.hasContent(tempDiv)) {
                    caap.stats['rank']['battle'] = $u.setContent($u.setContent(tempDiv.attr("src"), '').basename().regex(/(\d+)/), 0);
                } else {
                    con.warn('Using stored rank.');
                }

                // PlayerName
                tempDiv = $j("div[style*='keep_top.jpg'] div", caap.appBodyDiv).first();
                if($u.hasContent(tempDiv)) {
                    caap.stats['PlayerName'] = $u.setContent($u.setContent(tempDiv.text(), '').regex(new RegExp("(.+)")), '');
                    con.log(1, caap.stats['PlayerName']);
                } else {
                    con.warn('Using stored PlayerName.');
                }

                // war rank
                if(caap.stats['level'] >= 100) {
                    tempDiv = $j("img[src*='war_rank_']", caap.appBodyDiv);
                    if($u.hasContent(tempDiv)) {
                        caap.stats['rank']['war'] = $u.setContent($u.setContent(tempDiv.attr("src"), '').basename().regex(/(\d+)/), 0);
                    } else {
                        con.warn('Using stored warRank.');
                    }
                }

                if($u.hasContent(statCont) && statCont.length >= 6) {
                    // Energy
                    tempDiv = statCont.eq(0);
                    if($u.hasContent(tempDiv)) {
                        caap.stats['energy'] = caap.getStatusNumbers(caap.stats['energyT']['num'] + '/' + $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0));
                    } else {
                        con.warn('Using stored energy value.');
                    }

                    // Stamina
                    tempDiv = statCont.eq(1);
                    if($u.hasContent(tempDiv)) {
                        caap.stats['stamina'] = caap.getStatusNumbers(caap.stats['staminaT']['num'] + '/' + $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0));
                    } else {
                        con.warn('Using stored stamina value.');
                    }

                    if(caap.stats['level'] >= 10) {
                        // Attack
                        tempDiv = statCont.eq(2);
                        if($u.hasContent(tempDiv)) {
                            caap.stats['attack'] = $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0);
                        } else {
                            con.warn('Using stored attack value.');
                        }

                        // Defense
                        tempDiv = statCont.eq(3);
                        if($u.hasContent(tempDiv)) {
                            caap.stats['defense'] = $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0);
                        } else {
                            con.warn('Using stored defense value.');
                        }
                    }

                    // Health
                    tempDiv = statCont.eq(4);
                    if($u.hasContent(tempDiv)) {
                        caap.stats['health'] = caap.getStatusNumbers(caap.stats['healthT']['num'] + '/' + $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0));
                    } else {
                        con.warn('Using stored health value.');
                    }
                } else {
                    con.warn("Can't find stats containers! Using stored stats values.");
                }

                // Check for Gold Stored
                tempDiv = statsTB.eq(4);
                if($u.hasContent(tempDiv)) {
                    caap.stats['gold']['bank'] = $u.setContent($u.setContent(tempDiv.text(), '').numberOnly(), 0);
                    caap.stats['gold']['total'] = caap.stats['gold']['bank'] + caap.stats['gold']['cash'];
                    tempDiv.attr({
                        title : "Click to copy value to retrieve",
                        style : "color: blue;"
                    }).hover(function() {
                        caap.style.cursor = 'pointer';
                    }, function() {
                        caap.style.cursor = 'default';
                    }).click(function() {
                        $j("input[name='get_gold']", caap.appBodyDiv).val(caap.stats['gold']['bank']);
                    });
                } else {
                    con.warn('Using stored inStore.');
                }

                // Check for income
                tempDiv = statsTB.eq(5);
                if($u.hasContent(tempDiv)) {
                    caap.stats['gold']['income'] = $u.setContent($u.setContent(tempDiv.text(), '').numberOnly(), 0);
                } else {
                    con.warn('Using stored income.');
                }

                // Check for upkeep
                tempDiv = statsTB.eq(6);
                if($u.hasContent(tempDiv)) {
                    caap.stats['gold']['upkeep'] = $u.setContent($u.setContent(tempDiv.text(), '').numberOnly(), 0);
                } else {
                    con.warn('Using stored upkeep.');
                }

                // Cash Flow
                caap.stats['gold']['flow'] = caap.stats['gold']['income'] - caap.stats['gold']['upkeep'];

                // Energy potions
                tempDiv = $j("img[title='Energy Potion']", caap.appBodyDiv).parent().next();
                if($u.hasContent(tempDiv)) {
                    caap.stats['potions']['energy'] = $u.setContent($u.setContent(tempDiv.text(), '').numberOnly(), 0);
                } else {
                    caap.stats['potions']['energy'] = 0;
                }

                // Stamina potions
                tempDiv = $j("img[title='Stamina Potion']", caap.appBodyDiv).parent().next();
                if($u.hasContent(tempDiv)) {
                    caap.stats['potions']['stamina'] = $u.setContent($u.setContent(tempDiv.text(), '').numberOnly(), 0);
                } else {
                    caap.stats['potions']['stamina'] = 0;
                }

                // Other stats
                // Atlantis Open
                caap.stats['other'].atlantis = $u.hasContent(caap.checkForImage("seamonster_map_finished.jpg")) ? true : false;

                // quests Completed
                tempDiv = statCont.eq(18);
                if($u.hasContent(tempDiv)) {
                    caap.stats['other']['qc'] = $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0);
                } else {
                    con.warn('Using stored other.');
                }

                // Battles/Wars Won
                tempDiv = statCont.eq(19);
                if($u.hasContent(tempDiv)) {
                    caap.stats['other']['bww'] = $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0);
                } else {
                    con.warn('Using stored other.');
                }

                // Battles/Wars Lost
                tempDiv = statCont.eq(20);
                if($u.hasContent(tempDiv)) {
                    caap.stats['other']['bwl'] = $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0);
                } else {
                    con.warn('Using stored other.');
                }

                // Times eliminated
                tempDiv = statCont.eq(21);
                if($u.hasContent(tempDiv)) {
                    caap.stats['other']['te'] = $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0);
                } else {
                    con.warn('Using stored other.');
                }

                // Times you eliminated an enemy
                tempDiv = statCont.eq(22);
                if($u.hasContent(tempDiv)) {
                    caap.stats['other']['tee'] = $u.setContent($u.setContent(tempDiv.text(), '').regex(/(\d+)/), 0);
                } else {
                    con.warn('Using stored other.');
                }

                // Win/Loss Ratio (WLR)
                caap.stats['other']['wlr'] = caap.stats['other']['bwl'] !== 0 ? (caap.stats['other']['bww'] / caap.stats['other']['bwl']).dp(2) : Infinity;
                // Enemy Eliminated Ratio/Eliminated (EER)
                caap.stats['other']['eer'] = caap.stats['other']['tee'] !== 0 ? (caap.stats['other']['tee'] / caap.stats['other']['te']).dp(2) : Infinity;
                // Indicators
                if(caap.stats['level'] >= 10) {
                    caap.stats['indicators']['bsi'] = ((caap.stats['attack'] + caap.stats['defense']) / caap.stats['level']).dp(2);
                    caap.stats['indicators']['lsi'] = ((caap.stats['energy']['max'] + (2 * caap.stats['stamina']['max'])) / caap.stats['level']).dp(2);
                    caap.stats['indicators']['sppl'] = ((caap.stats['energy']['max'] + (2 * caap.stats['stamina']['max']) + caap.stats['attack'] + caap.stats['defense'] + caap.stats['health']['max'] - 122) / caap.stats['level']).dp(2);
                    caap.stats['indicators']['api'] = ((caap.stats['attack'] + (caap.stats['defense'] * 0.7))).dp(2);
                    caap.stats['indicators']['dpi'] = ((caap.stats['defense'] + (caap.stats['attack'] * 0.7))).dp(2);
                    caap.stats['indicators']['mpi'] = (((caap.stats['indicators']['api'] + caap.stats['indicators']['dpi']) / 2)).dp(2);
                    caap.stats['indicators']['mhbeq'] = ((caap.stats['attack'] + (2 * caap.stats['stamina']['max'])) / caap.stats['level']).dp(2);
                    if(caap.stats['attack'] >= caap.stats['defense']) {
                        temp = caap.stats['attack'] / caap.stats['defense'];
                        if(temp === caap.stats['attack']) {
                            caap.stats['indicators']['pvpclass'] = 'Destroyer';
                        } else if(temp >= 2 && temp < 7.5) {
                            caap.stats['indicators']['pvpclass'] = 'Aggressor';
                        } else if(temp < 2 && temp > 1.01) {
                            caap.stats['indicators']['pvpclass'] = 'Offensive';
                        } else if(temp <= 1.01) {
                            caap.stats['indicators']['pvpclass'] = 'Balanced';
                        }
                    } else {
                        temp = caap.stats['defense'] / caap.stats['attack'];
                        if(temp === caap.stats['defense']) {
                            caap.stats['indicators']['pvpclass'] = 'Wall';
                        } else if(temp >= 2 && temp < 7.5) {
                            caap.stats['indicators']['pvpclass'] = 'Paladin';
                        } else if(temp < 2 && temp > 1.01) {
                            caap.stats['indicators']['pvpclass'] = 'Defensive';
                        } else if(temp <= 1.01) {
                            caap.stats['indicators']['pvpclass'] = 'Balanced';
                        }
                    }

                    if(caap.stats['indicators']['bsi'] >= 7) {
                        caap.stats['indicators']['build'] = 'Pure PvP';
                    } else if(caap.stats['indicators']['bsi'] >= 5 && caap.stats['indicators']['bsi'] < 7) {
                        caap.stats['indicators']['build'] = 'PvP';
                    } else if(caap.stats['indicators']['bsi'] >= 3 && caap.stats['indicators']['bsi'] < 5) {
                        caap.stats['indicators']['build'] = 'Hybrid';
                    } else if(caap.stats['indicators']['bsi'] >= 1 && caap.stats['indicators']['bsi'] < 3) {
                        caap.stats['indicators']['build'] = 'Monster Hunter';
                    } else if(caap.stats['indicators']['bsi'] < 1) {
                        caap.stats['indicators']['build'] = 'Power Leveler';
                    }
                }

                schedule.setItem("keep", ( gm ? gm.getItem("checkKeep", 1, hiddenVar) : 1) * 3600, 300);
                caap.saveStats();
                if(!caap.caTools && config.getItem("displayKStats", true)) {
                    tempDiv = $j(".keep_healer_section", caap.appBodyDiv).children().eq(0);
                    temp = "<div style='border:1px solid #701919;margin:-238px 0pt 0pt 21px;padding: 5px 5px;width:200px;height:223px;float:left;background-color:#d0b682;background-image: url(\"" + $j("input[src*='btn_retrieve.gif']", caap.appBodyDiv).attr("src").replace("btn_retrieve.gif", "bg_main_middle.jpg") + "\");'>";
                    row = caap.makeTh({
                        text : '&nbsp;',
                        color : '',
                        bgcolor : '',
                        id : '',
                        title : '',
                        width : '40%'
                    });
                    row += caap.makeTh({
                        text : '&nbsp;',
                        color : '',
                        bgcolor : '',
                        id : '',
                        title : '',
                        width : '60%'
                    });
                    head = caap.makeTr(row);
                    row = caap.makeTd({
                        text : 'BSI',
                        color : '',
                        id : '',
                        title : 'Battle Strength Index'
                    }, "font-size:14px;");
                    row += caap.makeTd({
                        text : caap.stats['indicators']['bsi'],
                        color : '',
                        id : '',
                        title : ''
                    }, "font-size:14px;");
                    body = caap.makeTr(row);
                    row = caap.makeTd({
                        text : 'LSI',
                        color : '',
                        id : '',
                        title : 'Leveling Speed Index'
                    }, "font-size:14px;");
                    row += caap.makeTd({
                        text : caap.stats['indicators']['lsi'],
                        color : '',
                        id : '',
                        title : ''
                    }, "font-size:14px;");
                    body += caap.makeTr(row);
                    row = caap.makeTd({
                        text : 'SPPL',
                        color : '',
                        id : '',
                        title : 'Skill Points Per Level (More accurate than SPAEQ)'
                    }, "font-size:14px;");
                    row += caap.makeTd({
                        text : caap.stats['indicators']['sppl'],
                        color : '',
                        id : '',
                        title : ''
                    }, "font-size:14px;");
                    body += caap.makeTr(row);
                    row = caap.makeTd({
                        text : 'API',
                        color : '',
                        id : '',
                        title : 'Attack Power Index'
                    }, "font-size:14px;");
                    row += caap.makeTd({
                        text : caap.stats['indicators']['api'],
                        color : '',
                        id : '',
                        title : ''
                    }, "font-size:14px;");
                    body += caap.makeTr(row);
                    row = caap.makeTd({
                        text : 'DPI',
                        color : '',
                        id : '',
                        title : 'Defense Power Index'
                    }, "font-size:14px;");
                    row += caap.makeTd({
                        text : caap.stats['indicators']['dpi'],
                        color : '',
                        id : '',
                        title : ''
                    }, "font-size:14px;");
                    body += caap.makeTr(row);
                    row = caap.makeTd({
                        text : 'MPI',
                        color : '',
                        id : '',
                        title : 'Mean Power Index'
                    }, "font-size:14px;");
                    row += caap.makeTd({
                        text : caap.stats['indicators']['mpi'],
                        color : '',
                        id : '',
                        title : ''
                    }, "font-size:14px;");
                    body += caap.makeTr(row);
                    row = caap.makeTd({
                        text : 'MHBEQ',
                        color : '',
                        id : '',
                        title : 'Monster Hunting Build Effective Quotent'
                    }, "font-size:14px;");
                    row += caap.makeTd({
                        text : caap.stats['indicators']['mhbeq'],
                        color : '',
                        id : '',
                        title : ''
                    }, "font-size:14px;");
                    body += caap.makeTr(row);
                    row = caap.makeTd({
                        text : 'Build',
                        color : '',
                        id : '',
                        title : 'Character build type'
                    }, "font-size:14px;");
                    row += caap.makeTd({
                        text : caap.stats['indicators']['build'],
                        color : '',
                        id : '',
                        title : ''
                    }, "font-size:14px;");
                    body += caap.makeTr(row);
                    row = caap.makeTd({
                        text : 'PvP Class',
                        color : '',
                        id : '',
                        title : 'Player vs. Player character class'
                    }, "font-size:14px;");
                    row += caap.makeTd({
                        text : caap.stats['indicators']['pvpclass'],
                        color : '',
                        id : '',
                        title : ''
                    }, "font-size:14px;");
                    body += caap.makeTr(row);
                    temp += caap.makeTable("keepstats", head, body, "Statistics", "font-size:16px;");
                    temp += "</div>";
                    tempDiv.before(temp);
                } else {
                    tempDiv = $j(".keep_stat_title_inc", attrDiv);
                    tempDiv = $u.hasContent(tempDiv) ? tempDiv.html($u.setContent(tempDiv.html(), '').trim() + ", <span style='white-space: nowrap;'>BSI: " + caap.stats['indicators']['bsi'] + " LSI: " + caap.stats['indicators']['lsi'] + "</span>") : tempDiv;
                }
            } else {
                tempDiv = $j("a[href*='keep.php?user=']", caap.appBodyDiv);
                if($u.hasContent(tempDiv)) {
                    con.log(2, "On another player's keep", $u.setContent($u.setContent(tempDiv.attr("href"), '').basename().regex(/(\d+)/), 0));
                } else {
                    con.warn("Attribute section not found and not identified as another player's keep!");
                }
            }

            if(config.getItem("enableTitles", true)) {
                spreadsheet.doTitles();
            }

            if(config.getItem("enableKeepShrink", true)) {
                $j("div[class*='statUnit'] img", caap.appBodyDiv).attr("style", "height: 45px; width: 45px;").not("div[class*='statUnit'] img[alt='Stamina Potion'],img[alt='Energy Potion']", caap.appBodyDiv).parent().parent().attr("style", "height: 45px; width: 45px;");
            }

            return true;
        } catch (err) {
            con.error("ERROR in checkResults_keep: " + err);
            return false;
        }
    }