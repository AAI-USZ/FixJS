function(e) {
            readymonkey.after('<div class="monkeyName"></div>')
            $('div.monkeyName').text($('div#loginForm input').val())
            obj = stage.getObjectUnderPoint(e.offsetX, e.offsetY);
            if (obj && typeof(obj.referenceObj) != 'undefined') {
                var monkey = obj.referenceObj;
                console.debug(monkey);
                if(monkey === readymonkey) {
                    monkey.cycleModes();
                } else {
                    if(typeof(readymonkey) != 'undefined')  {
                        monkey.setIdle();
                    }
                    readymonkey = monkey;
                    readymonkey.setReady();										
                }
            } else {
                readymonkey.moveTo(e.offsetX, e.offsetY);				
            }
        }