function (event, ui) {

            selected = null;

            for (var n in bigs) {

                if ($(this).children("input").val() == bigs[n]) {

                    selected = new BigElement(bigs[n].substr(1));

                    return;

                }

            }

            if (selected == null) {

                selected = new ContainerElement($(this).children("input").val());

            }

            selectedX = 0;

            selectedY = 0;

        }