function(){
                var sizeValue = this.parent.sizeValue();
                return (sizeValue == null && !nullShapeType) ? 0 : sizeValueToArea(sizeValue);
            }