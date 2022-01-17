function thlui_init() {
    this.delNumList = [];
    this.deleteAllButton.addEventListener('click',
      this.deleteAllThreads.bind(this));
    this.deleteSelectedButton.addEventListener('click',
      this.deleteThreads.bind(this));
   }