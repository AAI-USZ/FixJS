function thlui_init() {
    this.delNumList = [];
    this.pendingDelList = [];
    this.deleteAllButton.addEventListener('click',
      this.deleteAllThreads.bind(this));
    this.deleteSelectedButton.addEventListener('click',
      this.deleteThreads.bind(this));
    this.doneButton.addEventListener('click', this.executeDeletion.bind(this));
   }