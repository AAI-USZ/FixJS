function(veos) {
    var self = veos;

    self.lastLoc = new google.maps.LatLng(43.6621614579938, -79.39527873417967); // FIXME: default hard-coded to toronto; maybe make it based on last report?

    self.alert = function (msg, title) {
        if (navigator === undefined || navigator.notification === undefined) {
            alert(msg);
        } else {
            navigator.notification.alert(msg, null, title);
        }
    };

    /**
        Initializes the whole app. This needs to be called at the bottom of every VEOS page.
    **/
    self.init = function () {
        if (window.location.pathname == "/") {
            console.log("Redirecting to /overview-map.html");
            window.location.href = "/overview-map.html";
            return;
        }

        // FIXME: hacky... needs to be here for proper phongep init :(
        document.addEventListener('deviceready', function() {
            console.log("DEVICE READY!!!!");
            jQuery(document).delegate('.acquire-photo', 'click', function() {
                var photo = new veos.model.Photo();
                var of = jQuery(this).data('photo-of');

                var captureSuccess = function () {
                    console.log("Acquired photo of '"+of+'".');

                    veos.reportForm.photos[of].push(photo);
                    photo.upload();
                    veos.reportForm.renderPhotos();
                };

                photo.on('image_capture', captureSuccess, photo);
                
                switch (jQuery(this).data('acquire-from')) {
                    case 'camera':
                        photo.captureFromCamera();
                        break;
                    case 'gallery':
                        photo.captureFromGallery();
                        break;
                    default:
                        console.error("'"+jQuery(this).data('acquire-from')+"' is not a valid source for acquiring a photo.");
                }
            });
        });


        jQuery(self).bind('haveloc', function (ev, geoloc) {
            console.log("Got updated gps location: ", geoloc);
            self.lastLoc = geoloc;
        });

        jQuery(document)

        /** overview-map.html (overview-map-page) **/
            .delegate("#overview-map-page", "pageshow", function() {
                var map = new veos.map.Map('#overview-map-canvas');

                // add all report markers
                var reports = new veos.model.Reports();
                reports.on('reset', function(collection) {
                    map.addReportMarkers(collection);
                });
                reports.fetch();
                

                // start following user
                map.startFollowing();
            })

        /** report.html (report-page) **/
            .delegate("#report-page", "pageshow", function(ev) {
                if (!self.currentReport) {
                    self.currentReport = new veos.model.Report();

                    if (veos.lastLoc) {
                        var initLoc = veos.map.convertGeolocToGmapLatLng(veos.lastLoc);
                        self.currentReport.set('loc_lng_from_gps', initLoc.lng());
                        self.currentReport.set('loc_lat_from_gps', initLoc.lat());
                    }
                }

                if (!self.reportForm) {
                    self.reportForm = new veos.view.ReportForm({
                        el: ev.target,
                        model: self.currentReport
                    });
                }

                if (!self.reportForm.$el.data('initialized')) {
                    console.log("Pointing ReportForm to "+ev.target);
                    self.reportForm.setElement(ev.target);
                    self.reportForm.$el.data('initialized', true);
                }
                
                self.reportForm.render();

                // this needs to go in here to make the refined map work, I believe. But it may also be causing the wierd viewport issues
                //report.init();
            })
    
        /** refine-location.html (refine-location-page) **/
            .delegate("#refine-location-page", "pageshow", function() {
                if (!veos.reportForm) {
                    console.error("Cannot refine location because there is no report currently in progress.");
                    jQuery.mobile.changePage("report.html");
                    return;
                }
                
                
                var map = new veos.map.Map('#refine-location-canvas');
                map.addReportRefinerMarker(self.reportForm.model, veos.lastLoc);
            })

        /** reports-list.html (reports-list-page) TODO: TO BE REPLACED**/
            .delegate("#reports-list-page", "pageshow", function(ev) {
                var view = new veos.view.ReportList({
                    el: ev.target
                });
                
                view.fetchNearby();
            })

        /** report-selection.html (report-selection-page) **/
            .delegate("#report-selection-page", "pageshow", function(ev) {
                var view = new veos.view.ReportList({
                    el: ev.target
                });
                
                view.fetchNearby();
            })            

        /** report-details.html (report-details-page) **/
            .delegate("#report-details-page", "pageshow", function(ev) {
                console.log("Showing details page at "+window.location.href);
                var reportId = window.location.href.match("[\\?&]id=(\\d+)")[1];
                console.log("Showing details for report "+reportId);

                var report = new veos.model.Report({id: reportId});

                var view = new veos.view.ReportDetail({
                    el: ev.target,
                    model: report
                });
                
                view.showLoader();
                view.model.fetch();
            });
    };

    return self;
})(window.veos || {}