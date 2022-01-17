function generate(container) {
        var angle, colors, face, flip, i, id, paper;

        face = {head: {}, eyebrows: [{}, {}], eyes: [{}, {}], nose: {}, mouth: {}, hair: {}};

        // Set fatness, biased towards skinny
        face.fatness = Math.random() * 0.88;
        if (face.fatness > 0.6) {
            face.fatness = Math.random() * 0.88;
            if (face.fatness > 0.7) {
                face.fatness = Math.random() * 0.88;
                if (face.fatness > 0.8) {
                    face.fatness = Math.random() * 0.88;
                }
            }
        }

        colors = ["#f2d6cb", "#ddb7a0", "#ce967d", "#bb876f", "#aa816f", "#a67358", "#ad6453", "#74453d", "#5c3937"];
        i = Math.floor(Math.random() * colors.length);
        if (i < 7) {
            i = Math.floor(Math.random() * colors.length);
            if (i < 6) {
                i = Math.floor(Math.random() * colors.length);
                if (i < 5) {
                    i = Math.floor(Math.random() * colors.length);
                }
            }
        }
        face.color = colors[i];

        face.head = {id: getId(head)};

        id = getId(eyebrow);
        face.eyebrows[0] = {id: id, lr: "l", cx: 135, cy: 250};
        face.eyebrows[1] = {id: id, lr: "r", cx: 265, cy: 250};

        angle = Math.random() * 60 - 30;
        id = getId(eye);
        face.eyes[0] = {id: id, lr: "l", cx: 135, cy: 280, angle: angle};
        face.eyes[1] = {id: id, lr: "r", cx: 265, cy: 280, angle: angle};

        flip = Math.random() > 0.5 ? true : false;
        face.nose = {id: getId(nose), lr: "l", cx: 200, cy: 330, size: Math.random(), posY: undefined, flip: flip};

        face.mouth = {id: getId(mouth), cx: 200, cy: 385};

        face.hair = {id: getId(hair)};

        if (typeof container !== "undefined") {
            display(container, face);
        }

        return face;
    }