function parseBinOp(lhs, priority) {
  var type = this.peek().type,
      matchedPriority = Parser.priorities[type];

  if (matchedPriority < priority) return;

  var rhs = this.negateWrap(type, function() {
    return this.parseExpression(matchedPriority);
  });

  if (!rhs) return this.setError('Expected rhs for binary operation');

  return ['binop', this.negateType(type), lhs, rhs];
}