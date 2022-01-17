function (item,index,oldItem) {
            if(item.active  && !oldItem.active) {
                console.log("ring! ring!");
                ring.play();
            }
          }