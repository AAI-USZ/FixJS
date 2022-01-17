function(slideConfig) {
  if (typeof slideConfig.nextImg != 'number') {
    slideShowInitFirstImage(slideConfig);
  } else {
    slideConfig.nextImg = slideConfig.nextImg + 1;
  }
  if (slideConfig.nextImg >= slideConfig.imageArray.size()) {
    slideConfig.nextImg = 0;
  }
  if (slideConfig.nextImg >=0) {
    slideConfig.nextimgsrc = slideConfig.imageArray[slideConfig.nextImg];
    if (slideConfig.doImageResize) {
      slideConfig.nextimgsrc += slideConfig.imageSrcQuery;
    }
    return true;
  } else {
    return false;
  }
}