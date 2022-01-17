function() {
            var self = this;
            var o = self.options;
            var sm_size = o['small_ad_size'].split('x');
            var lg_size = o['large_ad_size'].split('x');
            var lg_pos = 'top: 0px;';

            if (o['large_ad_swf_url'].indexOf('?') == -1) {
                o['large_ad_swf_url'] = o['large_ad_swf_url'] + '?clickTAG=' + escape(o['click_thru_url']);
            } else {
                o['large_ad_swf_url'] = o['large_ad_swf_url'] + '&clickTAG=' + escape(o['click_thru_url']);
            }

            // output the small ad
            document.write('<div id="' + o['small_ad_wrap_id'] + '" style="width: ' + sm_size[0] + 'px, height: ' + sm_size[1] + 'px;">');
            document.write(get_template(flash_object_code, {
                width: sm_size[0],
                height: sm_size[1],
                id: o['small_ad_id'],
                swf_url: o['small_ad_swf_url']
            }));
            document.write('</div>');

            // output the large ad
            if (o['expand_effect'] === 'slideLeft')  {
                lg_pos = 'top: 0px; right: 0px;';
            }
            document.write('<div id="' + o['large_ad_wrap_id'] + '" style="position: absolute; ' + lg_pos + ' display: none; z-index: 100001">');
            document.write(get_template(flash_object_code, {
                width: lg_size[0],
                height: lg_size[1],
                id: o['large_ad_id'],
                swf_url: o['large_ad_swf_url']
            }));
            document.write('</div>');

            // add ad hover effects / behaviors
            $('#' + o['small_ad_wrap_id']).hover(
                function() {
                    self.mouse_is_over_sm_ad = true;
                    self.open_ad_timeout = setTimeout(function() { self.open_large_ad(); }, (o.open_delay_time * 1000));
                },
                function() {
                    self.mouse_is_over_sm_ad = false;
                    clearTimeout(self.open_ad_timeout);
                }
            );
            $('#' + o['large_ad_wrap_id']).hover(
                function() {
                    self.mouse_is_over_lg_ad = true;
                },
                function() {
                    self.mouse_is_over_lg_ad = false;
                    self.close_large_ad();
                }
            );

        }