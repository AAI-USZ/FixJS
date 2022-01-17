function (item,index,oldItem) {
            console.log(oldItem);
            if(item.active == true  && oldItem.active == 'false') {
                console.log("ring! ring!");
                ring.play();
            }
          }