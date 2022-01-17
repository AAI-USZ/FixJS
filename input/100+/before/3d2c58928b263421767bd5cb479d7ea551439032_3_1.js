function(){
    var file = this.get('file');
    if (!file) throw Error('file is not defined');

    this.cssReader = new cssReader({file: file});

    var basename = path.basename(file, '.css');
    this.set('basename', basename);
    /**
     * 所有sprites属性集合
     */
    this.sprites = {};

    /**
     * 所有含有background的css集合，{id: url}，id指css集合id，url是图片路径
     */
    this.images = {};

    /**
     * 图片属性集合，记录图片大小以及图片类型
     */
    this.imagesDef = {};
    this.cssResult = '';

    this._bind();
  }