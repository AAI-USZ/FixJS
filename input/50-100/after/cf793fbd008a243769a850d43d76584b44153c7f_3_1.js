function(patterns, action, options){
  patterns = patterns.trim().split(/\s+/);
  action && (action = action === ditto
    ? last
    : (action + "").replace(/^function\s*\(\)\s*\{\s*return\s*([\s\S]*);\s*\}/, '$$$$ = $1;').replace(/\b(?!Er)[A-Z][\w.]*/g, 'yy.$&').replace(/\.L\(/g, '$&yylineno, '));
  return [patterns, last = action || '', options];
}