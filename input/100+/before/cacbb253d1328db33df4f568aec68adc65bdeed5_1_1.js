function (file, uid, callback) {
  // Get cached result if one is available
  if (uidLookup[uid]) {
    callback(null, uidLookup[uid]);
    return;
  }
  // Get command to run
  switch (process.platform) {
    case 'win32':
      tmpl = 'powershell -Command "(get-acl <%=filename%>).owner"';
      break;
    default:
      tmpl = 'stat -c "%U" "<%=filename%>"';
  }
  cmd = _.template(tmpl, {filename: file});
  // Run the command
  var child = exec(cmd, function (error, stdout, stderr) {
     username = stdout.trim();
     // If we can cache this result, do so
     if (isUidCacheable(uid))
       uidLookup[uid] = username;
     // Return the result
     callback(null, username); 
  });
  // STDIN needs to be closed, or we'll wait forever
  child.stdin.end();
}