function(){
            var text = textarea.value;
            var lan = language.value;
            var label = language.options[language.selectedIndex].innerHTML;
            text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            text = '<pre class="brush: ' + lan + '; title: ' + label + '">' + text + '</pre>';
            that._action && that._action(text);
            that.hide();
            if(localStorage){
                localStorage['lastLanguage'] = lan;
            }
        }