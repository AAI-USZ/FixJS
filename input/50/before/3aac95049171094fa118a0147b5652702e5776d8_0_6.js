function (index, value) {
            value.elem.click(function () { 
                showPath(index);
                return false;
            });
        }