function(field, max) {

    var maxTries = 1000;

    while(max > 0 && maxTries > 0) {

        maxTries--;

        var x = Math.floor(Math.random()*field.width);

        var y = Math.floor(Math.random()*field.height);

        if(x >= 2 && x < field.width - 2 && y >= 2 && y < field.height - 2) {

            if(field.getNode(x, y) && !field.getNode(x, y).containedEntity) {

                field.getNode(x, y).place(entityFactory.entity(x, y, -1, 'obstacle'));

                max--;

            }

        }

    }

}