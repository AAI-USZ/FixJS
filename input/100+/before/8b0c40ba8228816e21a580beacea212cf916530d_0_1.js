function (data, status) {
      if (status != 'success') {
        return alert("Could not load key data");
      }

      data = JSON.parse(data);
      console.log("rendering type " + data.type);
      switch (data.type) {
      case 'string':
        selectTreeNodeString(data);
        break;
      case 'hash':
        selectTreeNodeHash(data);
        break;
      case 'set':
        selectTreeNodeSet(data);
        break;
      case 'list':
        selectTreeNodeList(data);
        break;
      case 'zset':
        selectTreeNodeZSet(data);
        break;
      case 'none':
        selectTreeNodeBranch(data);
        break;
      default:
        var html = JSON.stringify(data);
        $('#body').html(html);
        break;
      }
    }