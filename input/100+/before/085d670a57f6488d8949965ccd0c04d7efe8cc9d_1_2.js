function re_groupCalls(olderCallEl, newerCallEl, count, increment) {
    olderCallEl.classList.add('hide');
    olderCallEl.classList.add('collapsed');
    var primaryInfo = newerCallEl.querySelector('.primary-info');
    var callDetails = primaryInfo.textContent.trim();
    var countIndex = callDetails.indexOf('(' + count + ')');
    count += increment;
    if (countIndex != -1) {
      primaryInfo.textContent = callDetails.substr(0, countIndex) + '(' + count + ')';
    } else {
      primaryInfo.textContent = callDetails + ' (' + count + ')';
    }
    newerCallEl.dataset.count = count;
  }