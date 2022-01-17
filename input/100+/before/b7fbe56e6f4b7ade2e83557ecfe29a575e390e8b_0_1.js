function (ele){
            return ele.nodeType === 1 ? ele.innerHTML.toLowerCase() : null;
        }