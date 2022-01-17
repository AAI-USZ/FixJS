function zoomShow(src, highSrc){

            // 插入低分辨率图片
            var low = '<img id="zoomlayLow" src="'+ src +'">';

            zoomlayPage.html(low);
            zoomlay.fadeIn(800);

            // 如果存在高分辨率图片
            // 插入zoomlay中，并等待加载完毕后替换low图片
            if(highSrc){
                var high = '<img id="zoomlayHigh" src="'+ highSrc +'">';
                zoomlayPage.append(high);

                var $high = $('#zoomlayHigh'),
                    $low = $('#zoomlayLow');

                $high.load(function(){
                    $low.hide();
                    $high.show();
                });
            }
        }