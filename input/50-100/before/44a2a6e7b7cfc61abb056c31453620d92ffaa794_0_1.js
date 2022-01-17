function (item,index,oldItem) {
            console.log("Old: " + oldItem.active + " New: " + item.active);
            if(item.active  && !oldItem.active) {
                console.log("ring! ring!");
                ring.play();
            }
          }