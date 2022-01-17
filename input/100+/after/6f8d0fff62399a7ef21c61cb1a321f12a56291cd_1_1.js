function ($) {
    var is_chrome = (navigator.userAgent.match(/chrome/i) || navigator.userAgent.match(/chromium/i));

    window.QuestModule = {
        _is_active : false,
        _selector : 'a',
        initialize : function() {
            /*TODO url path from config*/
            var host = 'http://localhost/toolbar2/';

            $('<link>').attr('type', 'text/css').attr('rel', 'stylesheet')
                .attr('href', host + 'css/style_inject.css')
                .appendTo('head');

            /*TODO Remove this workaround after conduit fix chrome*/
            if(is_chrome) {
                this._chrome_callback('injection_initialized');
            } else {
                EBCallBackMessageReceived('injection_initialized');
            }
        },
        set_state : function(active) {
            this._is_active = active;
            if(this._is_active){
                $(this._selector).each(function(){
                    var span = jQuery('<span>').addClass('utorrent-uquest-span').attr('title', 'Download torrent');
                    jQuery(this).addClass('utorrent-uquest-inject').append(span);
                })
            } else {
                $(this._selector).each(function(){
                    jQuery(this).removeClass('utorrent-uquest-inject').children('.utorrent-uquest-span').remove();
                })
            }
        },
        _chrome_callback : function(msg) {
            try {
                var sendMessageEvent = {'name': 'sendMessage','data': {key:msg},'sourceAPI': 'ToolbarApi','targetAPI': 'BcApi'};
                if (document && document.location && document.location.href.toUpperCase().indexOf('FACEBOOK.COM') === -1) {
                    window.postMessage(JSON.stringify(sendMessageEvent), '*');
                }
            } catch(e) {
                console.error('BCAPI ERROR: ', e, e.stack);
            }
        }
    };

    window.QuestModule.initialize();

}