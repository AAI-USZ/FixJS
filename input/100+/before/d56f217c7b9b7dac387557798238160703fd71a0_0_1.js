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
                $("#logo").hide();
                $("#controls").hide();
                $("#instructions").hide();
                var average_score = averageScore(all_scores);
                $("#game").append("<h1>Congrats! Your average score was "+average_score+"</h1>")
                $("#game").append('<img src="/media/images/cat1.jpeg" class="cat" />')
                        .append('<img src="/media/images/cat2.jpeg" class="cat" />')
                        .append('<img src="/media/images/cat3.jpeg" class="cat" />')
                        .append('<img src="/media/images/cat4.jpeg" class="cat" />')
                        .append('<img src="/media/images/cat5.jpeg" class="cat" />')
                        .append('<img src="/media/images/cat6.jpeg" class="cat" />');
                break;
            default:
                break;
        }

        $('#img_logo').attr("src", "/media/images/" + next_logo + ".png").attr("alt", next_logo);
        if (layer != "") {
            $('#layer_img').attr("src", "/media/images/" + layer + ".png").css("display", "inline");
        }

        cp.onchange = function (clr) {
            color = clr.replace(reg, "#$1$2$3");
            changeLogoColor(color);
        };

        changeLogoColor(DEFAULT_COLOR);
        $("#logo").slideToggle(800).delay(200);
        changeLogoColor(DEFAULT_COLOR);
    }