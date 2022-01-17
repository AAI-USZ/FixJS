function onNewMsgEnd() {
console.log('  new fetched, header processing');
            newChewReps.push($imapchew.chewHeaderAndBodyStructure(msg));
console.log('   header processed');
          }