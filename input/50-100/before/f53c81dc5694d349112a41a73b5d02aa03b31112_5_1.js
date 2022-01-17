function (center) {
            var $data = this.data('gmap');
            if ($data.opts.log) {console.log('delayed setMapCenter called'); }
            if ($data.gmap !== undefined) {
                $data.gmap.setCenter(center);
            } else {
                var that = this;
                window.setTimeout(function () {methods._setMapCenter.apply(that, [center]); }, 500);
            }
        }