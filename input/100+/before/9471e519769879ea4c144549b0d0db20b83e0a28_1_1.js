function() {
            var target = $('<div></div>').css({'width': '100px', 'height': '100px', 'border': '1px solid #fff', 'z-index': 10}).appendTo(div);

            if (!isIE6) {
                var iframe = new Shim(target[0]);
                iframe.sync();

                expect(iframe.iframe).toBeUndefined();
                expect(iframe.target).toBeUndefined();

                expect(iframe.sync).toBeDefined();
                expect(iframe.destroy).toBeDefined();
            }

        }