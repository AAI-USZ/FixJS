function(result, code) {
    $result.addClass(result).fadeIn();

    if (result === 'done') {
      return set_result_text('采集成功！');
    } else if (result === 'fail') {
      console.log(code);
      switch (code) {
      case 404:
        set_result_text('无法获取资源！');
        break;
      case 410:
        set_result_text('无法获取资源！');
        break;
      case 408:
        set_result_text('获取资源超时！');
        break;
      case 406:
        set_result_text('不符合要求的资源地址！');
        break;
      }
    }
  }