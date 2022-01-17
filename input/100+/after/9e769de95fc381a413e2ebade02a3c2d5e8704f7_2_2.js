function saveConfig(){
    var cfg = JSON.parse(localStorage['ChromeLL-Config']);
    inputs = $(":checkbox");
    for(var i in inputs){
        cfg[inputs[i].id] = inputs[i].checked;
    }
    var textboxes = $(":text");
    for(var i in textboxes){
        if(textboxes[i].name && textboxes[i].name.match('user_highlight_')){
            //textboxes[i].ColorPicker();
        }else{
            cfg[textboxes[i].id] = textboxes[i].value;
        }
    }
    var userhlData = document.getElementById('user_highlight').getElementsByClassName('user_highlight_data');
    var name;
    cfg.user_highlight_data = {};
    for(var i = 0; userhlData[i]; i++){
        name = userhlData[i].getElementsByClassName('user_name')[0].value.toLowerCase();
        if(name != ''){
            cfg.user_highlight_data[name] = {};
            cfg.user_highlight_data[name].bg = userhlData[i].getElementsByClassName('header_bg')[0].value;
            userhlData[i].getElementsByClassName('user_name')[0].style.background = '#' + cfg.user_highlight_data[name].bg;
            cfg.user_highlight_data[name].color = userhlData[i].getElementsByClassName('header_color')[0].value;
            userhlData[i].getElementsByClassName('user_name')[0].style.color = '#' + cfg.user_highlight_data[name].color;
        }
    }
    userhlData = document.getElementById('keyword_highlight').getElementsByClassName('keyword_highlight_data');
    cfg.keyword_highlight_data = {};
    var j = 0;
    for(var i = 0; userhlData[i]; i++){
        name = userhlData[i].getElementsByClassName('keyword')[0].value.toLowerCase();
        if(name != ''){
            cfg.keyword_highlight_data[j] = {};
            cfg.keyword_highlight_data[j].match = name;
            cfg.keyword_highlight_data[j].bg = userhlData[i].getElementsByClassName('keyword_bg')[0].value;
            userhlData[i].getElementsByClassName('keyword')[0].style.background = '#' + cfg.keyword_highlight_data[j].bg;
            cfg.keyword_highlight_data[j].color = userhlData[i].getElementsByClassName('keyword_color')[0].value;
            userhlData[i].getElementsByClassName('keyword')[0].style.color = '#' + cfg.keyword_highlight_data[j].color;
            j++;
        }
    }
    var userhlData = document.getElementById('post_template').getElementsByClassName('post_template_data');
    cfg.post_template_data = {};
    for(var i = 0; userhlData[i]; i++){
        name = userhlData[i].getElementsByClassName('template_title')[0].value;
        if(name != ''){
            cfg.post_template_data[name] = {};
            cfg.post_template_data[name].text = userhlData[i].getElementsByClassName('template_text')[0].value;
        }
    }
    localStorage['ChromeLL-Config'] = JSON.stringify(cfg);
    allBg.init_listener(cfg);
    var splitConfig = {};
    for(var i = 0; split[i]; i++){
        splitConfig[split[i]] = cfg[split[i]];
        delete cfg[split[i]];
    }
    splitConfig.cfg = cfg;
    for(var i in splitConfig){
        chrome.storage.sync.set({i: splitConfig[i]});
        console.log(i, splitConfig[i]);
    }
}