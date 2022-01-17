function () {
        var duration = 100;
        // $("#header img").attr("src", "/img/poebao-smaller.png");
        $("#header img").animate({width: "120px"}, { duration: duration, queue: false });
        $("#header").animate({height: "52px"}, { duration: duration, queue: false });
        $("#header").animate({"padding-top": "0px"}, { duration: duration, queue: false });
        $("#nav").animate({"margin-top": "12px"}, { duration: duration, queue: false });
    }