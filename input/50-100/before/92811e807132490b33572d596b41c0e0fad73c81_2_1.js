function()
        {
            that.options.onViewportChanged(
                that.translateDimensions({ 
                    top: -that.image.getY(), 
                    right: (-that.image.getX() + that.stage.getWidth()), 
                    bottom: (-that.image.getY() + that.stage.getHeight()), 
                    left: -that.image.getX()
                })
            );
        }