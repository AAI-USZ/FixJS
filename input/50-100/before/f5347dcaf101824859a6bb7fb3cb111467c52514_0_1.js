function(label, options) {
            var button = helpers.dom.button(label, options.callback, options.context, options.type);
            if(options.title) {
                button.addAttribute('title', options.title);
            }
            this.div.appendChild(button);
        }