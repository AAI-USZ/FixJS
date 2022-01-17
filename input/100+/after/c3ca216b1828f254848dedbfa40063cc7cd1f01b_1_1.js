function ($parent, doc, current, level, conf) {
                var $secs = $parent.children(conf.tocIntroductory ? "section" : "section:not(.introductory)");

                if ($secs.length === 0) return null;
                var $ul = $("<ul class='toc'></ul>");
                for (var i = 0; i < $secs.length; i++) {
                    var $sec = $($secs[i], doc)
                    ,   isIntro = $sec.hasClass("introductory")
                    ;
                    if (!$sec.children().length) continue;
                    var h = $sec.children()[0]
                    ,   ln = h.localName.toLowerCase();
                    if (ln !== "h2" && ln !== "h3" && ln !== "h4" && ln !== "h5" && ln !== "h6") continue;
                    var title = h.textContent
                    ,   $kidsHolder = $("<div></div>").append($(h).contents().clone())
                    ;
                    $kidsHolder.find("a").renameElement("span").attr("class", "formerLink").removeAttr("href");
                    $kidsHolder.find("dfn").renameElement("span").removeAttr("id");
                    var id = $sec.makeID(null, title);
                    
                    if (!isIntro) current[current.length - 1]++;
                    var secnos = current.slice();
                    if ($sec.hasClass("appendix") && current.length === 1 && !appendixMode) {
                        lastNonAppendix = current[0];
                        appendixMode = true;
                    }
                    if (appendixMode) secnos[0] = alphabet.charAt(current[0] - lastNonAppendix);
                    var secno = secnos.join(".")
                    ,   isTopLevel = secnos.length == 1;
                    if (isTopLevel) {
                        secno = secno + ".";
                        // if this is a top level item, insert
                        // an OddPage comment so html2ps will correctly
                        // paginate the output
                        $(h).before(document.createComment('OddPage'));
                    }
                    var $span = $("<span class='secno'></span>").text(secno + " ");
                    if (!isIntro) $(h).prepend($span);
                    secMap[id] = (isIntro ? "" : "<span class='secno'>" + secno + "</span> ") +
                                "<span class='sec-title'>" + title + "</span>";

                    var $a = $("<a/>").attr({ href: "#" + id, 'class' : 'tocxref' })
                                      .append(isIntro ? "" : $span.clone())
                                      .append($kidsHolder.contents());
                    var $item = $("<li class='tocline'/>").append($a);
                    $ul.append($item);
                    if (conf.maxTocLevel && level >= conf.maxTocLevel) continue;
                    current.push(0);
                    var $sub = makeTOCAtLevel($sec, doc, current, level + 1, conf);
                    if ($sub) $item.append($sub);
                    current.pop();
                }
                return $ul;
            }