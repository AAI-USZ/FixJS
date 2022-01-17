function(event, ui) {

            //Get X position of mouse relative to the canvas

            var x = event.pageX - canvas.offsetLeft;

            var y = event.pageY - canvas.offsetTop;



            //Must be this type of loop so that n increments at the end

            for (var n = 0; n < mathElements.length; n++) {

                if (x - selectedX < mathElements[n].x + (mathElements[n].width / 2))

                    break;

            }

            //Set the new location

            selectedPos = n;



            $(ui.helper).hide();



            selected.x = x - selectedX;

            selected.y = y - selectedY;

            addElement(selected, selectedPos);

        }