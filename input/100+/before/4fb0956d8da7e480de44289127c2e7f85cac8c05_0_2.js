function flick ($target) {

                var probability = Math.random(),
                    transition = Math.random() * 200;

                // If the 'continue' property of deliberatly set to false, exit
                if ($target.data("flicker").active === false) {
                    return false;
                }

                if (probability < 0.1) {
                    flick($target);
                } else {
                    $target.animate({ opacity: Math.random() + 0.7 }, transition).delay(Math.random() * transition).animate({ opacity: 1 }, transition, function() {
                        flick($target);
                    });
                }

            }