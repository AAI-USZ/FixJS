function tileTransitionSet(tileSet,code,imageURL) {
  tileSet.add({code: code+'-conv-tl',sprite: new Sprite({imageURL: imageURL,x: 17,y: 0})});
  tileSet.add({code: code+'-conv-tr',sprite: new Sprite({imageURL: imageURL,x: 34,y: 0})});
  tileSet.add({code: code+'-conv-bl',sprite: new Sprite({imageURL: imageURL,x: 17,y: 17})});
  tileSet.add({code: code+'-conv-br',sprite: new Sprite({imageURL: imageURL,x: 34,y: 17})});
  tileSet.add({code: code+'-tl',sprite: new Sprite({imageURL: imageURL,x: 0,y: 34})});
  tileSet.add({code: code+'-t',sprite: new Sprite({imageURL: imageURL,x: 17,y: 34})});
  tileSet.add({code: code+'-tr',sprite: new Sprite({imageURL: imageURL,x: 34,y: 34})});
  tileSet.add({code: code+'-ml',sprite: new Sprite({imageURL: imageURL,x: 0,y: 51})});
  tileSet.add({code: code+'-mr',sprite: new Sprite({imageURL: imageURL,x: 34,y: 51})});
  tileSet.add({code: code+'-bl',sprite: new Sprite({imageURL: imageURL,x: 0,y: 68})});
  tileSet.add({code: code+'-b',sprite: new Sprite({imageURL: imageURL,x: 17,y: 68})});
  tileSet.add({code: code+'-br',sprite: new Sprite({imageURL: imageURL,x: 34,y: 68})});
}