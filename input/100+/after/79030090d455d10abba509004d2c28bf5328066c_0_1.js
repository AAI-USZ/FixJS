function(response) {

        var ls = response.ls



        function isEnabled (name) {

            return ls["enabled-" + name] == null || ls["enabled-" + name] == undefined || ls["enabled-" + name] == "true"

        }



        var enabled = {all: isEnabled("all"), layout: isEnabled("layout"), hide: isEnabled("hide")}



        function setupPage() {

            addScript("Ajax.Responders.register({onComplete: function(obj) {if (!obj.url.match(/.*(set_cookie.php|get_contexts.php|get_tags.php)$/)) {var customEvent = document.createEvent('Event');customEvent.initEvent('ajaxRequest', true, true);$('ajaxInfo').dispatchEvent(customEvent)}}})")

        }



        function addScript(code) {

            var script = document.createElement( 'script' );

            script.type = 'text/javascript';

            script.innerHTML = code

            $(document.body).append(script );

        }



        function setupListener(listener) {

            $("<div id='ajaxInfo' />").css("display", "none").appendTo(document.body).bind("ajaxRequest", listener)

        }



        function doStuff() {

            ifEnabled(function (layout) {

                changeLook("con", "context", layout)

                changeLook("sat", "status", layout)

                changeLook("fol", "folder", layout)

                changeLook("gol", "goal", layout)

                changeLook("std", "startDate", layout)

                changeLook("due", "dueDate", layout)

                changeLook("rep", "repeat", layout)

                changeLook("len", "length", layout)

                changeLook("pri", "priority", layout)

                changeLook("tag", "tag", layout)

                changeLook("loc", "location", layout)

                changeLook("tim", "timer", layout)



                if (layout) {

                    $(".dett:has(span[id^='tsk'])").addClass("taskHighlightedLayedout")

                    $(".del, .not").addClass("iconLayedout")

                }

                setupHide(layout)

            })

        }



        var hideStrategy = {

            layout: {

                show: function(elem$) {

                    elem$.show()

                },



                hide: function (elem$) {

                    elem$.hide()

                }

            },



            noLayout: {

                show: function(elem$) {

                    elem$.css({visibility: 'visible'})

                },

                hide: function (elem$) {

                    elem$.css({visibility: 'hidden'})

                }

            }

        }



        function classOff(name, where) {

            $("." + name, where).removeClass(name).addClass(name + "-off")

        }



        function classOn(name, where) {

            $("." + name + "-off", where).removeClass(name + "-off").addClass(name)

        }



        function setupHide(layout) {

            var strategy = layout ? hideStrategy.layout : hideStrategy.noLayout



            if (enabled.hide) {

                strategy.hide($("#tasks .dett.highlightNone, #tasks .del2, #tasks .del, #tasks .not"))



                $("#tasks .row").filter(function () {

                    return $(this).data("hProcessed") ? false : true

                }).data("hProcessed", true).mouseenter(function (ev) {

                    var t = ev.target



                    if (layout) {

                        classOff("highlightedLayedout", t)

                        classOff("taskHighlightedLayedout", t)

                        strategy.show($(".hInvisible",  t))

                        $(".highlightedDiv-l", t).removeClass("highlightedDiv-l").addClass("highlightedDiv")

                    }



                    strategy.show($(".dett.highlightNone", t))

                    strategy.show($(".del2", t))

                    strategy.show($(".del", t))

                    strategy.show($(".not", t))

                }).mouseleave(function (ev) {

                    var t =$(ev.target)



                    if (!t.hasClass("row")) {

                        t = t.parents(".row")

                    }



                    if (layout) {

                        classOn("highlightedLayedout", t)

                        classOn("taskHighlightedLayedout", t)

                        strategy.hide($(".hInvisible", t))

                        $(".highlightedDiv", t).removeClass("highlightedDiv").addClass("highlightedDiv-l")

                    }



                    strategy.hide($(".dett.highlightNone", t))

                    strategy.hide($(".del2", t))

                    strategy.hide($(".del", t))

                    strategy.hide($(".not", t))

                })

            }

        }



        var emptySpan = "span:empty, span:contains('none'), span:contains('None'), span:contains('no date'), span:contains('No Folder'), span:contains('No Goal'), span:contains('No Context'), span:contains('0 Low'), span:contains('No Location')"



        function changeLook(prefix, name, layout) {

            var back = ls[name + "-back"]

            var text = ls[name + "-text"]

            var show = ls[name + "-show"] == "true" ? true :(ls[name + "-show"] == "false" ? false : true)



            var css = "background-color: #" + back + " !important; " + "color: #" + text + " !important"

            var cssSpan = "color: #" + text + " !important"



            $("div.dets_top2 span[id^='" + prefix + "']:not(span[id^='lenx'])", "#tasks").addClass("highlightedTopSpan").attr('style', css).map(function () {

                var parent$ = $(this).parent()

                $(emptySpan, parent$)

                    .map(function () {

                        parent$.addClass("highlightNone")

                    })

            })



            $("div.dett:has(span[id^='" + prefix + "'])", "#tasks").each(function() {

                var dett$ = $(this)

                var span$ = $("span", dett$)



                // restore state

                dett$.removeClass("highlightNone highlightedLayedout hInvisible highlighted").css({visibility: "visible"}).show()



                span$.attr('style', cssSpan)

                dett$.addClass("highlightedDiv" + (layout ? "-l" : "")).attr('style', css)



                $(emptySpan, dett$).map(function () {dett$.addClass("highlightNone")})

//                $(notEmptySpan, dett$).map(function () {dett$.removeClass("highlightNone").show()})



                if (show) {

                    if (layout) {

                        dett$.addClass("highlightedLayedout")

                    }

                } else {

                    if (layout) {

                        dett$.addClass("hInvisible").hide()

                    }

                }



                dett$.addClass("highlighted")

            })

        }



        function ifEnabled(fn) {

            if (enabled.all) {

                fn(enabled.layout)

            }

        }



        setupListener(doStuff)

        setupPage()



        doStuff()

    }