function() {
                readjustment_width = this.width()/2;
                $('#real_img').css({
                    "display": "inline",
                    "left": "50%",
                    "margin-left" : -readjustment_width
                });
                $('#real_img').fadeIn(800);
            }