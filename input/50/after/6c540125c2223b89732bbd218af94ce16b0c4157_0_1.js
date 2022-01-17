function() {
            layer.setVisibility(false)
            this_trak.data("ready", true)
            var text = this_trak.text()
            this_trak.text(text.substring(0, text.length - 4))
            
        }