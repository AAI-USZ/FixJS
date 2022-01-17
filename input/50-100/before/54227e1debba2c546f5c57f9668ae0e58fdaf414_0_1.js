function(data){
                pop.style.display = 'block';
                pop.style.width = '500px';
                $(pop).center();
                $(bg).show().center();
                afd.innerHTML = data;
                afd.onmouseup = function(){
                    input.setAttribute('value', getSelectedText().trim());
                }
                submit.onclick = addTheTrack;
                submit.onkeydown = addTheTrack;
            }