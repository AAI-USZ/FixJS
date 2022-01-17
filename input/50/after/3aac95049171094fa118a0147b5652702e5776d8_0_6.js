function (index, value) {
            value.elem.click(function () { 
                showFile(index);
                return false;
            });
        }