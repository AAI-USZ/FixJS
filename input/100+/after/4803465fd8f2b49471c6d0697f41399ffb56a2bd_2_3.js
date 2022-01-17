function () {

        return {

            complete: this.complete,

            resizing: this.currentAction==='resizing',

            zoomed: this.zoomed,

            zoomedArea: this.zoomedArea,

            scaleInfo: this.scaleInfo

        };

    }