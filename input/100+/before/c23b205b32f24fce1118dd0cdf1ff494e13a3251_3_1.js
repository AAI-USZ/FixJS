function initScene() {

  var scene = this.getScene();

  var scrollPanel1 = new tau.ui.ScrollPanel({

    styles : {

      position : ''

    }

  });

  scene.add(scrollPanel1);

  var imageView1 = new tau.ui.ImageView({

    id : 'mainImage',

    src : '/image/mainimage.jpeg',

    styles : {

      WebkitBorderRadius : '7px',

      borderStyle : 'solid',

      borderWidth : '3px',

      height : '258px',

      padding : '4px',

      width : '320px'

    }

  });

  scrollPanel1.add(imageView1);

  imageView1.onEvent('tap', this.handleMainImage, this);

  var imageView2 = new tau.ui.ImageView({

    id : 'image2-1',

    src : '/image/image2-1.jpeg',

    styles : {

      WebkitBorderRadius : '7px',

      borderStyle : 'solid',

      borderWidth : '2px',

      height : '160px',

      padding : '02px',

      width : '160px'

    }

  });

  scrollPanel1.add(imageView2);

  imageView2.onEvent('tap', this.handleImage2_1, this);

  var imageView3 = new tau.ui.ImageView({

    id : 'image2-2',

    src : '/image/image2-2.jpeg',

    styles : {

      WebkitBorderRadius : '7px',

      borderStyle : 'solid',

      borderWidth : '2px',

      height : '160px',

      padding : '02px',

      width : '160px'

    }

  });

  scrollPanel1.add(imageView3);

  var imageView4 = new tau.ui.ImageView({

    id : 'image3-1',

    src : '/image/image3-1.jpeg',

    styles : {

      WebkitBorderRadius : '7px',

      borderStyle : 'solid',

      borderWidth : '2px',

      height : '160px',

      padding : '02px',

      width : '160px'

    }

  });

  scrollPanel1.add(imageView4);

  var imageView5 = new tau.ui.ImageView({

    id : 'image3-3',

    src : '/image/image3-2.jpeg',

    styles : {

      WebkitBorderRadius : '7px',

      borderStyle : 'solid',

      borderWidth : '2px',

      height : '160px',

      padding : '02px',

      width : '160px'

    }

  });

  scrollPanel1.add(imageView5);

  var label1 = new tau.ui.Label({

    id : 'sub1Title',

    style : 'position: static',

    text : 'Big Picture',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '10px',

      position : 'absolute',

      right : '67%',

      top : '266px',

      width : '96px'

    }

  });

  scrollPanel1.add(label1);

  var label2 = new tau.ui.Label({

    id : 'sub1Author',

    style : 'position: static',

    text : 'By Lee',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '51px',

      position : 'absolute',

      right : '7%',

      textAlign : 'right',

      top : '390px',

      width : '96px'

    }

  });

  scrollPanel1.add(label2);

  var label3 = new tau.ui.Label({

    id : 'sub2Title',

    style : 'position: static',

    text : 'Under the Sea',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '169px',

      position : 'absolute',

      right : '67%',

      top : '266px',

      width : '111px'

    }

  });

  scrollPanel1.add(label3);

  var label4 = new tau.ui.Label({

    id : 'sub2Author',

    style : 'position: static',

    text : 'By Jay Park',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '202px',

      position : 'absolute',

      right : '7%',

      textAlign : 'right',

      top : '391px',

      width : '108px'

    }

  });

  scrollPanel1.add(label4);

  var label5 = new tau.ui.Label({

    id : 'sub3Title',

    style : 'position: static',

    text : '차가운 심장',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '10px',

      position : 'absolute',

      right : '67%',

      top : '429px',

      width : '96px'

    }

  });

  scrollPanel1.add(label5);

  var label6 = new tau.ui.Label({

    id : 'sub3Author',

    style : 'position: static',

    text : 'By 유리',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '51px',

      position : 'absolute',

      right : '7%',

      textAlign : 'right',

      top : '547px',

      width : '96px'

    }

  });

  scrollPanel1.add(label6);

  var label7 = new tau.ui.Label({

    id : 'sub4Author',

    style : 'position: static',

    text : 'By 문재용',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '214px',

      position : 'absolute',

      right : '7%',

      textAlign : 'right',

      top : '546px',

      width : '96px'

    }

  });

  scrollPanel1.add(label7);

  var label8 = new tau.ui.Label({

    id : 'sub4Title',

    style : 'position: static',

    text : '내 마음 같은 눈',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '169px',

      position : 'absolute',

      right : '67%',

      top : '429px',

      width : '111px'

    }

  });

  scrollPanel1.add(label8);

  var label9 = new tau.ui.Label({

    id : 'mainTitle',

    style : 'position: static',

    text : 'Into the Sky',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '10px',

      position : 'absolute',

      right : '67%',

      top : '10px',

      width : '96px'

    }

  });

  scrollPanel1.add(label9);

  var label10 = new tau.ui.Label({

    id : 'mainAuthor',

    style : 'position: static',

    text : 'By AJ',

    styles : {

      backgroundColor : 'transparent',

      backgroundImage : 'none',

      bottom : 'auto',

      color : '#FFFFFF',

      display : 'block',

      height : '17px',

      left : '202px',

      position : 'absolute',

      right : '7%',

      textAlign : 'right',

      top : '221px',

      width : '96px'

    }

  });

  scrollPanel1.add(label10);

}