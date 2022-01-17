function ytAuto(state) {
    if(auto){
        if(state === 0){
            loadVideo('next');
        }else if(state === -1){
            ytTogglePlay();
        }
    }
}