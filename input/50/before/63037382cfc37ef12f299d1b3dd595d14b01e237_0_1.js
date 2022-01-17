function doHide() {
     console.log(el.id + "doHide");
     APP.emit(el.id, 'cancel');
   }