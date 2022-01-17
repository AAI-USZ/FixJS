function lv_setItemImage(item, image) {
    // Set source to image and crop it to be fitted when it's onloded
    if (image) {
      item.addEventListener('load', cropImage);
      item.src = createBase64URL(image);
    }
  }