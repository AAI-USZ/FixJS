function(tableView, index) {
    var item = this.getFilteredItemAtIndex(index);
    var reuseIdentifier = item.reuseIdentifier || this.getDefaultReuseIdentifier();
    var accessoryType = item.accessoryType || this.getDefaultAccessoryType();
    var editingAccessoryType = item.editingAccessoryType || this.getDefaultEditingAccessoryType();
    var cell = tableView.dequeueReusableCellWithIdentifier(reuseIdentifier);
    
    cell.setIndex(index);
    cell.setAccessoryType(accessoryType);
    cell.setEditingAccessoryType(editingAccessoryType);
    cell.setData(item);
    
    return cell;
  }