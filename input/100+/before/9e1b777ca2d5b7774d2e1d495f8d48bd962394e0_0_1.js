function updateMenuItems(obj) {
  var items = (items instanceof Array) ? obj.items : [obj.items];

  for (var i = 0; i < items.length; i++) {
    var item = document.getElementById('menu-item-' + items[i].id);
    if (('visible' in items[i]) && !items[i].visible) {
      item.style.visibility = 'hidden';
      continue;
    } else {
      item.style.visibility = 'visible';
    }
    var inputs = item.getElementsByTagName('input');
    var group_name = '';
    if (inputs.length > 0) {
      group_name = inputs[0].name;
    }
    item.innerHTML = '';
    createMenuItem(items[i], group_name, item);
  }
}