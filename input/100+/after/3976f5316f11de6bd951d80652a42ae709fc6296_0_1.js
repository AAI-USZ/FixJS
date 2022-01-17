function (ii, image) {
    c += 1;

    $state.html('Processing Images ... ' + c + '/' + gTotalCount);

    sum = new Color(0, 0, 0, 255);
    $el = $(this);
    gContext.drawImage(image, 0, 0);
    if (!image.width && !image.height) {
      console.log(image);
      return;
    }
    gImgData = gContext.getImageData(0, 0, image.width, image.height);
    pixel = gImgData.data;
    for (i = image.width - 1; i >= 0; i -= 1) {
      for (j = image.height - 1; j >= 0; j -= 1) {
        pos = (i + gImgData.width * j) * 4;
        sum.r = sum.r + pixel[pos];
        sum.g = sum.g + pixel[pos + 1];
        sum.b = sum.b + pixel[pos + 2];
        sum.a = sum.a + pixel[pos + 3];
      }
    }
    sum = Color.fromRGBAWithConversions(
      sum.r / gSizeSQ,
      sum.g / gSizeSQ,
      sum.b / gSizeSQ,
      sum.a / gSizeSQ
    );

    $el.css('border', 'solid 5px '+sum.toHEX());
    gInfoMap[$el.attr('number')] = sum;

  }