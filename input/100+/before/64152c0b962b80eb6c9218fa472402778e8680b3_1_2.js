function(settings)
        {
            this.setSelect('r_style', settings['style']);
            this.setSelect('r_size', settings['size']);
            this.setSelect('r_margin', settings['margin']);
            $('#enable_links').attr('checked', settings['enable_links']);
            
            keybox.keys = settings['keys'];
            if(settings['enable_keys'])
                keybox.enable();
            else
                keybox.disable();

              $('#enable_experimental').attr('checked', settings['enable_experimental']);

            keybox.update();
            this.preview()
            this.markClean();
        }