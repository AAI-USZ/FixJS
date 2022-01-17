function(match, idx) {
            var matchEl = dom.createElement("div");
            matchEl.className = idx === _self.selectedIdx ? "cc_complete_option_selected" : "cc_complete_option";
            var html = "";
            
            if (match.icon)
                html = "<img src='/static/ext/language/img/" + match.icon + ".png'/>";
            if (!hasIcons || match.icon) {
                html += "<span class='main'><u>" + _self.prefix + "</u>" + match.name.substring(_self.prefix.length);
            }
            else {
                html += "<span class='main'>" + match.name;
                matchEl.style.color = "#666666";
            }
            if (match.meta) {
                html += '<span class="meta">' + match.meta + '</span>';
            }
            html += '</span>';
            matchEl.innerHTML = html;
            matchEl.addEventListener("mouseover", function() {
                _self.matchEls[_self.selectedIdx].className = "cc_complete_option";
                _self.selectedIdx = idx;
                _self.matchEls[_self.selectedIdx].className = "cc_complete_option_selected";
            });
            matchEl.addEventListener("click", function() {
                var amlEditor = editors.currentEditor.amlEditor;
                replaceText(amlEditor.$editor, _self.prefix, match.replaceText);
                amlEditor.focus();
            });
            matchEl.style.height = cursorConfig.lineHeight + "px";
            matchEl.style.color = 0xaaaaaa;
            _self.completionElement.appendChild(matchEl);
            _self.matchEls.push(matchEl);
        }