function (e) {
                    var val = $(this).val();
                    var counter = $(elem).siblings('.tweet-counter').text() || $(elem).siblings('.tweet-counter').val();
                    if ( val.length > 0 && counter > -1 && val !== "Compose new Tweet...") {
                        $(elem).removeClass('disabled').attr('style', btnConfig.style);
                    } else {
                        $(elem).addClass('disabled').attr('style', btnConfig.default);
                    }
                }