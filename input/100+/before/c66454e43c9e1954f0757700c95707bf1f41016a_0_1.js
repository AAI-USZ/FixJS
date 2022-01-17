function check(cont){



    var container = $("#text");

    var twitter = $("#twitter");

    var scroller = $("#rullaaja");

    var n = container.queue("fx");

    var y = twitter.queue("fx");

    var x = $("#text_cont").queue("fx");

    if(n.length > 10){

        container.clearQueue();

    }

    if(y.length > 10){

        twitter.clearQueue();

    }

    if(x.length > 6){

        $("#text_cont").clearQueue();

    }

    fetch = baseurl+'ajax/check/';

    $.getJSON(fetch, function(data) {

        if(data.ret == true){

            $.each(data,function(index,value){

                switch(index){

                    case "ret":

                        break;

                    case "dia":

                        if(value.changed == true){

                            container.hide("puff",700);



                            window.setTimeout(function(){

                                switch(value.part){

                                    case "text":

                                        twitter.hide(290);

                                        $("#text_cont").show('blind',300);

                                        window.setTimeout(function(){

                                            container.html(value.palautus);

                                            $.each(value.pie,function(index2,value2){

                                                if(value2){

                                                    drawTimer(value2,index2);

                                                }

                                            });

                                            window.setTimeout(function(){

                                                container.show('clip',300);

                                            },100);

                                        },300);

                                        break;

                                    case "twitter":

                                        twiit = page;

                                        container.hide("puff",300);

                                        window.setTimeout(function(){

                                            $("#text_cont").hide('blind',300);

                                        },200);

                                        window.setTimeout(function(){

                                            twitter.show(300);

                                        },810);

                                        container.html("");

                                        break;

                                    case "video":

                                        twitter.hide(300);

                                        window.setTimeout(function(){

                                            container.show(0);

                                            $("#text_cont").show(0);

                                            window.setTimeout(function(){

                                                container.html(value.palautus);

                                                flowplayer("player", baseurl+"flowplayer/flowplayer.swf", {

                                                    clip : {

                                                        autoPlay: true,

                                                        autoBuffering: true,

                                                        live:true,

                                                        provider:'influxis'

                                                    },

                                                    plugins:{

                                                        influxis:{

                                                            url:baseurl+'flowplayer/flowplayer.rtmp-3.2.3.swf',

                                                            netConnectionUrl:value.video

                                                        },

                                                        controls: null

                                                    }

                                                });

                                            },100);

                                        },310);

                                        break;

                                }

                            },702);

                        }

                        break;

                    case "fcn":

                        $("#client").html(value.name);

                        break;

                    case "scroller":

                        if(value.changed == true){

                            scroller.html(value.palautus);

                        }

                        break;

                    case "page":

                        page_was = page;

                        page = value;

                        break;

                }

            });

        }

    });

    if(cont == 1){

        window.setTimeout(function(){

            check(1);

        },1500);

    }

}