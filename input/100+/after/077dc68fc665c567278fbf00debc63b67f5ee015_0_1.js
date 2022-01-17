function (id) {
    // temporary fix for pseudo-random REALTIME ID
    window.REALTIME_ID = id.substring(0, id.length - 3) +
                         parseInt(Math.random() * 1000, 10);
  }