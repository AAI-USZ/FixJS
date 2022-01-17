function(b) {
            b.disabled = true;
            if (b.identify() == buttonClicked) {
                form.insert(new Element('input',{type:'hidden', name:b.name, value:b.attributes.getNamedItem('value').nodeValue}));
            }
        }