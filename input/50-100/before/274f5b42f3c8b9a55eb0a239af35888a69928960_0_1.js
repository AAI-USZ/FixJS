function isStrictCompletion(inputValue, completion) {
  // Strip any leading whitespace from the user inputted value because the
  // completion will never have leading whitespace.
  inputValue = inputValue.replace(/^\s*/, '');
  // Strict: "ec" -> "echo"
  // Non-Strict: "ls *" -> "ls foo bar baz"
  return completion.indexOf(inputValue) === 0;
}