function(){
                var sizeValue = this.parent.sizeValue();
                return (!sizeValue && !nullShapeType) ? 0 : sizeValueToArea(sizeValue);
            }