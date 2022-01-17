function (elem, btnConfig) {
                var target = $(elem).parents('.tweet-button-container').siblings('.text-area').find('.twitter-anywhere-tweet-box-editor');
                if( target.length < 1 ) target = $(elem).parents('.tweet-button').siblings('.tweet-content').find('.tweet-box');
                $(target).on('keyup focus blur change paste cut', function (e) {
                    var val = $(this).val();
                    var counter = $(elem).siblings('.tweet-counter').text() || $(elem).siblings('.tweet-counter').val();
                    if ( val.length > 0 && counter > -1 && val !== "Compose new Tweet...") {
                        $(elem).removeClass('disabled').attr('style', btnConfig.style);
                    } else {
                        $(elem).addClass('disabled').attr('style', btnConfig.default);
                    }
                });
            }