function install() {
  echo("Installing Deployd...");
  
  // npm.commands.install(['deployd'], finished);
  npm.commands.install(['git://github.com/deployd/deployd.git'], finished);
}