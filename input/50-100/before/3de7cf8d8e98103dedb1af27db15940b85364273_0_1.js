function () {
  //TODO: make defaults configurable
  return {
    x1: this.get('profile_pic_crop_x1') || 1,
    y1: this.get('profile_pic_crop_y1') || 1,
    x2: this.get('profile_pic_crop_x2') || 200,
    y2: this.get('profile_pic_crop_y2') || 90
  }
}