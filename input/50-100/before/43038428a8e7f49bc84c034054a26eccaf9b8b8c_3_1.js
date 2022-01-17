function(g, x, y) {
            this.g.setStrokeStyle(1);
            this.g.beginStroke(Graphics.getRGB(255,0,0));

            g.moveTo(x-3, y-3)
            g.lineTo(x+3, y+3)

            g.moveTo(x+3, y-3)
            g.lineTo(x-3, y+3)
        }