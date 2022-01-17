function (father) {
            //you use a promise now because this is not an
            //executeInOrderBlock
            return father.children.then(function (children) {
                console.log(father.name + " has " + children.length + " children");
                if (children.length) {
                    console.log("The children's names are " + children.map(function (child) {
                        return child.name;
                    }))
                }
            });
        }