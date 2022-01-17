function() {
    var face, image, resizes, tag, tags, thumb, to_template, _i, _len, _ref;
    face = this.model.toJSON();
    image = this.model.getImage();
    thumb = this.model.getThumb();
    if (face.source) {
      face.source = [
        {
          source: face.source
        }
      ];
    } else {
      face.source = [];
    }
    resizes = [];
    if (face.resizes.huge) {
      resizes.push({
        size: "huge",
        image: face.resizes.huge
      });
    }
    if (face.resizes.large) {
      resizes.push({
        size: "large",
        image: face.resizes.large
      });
    }
    if (face.resizes.medium) {
      resizes.push({
        size: "medium",
        image: face.resizes.medium
      });
    }
    if (face.resizes.small) {
      resizes.push({
        size: "small",
        image: face.resizes.small
      });
    }
    face.resizes = resizes;
    to_template = {
      face: face,
      image: image,
      static_prefix: static_prefix,
      thumb: thumb,
      image_service: app.getImageService()
    };
    this.$el.html(Mustache.render(this.template, to_template));
    $(".single").css("max-height", screen.height);
    $(window).scrollTop(0);
    tags = "";
    _ref = face.tags;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tag = _ref[_i];
      tags += tag.name + ", ";
    }
    this.updateMeta(face, tags);
    return this;
  }