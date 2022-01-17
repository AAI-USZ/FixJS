function (selector) {

        var shuffleButton = $(selector);



        //TODO: Remove dependency on checking for class.

        shuffleButton.disable = function () {

            $(this).find('.path').css('fill', 'gray');

            this.attr('src', "images/shuffle-disabled.png").addClass('disabled').off('click');

        };



        //TODO: Remove dependency on checking for class.

        shuffleButton.enable = function () {

            this.attr('src', "images/shuffle.png").removeClass('disabled').off('click').one('click', ShuffleSong);

            $(this).find('.path').css('fill', 'white');

            var self = this;

            function ShuffleSong() {

                //This will trigger an update. Necessary since no state change.

                Player.shuffle();

                //Prevent spamming by only allowing a shuffle click once a second.

                setTimeout(function () { self.off('click').one('click', ShuffleSong) }, 1000);

            };

        };



        return shuffleButton;

    }