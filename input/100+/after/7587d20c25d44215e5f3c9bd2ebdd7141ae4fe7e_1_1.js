function Cast_Number (expression) {
    if (expression === false)
      return 0;
    else if (expression === true)
      return 1;
    else if (typeof (expression) === "number")
      return expression;
    else
      throwCastError(expression);
  }