function _createNote(){
        that.find('.note').qtip({
           content: that.option.note,
           show: 'click',
           hide: 'click',
           position: {
              corner: {
                 target: 'rightMiddle',
                 tooltip: 'leftTop'
              }
           },
            style: { 
                name: 'blue',
                left: 50,
                tip: {
                    corner: "leftTop",
                    color: "#ADD9ED",
                    size: {x: 30, y:8},
                },
                border: {
                      width: 2,
                      radius: 4,
                      color: '#ADD9ED'
                   },        
              'font-size': 12
            }
        });        
    }