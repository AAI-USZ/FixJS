function() {
            if(this.directionX === 1) {
                return [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }];
            }
            else if(this.directionX === -1) {
                return [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }];
            }
            return [];
        }