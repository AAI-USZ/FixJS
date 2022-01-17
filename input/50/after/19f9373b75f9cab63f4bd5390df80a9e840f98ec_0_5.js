function suggest_foot(label){
    label = label ? label : 'その他のハイパーバイザ';
    return $('<option />').val('OTHER').text(label);
}