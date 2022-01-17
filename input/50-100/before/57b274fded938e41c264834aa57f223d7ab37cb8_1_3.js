function(tableView, index) {
    var item = this.getFilteredItemAtIndex(index);
    var reuseIdentifier = item.reuseIdentifier || this.getDefaultReuseIdentifier();
    var cell = tableView.dequeueReusableCellWithIdentifier(reuseIdentifier);
    
    cell.setIndex(index);
    cell.setAccessoryType(item.accessoryType);
    cell.setEditingAccessoryType(item.editingAccessoryType);
    cell.setData(item);
    
    return cell;
  }