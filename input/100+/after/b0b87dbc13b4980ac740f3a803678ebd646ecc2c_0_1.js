function(message){
    if(Solstice.hasDevelopmentMode()){
        if(window.console){
            if(! document.getElementById('sol_js_warning_flasher')){
                var flasher = document.createElement('div');
                flasher.setAttribute('class', 'soldevjslog');
                flasher.innerHTML = 'There is JS error content in your console.log!';
                flasher.setAttribute('id', 'sol_js_warning_flasher');
                document.body.appendChild(flasher);
                new Solstice.Element(flasher).fadeToBlock();
                setTimeout('new Solstice.Element("sol_js_warning_flasher").fadeOutAndDestroy()', 5*1000);
            }

            if (window.console.trace) {
                window.console.trace(message);
            }
            else {
                window.console.trace(message);
            }

        }else{
            alert(message);
        }
    }
}