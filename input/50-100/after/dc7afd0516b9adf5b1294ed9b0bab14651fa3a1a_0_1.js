function handleOk(fraseElement, autorElement){
  if (fraseElement.className === "frase_ok") {
    console.log("ya esta ok")
    return
  }
  
  fraseElement.className = "frase_ok"
  i = fraseElement.children[0].innerHTML
  autor = autorElement.children[0].innerHTML
  i = i + '<label class="autor_label"> - ' + autor + '</label>'
  fraseElement.children[0].innerHTML = i
  
  console.log("ok")
  score(SCORE_OK)
}