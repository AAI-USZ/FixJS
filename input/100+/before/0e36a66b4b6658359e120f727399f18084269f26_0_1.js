function (e) {
            e.preventDefault();
            jq('#linktype_panel div', document).removeClass('current');
            jq(this, document).parent('div').addClass('current');
            switch (jq(this).attr('href')) {
                case "#internal":
                    self.displayPanel('browse');
                    break;
                case "#external":
                    self.displayPanel('external');
                    break;
                case "#email":
                    self.displayPanel('email');
                    break;
                case "#anchor":
                    self.displayPanel('anchor');
                    break;
            }
        }