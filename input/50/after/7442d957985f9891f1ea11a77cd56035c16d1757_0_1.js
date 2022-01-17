function d3_time_expandYear(d) {
  return d + (d > 68 ? 1900 : 2000);
}