function () { 
            settings.popupOn = true;
            pubsub.publish('state.persist');

            util.cookie('glimpseKeepPopup', '1');

            //TODO !!!! This needs to be updated once we get going !!!!
            var url = data.currentMetadata().paths.popup; // + '&glimpseRequestID=' + $('#glimpseData').data('glimpse-requestID');
            window.open(url, 'GlimpsePopup', 'width=1100,height=600,status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes');
        }