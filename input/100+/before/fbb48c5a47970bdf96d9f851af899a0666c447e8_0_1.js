function(e) {
        e.preventDefault();
        if (!$(this).attr("disabled")) {
            $('#next').css("display", "block").attr("disabled", true);
            $(this).css("display", "none");

            logo = $('#img_logo').attr("alt");
            var score = colorDifference(color, BRAIN[logo]);
            all_scores.push(score);
            $("#after_score").css('display', 'block');
            $("#score").countTo({
                "interval": 10,
                "startNumber": 0,
                "endNumber": score,
                "onFinish": function() {
                    $('#next').attr("disabled", false);
                    $("#score").text(score);
                }
            });

            if (logo.indexOf("_") != -1) {
                $("#real_img").attr("src", "/media/images/" + logo.split("_")[0] + ".png")
                            .fadeIn(800);
                $("a#tweetintent").attr("href", "https://twitter.com/intent/tweet?text=I got "+score+" / 100 for the \""+logo.split("_")[0].capitalize()+"\" logo http://brandseenapp.com/&via=brandseen");

            } else {
                $("#real_img").attr("src", "/media/images/" + logo + ".png")
                            .fadeIn(800);
                $("a#tweetintent").attr("href", "https://twitter.com/intent/tweet?text=I got "+score+" / 100 for the \""+logo.capitalize()+"\" logo http://brandseenapp.com/&via=brandseen");
            }
        }

    }