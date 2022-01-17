function(container, options) {
        this.options = options || {};
        this.options.fontFamily = this.options.fontFamily || 'monospace,Tahoma,sans-serif';
        this.options.fontSize = this.options.fontSize || 8;
        this.options.fontColor = this.options.fontColor || 'white';
        this.options.backgroundColor1 = this.options.backgroundColor1 || 'black';
        this.options.backgroundColor2 = this.options.backgroundColor2 || 'rgb(60,60,60)';

        var containerElt = document.getElementById(container);
        this.stage = new Kinetic.Stage({
            container: container,
            width: containerElt.offsetWidth,
            height: containerElt.offsetHeight
        });
        this.layer = new Kinetic.Layer();
        this.stage.add(this.layer);
        this.stage.setScale(containerElt.offsetWidth / 200.0,
                            containerElt.offsetHeight / 200.0);

        // --------------------
        // Speed tape
        // The speed tape displays 3 pieces of info:
        //   * current speed
        //   * moving speed ladder
        //   * target speed, if set

        // background
        this.layer.add(
            new Kinetic.Rect({
                x: 0,
                y: 20,
                width: 30,
                height: 140,
                stroke: this.options.backgroundColor2,
                fill: this.options.backgroundColor2
            }));

        this.speedTape = new Kinetic.Group();
        // clipping region for moving speed ladder
        this.layer.add(new mmap.ClippedGroup({
            x: 0,
            y: 20,
            width: 30,
            height: 140
        }).add(this.speedTape));

        // moving speed ladder
        var smallFontSize = this.options.fontSize * 0.9;
        var isMajorTick, y;
        for (var spd = 0; spd <= 100; spd += 5) {
            isMajorTick = (spd % 10 === 0);
            y = 70 - (2 * spd);
            if (isMajorTick) {
                this.speedTape.add(new Kinetic.Line({
                    points: [25, y, 30, y],
                    stroke: this.options.fontColor,
                    strokeWidth: 1.0,
                    lineCap: 'square'
                }));
                this.speedTape.add(new Kinetic.Text({
                    x: 0,
                    y: y - smallFontSize / 2,
                    fontSize: smallFontSize,
                    fontFamily: this.options.fontFamily,
                    textFill: this.options.fontColor,
                    text: mmap.zeroPad(spd, 4, ' ')
                }));
            } else {
                this.speedTape.add(new Kinetic.Line({
                    points: [28, y, 30, y],
                    stroke: this.options.fontColor,
                    strokeWidth: 1.0,
                    lineCap: 'square'
                }));
            }
        }
        
        // Instantaneous speed text
        this.speedInst = new Kinetic.Text({
            x: 2,
            y: 10 - this.options.fontSize / 2,
            text: 'UNK',
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            textFill: this.options.fontColor
        });
        this.layer.add(
            this.makeGroup([
                new Kinetic.Polygon({
                    points: [0, 0,
                             25, 0,
                             30, 10,
                             25, 20,
                             0, 20,
                             0, 0],
                    stroke: this.options.fontColor,
                    strokeWidth: 1.0,
                    fill: this.options.backgroundColor1
                }),
                this.speedInst
            ], {
                x: 0,
                y: 80
            }));

        // end of speed tape
        // --------------------

        // --------------------
        // altitude tape

        // background
        this.layer.add(
            new Kinetic.Rect({
                x: 170,
                y: 20,
                width: 30,
                height: 140,
                stroke: this.options.backgroundColor2,
                fill: this.options.backgroundColor2
            }));

        this.altitudeTape = new Kinetic.Group();
        // clipping region for moving altitude ladder
        this.layer.add(new mmap.ClippedGroup({
            x: 170,
            y: 20,
            width: 30,
            height: 140
        }).add(this.altitudeTape));

        // moving altitude ladder
        for (var alt = 0; alt <= 400; alt += 1) {
            isMajorTick = (alt % 10 === 0);
            y = 70 - (4 * alt);
            if (isMajorTick) {
                this.altitudeTape.add(new Kinetic.Line({
                    points: [0, y, 5, y],
                    stroke: this.options.fontColor,
                    strokeWidth: 1.0,
                    lineCap: 'square'
                }));
                this.altitudeTape.add(new Kinetic.Text({
                    x: 6,
                    y: y - smallFontSize / 2,
                    fontSize: smallFontSize,
                    fontFamily: this.options.fontFamily,
                    textFill: this.options.fontColor,
                    text: alt.toString()
                }));
            } else {
                this.altitudeTape.add(new Kinetic.Line({
                    points: [0, y, 2, y],
                    stroke: this.options.fontColor,
                    strokeWidth: 1.0,
                    lineCap: 'square'
                }));
            }
        }
        
        // Instantaneous speed text
        this.altitudeInst = new Kinetic.Text({
            x: 6,
            y: 10 - Math.round(this.options.fontSize / 2),
            text: 'UNK',
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            textFill: this.options.fontColor
        });
        this.layer.add(
            this.makeGroup([
                new Kinetic.Polygon({
                    points: [0, 10,
                             5, 0,
                             30, 0,
                             30, 20,
                             5, 20,
                             0, 10],
                    stroke: this.options.fontColor,
                    strokeWidth: 1.0,
                    fill: this.options.backgroundColor1
                }),
                this.altitudeInst
            ], {
                x: 170,
                y: 80
            }));

        // end of speed tape
        this.flightMode = new Kinetic.Text({
            x: 10,
            y: 30,
            text: '',
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            textFill: this.options.fontColor
        });
        this.layer.add(this.flightMode);

        this.statusText = new Kinetic.Text({
            x: 10,
            y: 40,
            text: '',
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            textFill: this.options.fontSize
        });
        this.layer.add(this.statusText);
    }