function(event) {
                event.preventDefault();
                $('content').addClass('contentLoading');
                //spinner.startSpin();
                History.push(this.get('href'));
            }