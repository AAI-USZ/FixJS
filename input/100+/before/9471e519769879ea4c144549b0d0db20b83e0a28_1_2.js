function() {
            var target = $('<div></div>').css({'width': '100px', 'height': '100px', 'border': '1px solid #fff', 'z-index': 10}).appendTo(div);

            if (isIE6) {
                var iframe = new Shim(target[0]);
                iframe.sync();

                var iframeOffset = iframe.iframe.offset();
                var elementOffset = iframe.target.offset();

                expect(iframe.iframe.css('height')).toBe('102px');
                expect(iframe.iframe.css('width')).toBe('102px');
                expect(iframeOffset.left).toBe(elementOffset.left);
                expect(iframeOffset.top).toBe(elementOffset.top);
                expect(iframe.iframe.css('z-index')).toBe(9);
            }

        }