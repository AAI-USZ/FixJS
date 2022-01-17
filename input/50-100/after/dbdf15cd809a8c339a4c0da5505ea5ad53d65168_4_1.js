function(){
            var cnt = 0;
            makeCE('.foo');
            ce.each(function(el){
                if (el.dom.id == 'd') {
                    return false;
                }
                ++cnt;
            });
            expect(cnt).toBe(1);
        }