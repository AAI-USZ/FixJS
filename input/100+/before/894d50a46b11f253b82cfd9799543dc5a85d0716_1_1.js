function () {
    var uQuest = {
        _is_active : true,
        _selector : 'a',
        init : function() {
            /*TODO use jquery. At the moment jQuery is not initialized here*/
            /*TODO url path from config*/
            var el = document.createElement('link');
            el.setAttribute('type', 'text/css');
            el.setAttribute('rel', 'stylesheet');
            el.setAttribute('href', 'http://localhost/toolbar2/css/style_inject.css');
            document.getElementsByTagName('head')[0].appendChild(el);
/*          el.setAttribute('type', 'text/css');
            el.innerHTML = '.utorrent-uquest-inject { background-color: yellow };';
*/
        },
        set_state : function(active) {
            this._is_active = active;
            if(this._is_active){
                jQuery(this._selector).each(function(){
                    var span = jQuery('<span>').addClass('utorrent-uquest-span').attr('title', 'Download torrent');
                    jQuery(this).addClass('utorrent-uquest-inject').append(span);
                })
            } else {
                jQuery(this._selector).each(function(){
                    jQuery(this).removeClass('utorrent-uquest-inject').children('.utorrent-uquest-span').remove();
                })
            }
        }
    };

    window.QuestModule = uQuest;
    uQuest.init();

}