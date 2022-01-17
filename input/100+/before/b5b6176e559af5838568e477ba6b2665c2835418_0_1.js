function () {
        this.loadProgressView = new W.Views.AppCacheProgress();
        $('#appcacheLoader').append(this.loadProgressView.render().el);

        this.areaList = new L.Views.Areas({collection: P.Areas});
        $('#areas').html(this.areaList.render().el);

        this.markList = new L.Views.MarkList({
            collection: P.register
        });
        $('#marks').html(this.markList.render().el);

        this.navigation = new L.Views.Navigation({el: '#nav'});

        REIN.events.on('filter:area', L.showArea, this);
        REIN.events.on('filter:districts', L.showMarksInDistricts, this);
    }