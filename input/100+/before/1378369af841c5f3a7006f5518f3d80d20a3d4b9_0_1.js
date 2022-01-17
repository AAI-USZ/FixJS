function() {
            var targets = [];

            if(this.directionX === 1) {
                var a = [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }];
                for(var i = 0; i < a.length; ++i) {
                    targets.push(a[i]);
                }
            }
            else if(this.directionX === -1) {
                var a = [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }];
                for(var i = 0; i < a.length; ++i) {
                    targets.push(a[i]);
                }
            }

            if(this.directionY === -1) {
                var a = [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }];
                for(var i = 0; i < a.length; ++i) {
                    targets.push(a[i]);
                }
            }
            else if(this.directionY === 1) {
                var a = [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }];
                for(var i = 0; i < a.length; ++i) {
                    targets.push(a[i]);
                }
            }

            return targets;
        }