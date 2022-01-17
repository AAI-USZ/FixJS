function (item,index,oldItem) {
            console.log("Old: " + oldItem.active + " New: " + item.active);
            if(item.active == true  && oldItem.active == 'false') {
                console.log("ring! ring!");
                ring.play();
            }
          }