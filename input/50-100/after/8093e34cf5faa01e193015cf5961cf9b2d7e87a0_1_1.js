function abbrev (contract) {

  var func = contract.function.toString()
  var name = contract.name

  return [
    (name ? bt(name) : ''), 
    p( func.length < 80 
      ? func : func.substring(0, 100) + '...')
  ].join(': ')
}