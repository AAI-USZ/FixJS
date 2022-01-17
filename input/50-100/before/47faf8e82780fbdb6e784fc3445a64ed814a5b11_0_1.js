function(span) {
  if (span <= 1000000) {
    return ~~(span/10000) + 1;
  }
  return Math.pow(10, (~~(Math.log(span)/Math.log(10)) - 4)) * 5;
}