function(){
    new LazyLoad({elements:'img.ll'});
   /* AC.profileLinkTips = new FloatingTips($$('a.user-link'), {
        html:true,
        position:'right',
        content:function(e){
            var tt = e.get('data-profileinfo');
            if(tt) return new Element('div', {html:tt});
            AC.ajax('profileinfo', {
                id:e.get('data-profile')
            }, function(res, tree){
                $$('a[href=' + e.get('href') + ']').set('data-profileinfo', tree[0].get('html'));
                setTimeout(function(){
                    $$('a[href=' + e.get('href') + ']').set('data-profileinfo', null);
                }, 30000);
                AC.profileLinkTips.hide(e).show(e);
            }.bind(this), 'get');
            return "Načítám...";
        }
    });*/
    if(window.AUTHENTICATED && false){
        var iddlebar = new MoogressBar('iddlebar', {
            bgImage:'http://static.aragorn.cz/images/dark/progressbar/blue.gif', 
            hide:false, 
            label:false, 
            fx:false
        });
        iddlebar.setPercentage(100)
        iddlebar.parent.set('title', 'OdpoÄŤet neaktivity');
        iddlebar.addEvent('change', function(p){
            this.bar.set('text', Math.round(60 * p / 100) + ' minut');
        });
        iddlebar.interval = setInterval(function(){
            this.increasePercentage(-1);
        }.bind(iddlebar), 1000);
    }
    if(!Browser.ie && false){ // @todo fix doubleclick bug
        History.addEvent('change', function(url){
            if(!this.req)
                this.req = new Request.HTML({
                    url: url,
                    link:'cancel',
                    evalScripts:true,
                    evalResponse:true,
                    update:$('content'),
                    onComplete:function(){
                        AC.resetInactivity();
                        $('content').removeClass('contentLoading');
                        //AC.profileLinkTips.attach($$('a.user-link'));
                        //spinner.stopSpin();
                    },
                    onFailure:function(){
                        AC.message('Chyba', 'StrĂˇnku se nepodaĹ™ilo naÄŤĂ­st.');
                        location.href = url;
                    }
                });
            this.req.send({'url':url});
        });
        if(!Browser.ie || location.href.indexOf('mistnost') == -1 )
            History.handleInitialState();
        if($$('#content').length){
            $(document.body).addEvent('click:relay(a.ajax)', function(event) {
                event.stop();
                if($(this).get('xhrrunning')){
                    $(this).erase('xhrrunning');
                }else{
                    $(this).set('xhrrunning',true);
                    return;
                }
                $('content').addClass('contentLoading');
                //spinner.startSpin();
                History.push(this.get('href'));
            });
        }
        var fn = function(e){
            if(e.type == 'change' || (e.type == 'keyup' && e.key == 'enter') || e.target.id == 'btnStatus'){
                AC.ajax('statusupdate', {id:$('msgStatus').get('value')});
                $('msgStatus').blur();
            }
        };
        $$('#msgStatus,#btnStatus').addEvents({'keyup':fn, 'click':fn});
    }
}