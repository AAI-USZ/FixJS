function() {
        var styleNode = document.createElement('style');
        styleNode.innerHTML = boxStyle;
        document.getElementsByTagName('head')[0].appendChild(styleNode);
        
        this._dom = document.createElement('div');
        this._dom.setAttribute('class' , 'highlighter-code-box');
        this._dom.innerHTML = boxTemplate;
        document.body.appendChild(this._dom);
        this._init = true;
        var that = this;
        var language = this.language = document.getElementById('codeLanguage');
        var textarea = this.textarea = document.getElementById('codeInput');
        var cancel = document.getElementById('codeCancelButton');
        var insert = document.getElementById('codeInsertButton');
        var html = '';
        for(var i in languages){
            html += '<option value="' + languages[i] + '">' + i + '</option>';
        }
        language.innerHTML = html;
        cancel.onclick = function(){
            that.hide();
        }
        insert.onclick = function(){
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
    }