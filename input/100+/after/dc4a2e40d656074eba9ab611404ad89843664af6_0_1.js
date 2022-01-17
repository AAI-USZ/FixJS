function(evt) {
    var baseurl = "http://api.radiocicletta.it";
    var player = document.createElement("div");

    player.id = "commands";
    player.innerHTML =  '<span id="flexibleplayer">' +
                            '<a href="" id="playercmd" class="play" title="Play/Stop"></a>' +
                            '<span id="playerdot"></span>' +
                            '<span id="playervolume"><a href="" id="playerknob"></a></span>' +
                            '<span id="playermetadata">...</span>' +
                        '</span>' +
                        '<a id="playerexternal" title="ascolta la diretta col tuo player (Winamp, iTunes, VLC...)"' +
                            'href="http://radiocicletta.it/listen.pls"></a>' +
                        '<a id="playerdetach" href=""></a>';
    document.getElementById("player").appendChild(player);
    var metadata = document.getElementById("playermetadata");
    var playerdot = document.getElementById("playerdot");

    var opacity = 0;
    var dotinterval = setInterval(function(){
        playerdot.style.opacity = opacity++ % 2;
    }, 1000);

    //playerdot.style.backgroundPosition = kPlayerBackgroundWaitPos;

    me = new MediaElement('audiosrc', {
        enablePluginDebug: true,
        plugins: ['silverlight', 'flash'],
        type: 'audio/mp3',
        pluginPath: 'http://cdn.radiocicletta.it/js/me/',
        flashName: 'flashmediaelement.swf',
        silverlightName: 'silverlightmediaelement.xap',
        pluginWidth: -1,
        pluginHeight: -1,
        timerRate: 250,
        success: function (mediaElement, domObject) { 

            mediaElement.addEventListener('loadstart', function(e) {
                metadata.innerHTML = "Avvio player...";
                playerdot.style.backgroundPosition = kPlayerBackgroundWaitPos;
            }, false);
            mediaElement.addEventListener('pause', function(e) {
                playerdot.style.backgroundPosition = kPlayerBackgroundWaitPos;
            }, false);
            mediaElement.addEventListener('ended', function(e) {
                metadata.innerHTML = "Riproduzione interrotta";
                playerdot.style.backgroundPosition = kPlayerBackgroundHaltPos;
            }, false);
            mediaElement.addEventListener('canplay', function(e){
                playerdot.style.backgroundPosition = kPlayerBackgroundRunPos;
            }, false);
            mediaElement.addEventListener('loadeddata', function(e){
                playerdot.style.backgroundPosition = kPlayerBackgroundRunPos;
            }, false);
            mediaElement.addEventListener('emptied', function(e){
                playerdot.style.backgroundPosition = kPlayerBackgroundHaltPos;
            }, false);
            mediaElement.addEventListener('empty', function(e){
                playerdot.style.backgroundPosition = kPlayerBackgroundHaltPos;
            }, false);
            mediaElement.addEventListener('volumechange', function(e){
                var original = metadata.innerHTML;
                var newcontent = "Volume: " + ~~(me.volume * 100) + "%";
                metadata.innerHTML = newcontent;

                setTimeout(function() {
                    if (metadata.innerHTML === newcontent)
                        metadata.innerHTML = original;
                }, 2000);
            }, false);

            var icyinfo = { listeners:0, title:"", genre:"" };
            var onairinfo = { title: "No Stop Music", id: -1 };

            var xhr_metadata = function(){
                var xhr = new XMLHttpRequest();
                try {
                    xhr.overrideMimeType("text/plain; charset=utf-8");
                    xhr.open("GET", baseurl + "/snd/json.xsl?_=" + new Date().getTime(), false);
                    xhr.send(null);
                    var streams = JSON.parse(xhr.responseText);

                    if ( streams["/stream"] !== undefined )
                        icyinfo = streams["/stream"];
                    //else if ( streams["/live"] !== undefined )
                    //    icyinfo = streams["/live"];
                    else if ( streams["/studio"] !== undefined )
                        icyinfo = streams["/studio"];
                    else
                        icyinfo = {listeners:0, title:"", genre:""};


                    xhr.open("GET", baseurl + "/programmi.json?_=" + new Date().getTime(), false);
                    xhr.send(null);

                    var daytable = ["do", "lu", "ma", "me", "gi", "ve", "sa"];
                    var schedule = JSON.parse(xhr.responseText);
                    var date = new Date();
                    var filtered = schedule.events.filter(function(el, idx, arr){ 
                        return el.stato > 0 &&
                                el.start[0] == daytable[date.getDay()] &&
                                el.start[1] == date.getHours(); // FIXME: el.start[1] == 24 => ???
                    });

                    if (filtered.length)
                        onairinfo = filtered[0];
                    else
                        onairinfo = {title: "No Stop Music", id: -1};
                    
                } catch(e) { metadata.innerHtml = "Errori nella ricezione delle informazioni"; }
                

            };

            var ui_metadata = function () {
                metadata.title = metadata.innerHTML = (onairinfo.title + " — " + icyinfo.title).replace(/<[^>]+>/g, "");
            };

            /*var scrolleft = 0;
            var scrolldirection = 1;
            var ui_scrolltext = function() {
                var oldscroll = metadata.scrollLeft;
            };*/

            xhr_metadata();
            ui_metadata();
            var metadataid = window.setInterval(xhr_metadata, 60000);
            var uiid = window.setInterval(ui_metadata, 3000);

        },
        // fires when a problem is detected
        error: function () { 
            metadata.innerHTML = "Impossibile avviare il player. Ay Caramba!";
            playerdot.style.backgroundPosition = kPlayerBackgroundHaltPos;
        }

    });

    function cancelEvent(evt) {
            evt.cancelBubble = true;
            evt.returnValue = false;

            if (!evt.stopPropagation)
                return;

            evt.stopPropagation();
            evt.preventDefault();
    }


    if (me) { 
        $("#playercmd").bind("click tap", function(evt) {
            cancelEvent(evt);
            var target = (evt.target ? evt.target : evt.srcElement);

            if (me.paused) {
                target.className = "stop";
                me.play();
            }
            else {
                target.className = "play";
                me.pause(); 
            }
            return false;
        });

        var knob = false;
        var knobwidth = $("#playervolume").width() - 8;
        var knobinnerwidth = $("#playerknob").width() - 8;
        var backgroundposition = (window.getComputedStyle ? window.getComputedStyle(document.getElementById("playerknob"), null).backgroundPosition : document.getElementById("playerknob").currentStyle.backgroundPosition);
        if(!backgroundposition) // IE Hack :(
            backgroundposition = "75px -198px";

        var playerknob = document.getElementById("playerknob");
        playerknob.title = "Volume: " + ~~(me.volume * 100) + "%";

        playerknob.style.backgroundPosition = backgroundposition.replace(/[0-9]+/, "" + (me.volume * knobinnerwidth));
        var wnd;

        $("#playerknob").bind("mousedown touchstart", function(evt) {
            cancelEvent(evt);
            knob = true;
            return false;
        });
        $("#playerknob").bind("mouseup touchend", function(evt) {
            cancelEvent(evt);
            knob = false;
            return false;
        });
        $("#playerknob").bind("mousemove touchmove", function(evt) {
            cancelEvent(evt);

            if (!knob) return;
            var offset = (evt.offsetX ? evt.offsetX : 
                            evt.clientX - this.getBoundingClientRect().left - this.clientLeft + this.scrollLeft);
            var volume = offset / knobinnerwidth;
            me.setVolume(volume);
            this.title = "Volume: " + ~~(volume * 100) + "%";
            this.style.backgroundPosition = backgroundposition.replace(/[0-9]+/, (offset >= knobinnerwidth ? knobinnerwidth: offset));

            return false;
        });
        $("#playerknob").bind("click tap", function(evt){
            cancelEvent(evt);
            var offset = (evt.offsetX ? evt.offsetX : 
                            evt.clientX - this.getBoundingClientRect().left - this.clientLeft + this.scrollLeft);

            var volume = offset / knobinnerwidth;
            me.setVolume(volume);
            this.title = "Volume: " + ~~(volume * 100) + "%";
            this.style.backgroundPosition = backgroundposition.replace(/[0-9]+/, (offset >= knobinnerwidth ? knobinnerwidth: offset) );

            return false;
        });
        $("#playerdetach").bind("click", function(evt) {
            cancelEvent(evt);

            if (!wnd || !wnd.document) {
                if (!me.paused)
                    $("#playercmd").trigger("click");

                wnd = window.open("/standalone", "_blank", "menubar=no,location=no,toolbar=no,resize=no,resizable=no,scrollbars=no,status=no,height=31,width=420");
            }

            wnd.focus();
            return false;
        });
        var fixedplayer = false;
        var toplevel = $('.toplevel');
        $(document).bind("scroll", function(evt){
            if (window.scrollY < toplevel.height()) {
                if (fixedplayer)
                    document.getElementById('playercontainer').className="static";
                fixedplayer = false;
                return;
            }
            document.getElementById('playercontainer').className="fixed";
            fixedplayer = true;
            
        });


        // THIS THING WILL BE DELETED.
        $.getJSON(baseurl + "/programmi.json?_=" + new Date().getTime(), function(data){
            var daytable = ["do", "lu", "ma", "me", "gi", "ve", "sa"];
            var date = new Date();
            var filtered = data.events.filter(function(el, idx, arr){ 
                return el.stato > 0 &&
                        el.start[0] == daytable[date.getDay()];
            });
            var ul = document.createElement("ul");
            ul.className="todayschedule";
            var li = document.createElement("li");

            for (var i = 0; i < filtered.length; i++) {
                var _li = li.cloneNode(li);
                _li.innerHTML = filtered[i].start[1] + ":" + 
                                (filtered[i].start[2]? filtered[i].start[2]: "00") + 
                                " &mdash; " + 
                                filtered[i].title.replace(/<\/*[^>]*>/g, "");
                ul.appendChild(_li);
            }
            document.getElementById("todayschedule").appendChild(ul);
        });
    }

}