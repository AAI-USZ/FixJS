function (i,e) {

                    maskContext.save();

                    maskContext.beginPath();

                    me.renderShape(maskContext, e.mapArea);

                    maskContext.closePath();

                    maskContext.clip();

                    maskContext.lineWidth = 0;

                    maskContext.fillStyle = '#000';

                    maskContext.fill();

                    maskContext.restore();

                }