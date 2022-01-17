function restoreConfig(){
    console.log('loading config');
    var config = JSON.parse(localStorage['ChromeLL-Config']);
    var checkboxes = $(":checkbox");
    for(var i in checkboxes){
        checkboxes[i].checked = config[checkboxes[i].id];
    }
    var textboxes = $(":text");
    for(var i in textboxes){
        if(textboxes[i].name && (textboxes[i].name.match('(user|keyword)_highlight_') || textboxes[i].name.match('post_template'))){
            //console.log('found a textbox to ignore: ' + textboxes[i]);
        }else if(config[textboxes[i].id]){
            textboxes[i].value = config[textboxes[i].id];
        }
    }
    for(var j in config.user_highlight_data){
        document.getElementsByClassName('user_name')[document.getElementsByClassName('user_name').length - 1].value = j;
        document.getElementsByClassName('header_bg')[document.getElementsByClassName('header_bg').length - 1].value = config.user_highlight_data[j].bg;
        document.getElementsByClassName('header_color')[document.getElementsByClassName('header_color').length - 1].value = config.user_highlight_data[j].color;
        addUserHighlightDiv();
    }
    for(var j = 0; config.keyword_highlight_data[j]; j++){
        document.getElementsByClassName('keyword')[document.getElementsByClassName('keyword').length - 1].value = config.keyword_highlight_data[j].match;
        document.getElementsByClassName('keyword_bg')[document.getElementsByClassName('keyword_bg').length - 1].value = config.keyword_highlight_data[j].bg;
        document.getElementsByClassName('keyword_color')[document.getElementsByClassName('keyword_color').length - 1].value = config.keyword_highlight_data[j].color;
        addKeywordHighlightDiv();
    }
    for(var j in config.post_template_data){
        document.getElementsByClassName('template_text')[document.getElementsByClassName('template_text').length - 1].value = config.post_template_data[j].text;
        document.getElementsByClassName('template_title')[document.getElementsByClassName('template_title').length - 1].value = j;
        addPostTemplateDiv();
    }
    //add a listener to add userhighlight boxes
    document.addEventListener('keyup', function(evt){
        if(!evt.target.name) return;
        if(evt.target.name == "user_highlight_username"){
            var datas = document.getElementById('user_highlight').getElementsByClassName('user_name');
            var empty = false;
            for(var i = 1; datas[i]; i++){
                if(datas[i].value == '') empty = true;
            }
            if(!empty) addUserHighlightDiv();
        }
        if(evt.target.name == "post_template_title"){
            var datas = document.getElementById('post_template').getElementsByClassName('template_title');
            var empty = false;
            for(var i = 1; datas[i]; i++){
                if(datas[i].value == '') empty = true;
            }
            if(!empty) addPostTemplateDiv();
        }
        if(evt.target.name == "keyword_highlight_keyword"){
            var datas = document.getElementById('keyword_highlight').getElementsByClassName('keyword');
            var empty = false;
            for(var i = 1; datas[i]; i++){
                if(datas[i].value == '') empty = true;
            }
            if(!empty) addKeywordHighlightDiv();
        }
    });
    
    // show version
    var app = chrome.app.getDetails();
    document.getElementById('version').innerText = app.version;
    document.getElementById('ignorator').addEventListener('click', ignoratorClick);
    document.getElementById('enable_user_highlight').addEventListener('click', highlightClick);
    document.getElementById('showcfg').addEventListener('click', showcfg);
    document.getElementById('loadcfg').addEventListener('click', loadcfg);
    setColorPicker();
    saveConfig();
}