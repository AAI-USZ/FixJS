function install() {
  echo("Installing Deployd...");
  
  // npm.commands.install(['deployd'], finished);
  npm.commands.install(['https://github.com/deployd/deployd/tarball/master'], finished);
}