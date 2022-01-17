function dice( source, target ) {
  
  var sources = dice.prepare( source )
  var targets = dice.prepare( target )
  
  console.log( sources, targets )
  
  var intersection = 0
  var union = sources.length + targets.length
  
  var i, k
  var source_count = sources.length
  var target_count = targets.length
  
  for( i = 0; i < source_count; i++ ) {
    source = sources[i]
    for( k = 0; k < target_count; k++ ) {
      target = targets[k]
      if( source == target ) {
        intersection++
        delete targets[k]
        break
      }
    }
  }
  
  console.log( 'union:', union )
  
  return 2 * intersection / union
  
}