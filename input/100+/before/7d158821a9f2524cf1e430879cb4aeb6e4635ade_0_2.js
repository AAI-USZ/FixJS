function (index, node) {

            var img = $(this),
                imgSrc = img.attr("data-img");


            //预加载图片张数
            if(index < prloadNum){

                listTick.push(
                    self._imgReady(imgSrc, function () {
                        var w = this.width;

                        img.attr("src", imgSrc).removeClass("lazy").css({opacity:0.3}).animate({
                            opacity:1
                        }, 100);

                        img.parents("li").width(w);
                    })
                )

            }

        }