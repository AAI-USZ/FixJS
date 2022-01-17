function(container, options) {
        options = options || {};
        this.options = options;
        this.options.fontFamily = options.fontFamily || 'monospace,Tahoma,sans-serif';
        this.options.fontSize = options.fontSize || 8;
        this.options.fontColor = options.fontColor || 'white';
        this.options.backgroundColor1 = options.backgroundColor1 || 'black';
        this.options.backgroundColor2 = options.backgroundColor2 || 'rgb(60,60,60)';
        this.options.bugColor = options.bugColor || 'rgb(255,0,100)';
        this.options.highlightColor = options.highlightColor || 'rgb(255,255,255)';
        this.options.skyColor = options.skyColor || 'rgb(114,149,179)';
        this.options.groundColor = options.groundColor || 'rgb(165,105,63)';

        this.speed = null;
        this.targetSpeed = null;
        this.altitude = null;
        this.targetAltitude = null;
        this.flightMode = null;

        var containerElt = document.getElementById(container);
        this.stage = new Kinetic.Stage({
            container: container,
            width: containerElt.offsetWidth,
            height: containerElt.offsetHeight
        });
        this.layer = new Kinetic.Layer();
        this.stage.add(this.layer);
        this.stage.setScale(containerElt.offsetWidth / 200.0,
                            containerElt.offsetWidth / 200.0);

        this.attitudeIndicator = new pfd.ArtificialHorizon({
            x: 35, y: 25, width: 130, height: 130,
            groundColor: this.options.groundColor,
            skyColor: this.options.skyColor
        });
        this.layer.add(this.attitudeIndicator);

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
        this.layer.add(new pfd.ClippedGroup({
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
                    text: pfd.zeroPad(spd, 4, ' ')
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

        // Target altitude
        this.targetAltitudeDisplay = new Kinetic.Text({
            x: 170,
            y: 10,
            fontSize: smallFontSize,
            fontFamily: this.options.fontFamily,
            textFill: this.options.bugColor});
        this.layer.add(this.targetAltitudeDisplay);
            
        // Target speed
        this.targetSpeedDisplay = new Kinetic.Text({
            x: 0,
            y: 10,
            fontSize: smallFontSize,
            fontFamily: this.options.fontFamily,
            textFill: this.options.bugColor});
        this.layer.add(this.targetSpeedDisplay);
            
        // Speed bug
        this.speedBug = new Kinetic.Polygon({
            x: 31,
            y: 90,
            points: [0, 0,
                     3, -2,
                     5, -2,
                     5, 2,
                     3, 2,
                     0, 0],
            stroke: this.options.bugColor,
            fill: this.options.bugColor,
            strokeWidth: 1.0,
            visible: false
        });
        this.layer.add(this.speedBug);

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
        this.layer.add(new pfd.ClippedGroup({
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

        // --------------------
        // end of speed tape

        // Altitude bug
        this.altitudeBug = new Kinetic.Polygon({
            x: 169,
            y: 90,
            points: [0, 0,
                     -3, -2,
                     -5, -2,
                     -5, 2,
                     -3, 2,
                     0, 0],
            stroke: this.options.bugColor,
            fill: this.options.bugColor,
            strokeWidth: 1.0,
            visible: false
        });
        this.layer.add(this.altitudeBug);

        this.flightModeRect = new Kinetic.Rect({
            x: 1,
            y: 1,
            width: 60,
            height: 9,
            stroke: this.options.highlightColor,
            strokeWidth: 1.0,
            visible: false});
        this.layer.add(this.flightModeRect);

        this.flightModeDisplay = new Kinetic.Text({
            x: 2,
            y: 2,
            text: '',
            fontSize: this.options.fontSize,
            fontFamily: this.options.fontFamily,
            textFill: this.options.fontColor
        });
        this.layer.add(this.flightModeDisplay);

        this.statusText = new Kinetic.Text({
            x: 2,
            y: 170,
            text: '',
            fontSize: smallFontSize,
            fontFamily: this.options.fontFamily,
            textFill: this.options.fontColor
        });
        this.layer.add(this.statusText);

    }