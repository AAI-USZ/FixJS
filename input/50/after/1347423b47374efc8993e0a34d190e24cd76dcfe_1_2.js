function Enter() {
    PieHub.push( Out.get_chat_history() );
    PieHub.push( Out.piece_progress() );
    PieHub.push( Out.init_session() );
}