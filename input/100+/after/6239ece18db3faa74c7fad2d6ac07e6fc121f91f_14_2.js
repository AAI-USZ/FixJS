function processShape(shape, instance) {
            // pvc.log(datum.key + ": " + JSON.stringify(shape) + " intersects? " + shape.intersectsRect(this.rubberBand));
            if (shape.intersectsRect(rb)){
                var group = instance.group;
                var datums = group ? group._datums : def.array.as(instance.datum);
                if(datums) {
                    datums.forEach(function(datum){
                        if(!datum.isNull) {
                            if(pvc.debug >= 4) {
                                pvc.log(datum.key + ": " + JSON.stringify(shape) + " intersects? true " + mark.type.toUpperCase());
                            }
                    
                            fun.call(ctx, datum);
                        }
                    });
                }
            }
        }