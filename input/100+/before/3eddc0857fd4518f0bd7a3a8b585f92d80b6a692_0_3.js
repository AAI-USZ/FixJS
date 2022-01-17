function BigElement(type, text) {
    this.x = null;
    this.y = null;

    this.width = null;
    this.height = null;

    this.type = type;

    this.text = null;

    //Type can be sum, int, iint, iiint, coprod, prod
    this.img = new Image();
    for (var n = 0; n < bigs.length; n++) {
        if (type == bigs[n]) {
            this.img.src = '../images/' + bigs[n] + '.png';
            break;
        }
    }

    this.eq = new ContainerElement("");
    this.sub = new ContainerElement("", 0.75);
    this.sup = new ContainerElement("", 0.75);

    this.setText(text);

    this.update();
}