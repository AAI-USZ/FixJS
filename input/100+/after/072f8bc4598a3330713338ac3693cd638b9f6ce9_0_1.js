function(index){
        var diff = this.active - index,
            width = this.options.card_width + (diff * 5),
            style = {};

        if(diff < -3 && 7 == 8){
            style = {
                'z-index': this.options.zindex + diff,
                width: '90%',
                left: '5%',
                top: '-7%',
                height: '100%',
                opacity: 1
            };
        }else if(diff === 0){
            style = {            
                width: '110%',
                left: '-5%',
                height: '100%',
                top: '2%',
                'z-index': this.options.zindex += 1,
                opacity: 1,
                height: '100%'
            };
        }else if(diff > 0){
            style = {
                width: '115%',
                left: '-7.5%',
                height: '105%',
                opacity: 0,
                top: '0%',
                'z-index': this.options.zindex + this.cards.length
            };
        }else{
            style = {
                'z-index': this.options.zindex + diff,
                width: width + '%',
                left: ((100 - width) / 2) + '%',
                top: diff * 2 + 1 + '%',
                height: '100%',
                opacity: 1 + (diff / 10)
            };
            console.log('dd', 1 - (diff / 100))
        }

        return style;
    }