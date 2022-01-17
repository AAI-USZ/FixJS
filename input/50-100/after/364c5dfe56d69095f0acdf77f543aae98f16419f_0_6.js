function (md) {

            var w = md.scaleInfo.width,

                h = md.scaleInfo.height;

            return $('<var width="' + w + '" height="' + h 

                + '" style="zoom:1;overflow:hidden;display:block;width:' 

                + w + 'px;height:' + h + 'px;"></var>')[0];

        }