function () {

                if (listTick[0] && listTick[0].ready) {
                    self.imgWidthStick.push(listTick[0].width + 1);//一个像素空距
                    listTick.splice(0, 1);
                }

                if (!listTick[0]) {


                    var imgListArr = self.imgWidthStick,
                        totalW = eval(imgListArr.join("+")) + imgListArr.length;

                    $(".promotion-list").width(totalW);

                    clearInterval(intervalId);
                    intervalId = null;
                }


            }