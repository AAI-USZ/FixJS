function d3_time_century() {
  return ~~(new Date().getFullYear() / 1000) * 1000;
}