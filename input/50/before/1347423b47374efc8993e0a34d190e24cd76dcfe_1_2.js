function Enter() {
    PieHub.push( Out.get_chat_history() );
    PieHub.push( Out.whoami() );
    PieHub.push( Out.piece_progress() );
}