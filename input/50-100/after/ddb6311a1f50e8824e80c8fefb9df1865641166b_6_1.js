function(txt, className) {
            // returns the width of a label
            var l = $('<div class="label'+(className ? ' '+className : '')+'"><span>'+txt+'</span></div>');
            this.__root.append(l);
            var w = $('span', l).width();
            l.remove();
            return w;
        }