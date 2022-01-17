function(oPos, nPos, positionType) {

                var revertMark = false;

                var holdMark = false;



                if(positionType === 0) {

                    if(oPos.match(/left[\+\-]*/i) && nPos === 'right') {

                        revertMark = true;

                    }



                    if(oPos.match(/right[\+\-]*/i) && nPos === 'left') {

                        revertMark = true;

                    }



                    if(oPos.match(/left[\+\-]*/i) && nPos === 'left') {

                        holdMark = true;

                    }



                    if(oPos.match(/right[\+\-]*/i) && nPos === 'right') {

                        holdMark = true;

                    }

                }



                if(positionType === 1) {

                    if(oPos.match(/top[\+\-]*/i) && nPos === 'bottom') {

                        revertMark = true;

                    }



                    if(oPos.match(/bottom[\+\-]*/i) && nPos === 'top') {

                        revertMark = true;

                    }



                    if(oPos.match(/bottom[\+\-]*/i) && nPos === 'bottom') {

                        holdMark = true;

                    }



                    if(oPos.match(/top[\+\-]*/i) && nPos === 'top') {

                        holdMark = true;

                    }

                }



                if(revertMark) {

                    return oPos.replace(/(\w+)([\+\-]*)/i, function($, $1, $2) {

                        $2 = $2.replace(/^.*$/i, function($) {

                            if($ === '+') return '-';

                            if($ === '-') return '+';



                            return $;

                        });



                        return nPos + $2;

                    });

                }



                if(holdMark) {

                    return oPos.replace(/\w+/i, nPos);

                }



                return nPos;

            }