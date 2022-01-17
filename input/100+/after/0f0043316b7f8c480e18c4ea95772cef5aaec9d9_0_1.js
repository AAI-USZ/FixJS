function nextLevel() {
        cp.remove();
        cp = Raphael.colorpicker(div.offset().left, div.offset().top, 250, DEFAULT_COLOR, document.getElementById('colorpicker'));
        var lvl = parseInt($("#current_level").text());
        var next_logo = "";
        var layer = "";

        $("#logo").slideToggle(600);

        switch(lvl) {
            case 2:
                next_logo = "batman_yellow";
                layer = "batman_black";
                break;
            case 3:
                next_logo = "yahoo";
                break;
            case 4:
                next_logo = "dropbox_bw";
                break;
            case 5:
                next_logo = "mcdonalds";
                break;
            case 6:
                next_logo = "starbucks_green";
                layer = "starbucks_white"
                break;
            case 7:
                next_logo = "ibm";
                break;
            case 8:
                next_logo = "shell_red";
                layer = "shell_yellow"
                break;
            case 9:
                next_logo = "apple";
                break;
            case 10:
                $("#tape").hide();
                $("#logo").hide();
                $("#controls").hide();
                $("#instructions").hide();
                var average_score = averageScore(all_scores);
                $("#game").append("<center><h1 id='congrats'>Congrats! Your average score was "+average_score+"</h1></center>");
                $("#game").append('<center><a href="https://twitter.com/intent/tweet?text='+escape("I got "+average_score+"% overall on Brandseen, the logo coloring game http://brandseenapp.com")+'&via=brandseen"><h3>Share your score!</h3></a></center>');
                $("#game").append("<center><table><tr><td>Coca Cola</td><td>"+all_scores[0]+"</td><td>Batman</td><td>"+all_scores[1]+"</td></tr><tr><td>Yahoo</td><td>"+all_scores[2]+"</td><td>Dropbox</td><td>"+all_scores[3]+"</td></tr><tr><td>McDonalds</td><td>"+all_scores[4]+"</td><td>Starbucks</td><td>"+all_scores[5]+"</td></tr><tr><td>IBM</td><td>"+all_scores[6]+"</td><td>Shell</td><td>"+all_scores[7]+"</td></tr><tr><td>Apple</td><td>"+all_scores[8]+"</td></tr></table></center>");
                $("#game").append('<center><img src="/media/images/cat1.jpeg" class="cat" /><img src="/media/images/cat2.jpeg" class="cat" /><img src="/media/images/cat3.jpeg" class="cat" /><img src="/media/images/cat5.jpeg" class="cat" /><img src="/media/images/cat4.jpeg" class="cat" /><img src="/media/images/cat6.jpeg" class="cat" style="vertical-align: top;"/></center>');
                
                $.get("/success", { "score": average_score } );
                break;
            default:
                break;
        }

        if (lvl < 10) {
            $('#img_logo').attr("src", "/media/images/" + next_logo + ".png").attr("alt", next_logo);
            if (layer != "") {
                $('#layer_img').attr("src", "/media/images/" + layer + ".png").css("display", "none");
            }

            cp.onchange = function (clr) {
                color = clr.replace(reg, "#$1$2$3");
                changeLogoColor(color);
            };

            window.setTimeout( function() {
                changeLogoColor(DEFAULT_COLOR);
                $('#layer_img').css("display", "inline");
            }, 800);

            $("#logo").slideToggle(600);
        }

    }