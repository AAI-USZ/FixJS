function(e) {

                if(!this.movingElement)

                   return;

                if (e.touches.length > 1) {

                    return this.touchEnd(e);

                }

                

                var rawDelta = {

                    x: e.touches[0].pageX - this.startX,

                    y: e.touches[0].pageY - this.startY

                };

                

                if (this.vertical) {

                    var movePos = { x: 0, y: 0 };

                    this.dy = e.touches[0].pageY - this.startY;

                    this.dy += this.cssMoveStart;

                    movePos.y = this.dy;

                    e.preventDefault();

                    //e.stopPropagation();

                } else {

                    if (!this.lockMove&&isHorizontalSwipe(rawDelta.x, rawDelta.y)) {

                         

                        var movePos = {x: 0,y: 0};

                        this.dx = e.touches[0].pageX - this.startX;

                        this.dx += this.cssMoveStart;

                        e.preventDefault();

                      //  e.stopPropagation();

                        movePos.x = this.dx;

                    }

                    else

                       return this.lockMove=true;

                }

                

                var totalMoved = this.vertical ? ((this.dy % this.myDivHeight) / this.myDivHeight * 100) * -1 : ((this.dx % this.myDivWidth) / this.myDivWidth * 100) * -1; // get a percentage of movement.

                if(movePos)

                    this.moveCSS3(this.el, movePos);

            }