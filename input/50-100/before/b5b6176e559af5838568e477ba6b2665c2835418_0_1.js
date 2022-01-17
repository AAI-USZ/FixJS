function (active, id) {
            $districts = $('.districts');
            $districts.css({opacity: 1});
            this.districtList = new L.Views.Districts({collection: this.collection[id].districts});
            $('#districts').html(this.districtList.render().el);
            REIN.events.trigger('filter:area', id);

            //TODO: Make smoother or remove
            window.scrollTo(0, $districts.offset().top);
        }