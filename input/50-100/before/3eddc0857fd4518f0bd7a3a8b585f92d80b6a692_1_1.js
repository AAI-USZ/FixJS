function (event, ui) {

            if ($(this).children("input").val() == "\\sum") {

                selected = new BigElement("sum");

            }

            else {

                selected = new ContainerElement($(this).children("input").val());

            }            

            selectedX = 0;

            selectedY = 0;

        }