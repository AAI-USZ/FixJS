function(data){

    function remove (arr, index) {

        var arr2 = arr.splice(index).splice(1);

        return arr.concat(arr2);

    };

    var index = -1;

    for(var i = 0; i < bombs.length; i++) {

        if(bombs[i].id == data.bomb.id) {

            index = i;

            break;

        }

    }

    var bomb = data.bomb;

    if(index > -1)

        remove(bombs,index);

    removeBomb(bomb.x,bomb.y);

    clearFlameLayer();

}