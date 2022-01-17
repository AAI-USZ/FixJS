function handleOk(fraseElement, autorElement){
  // TODO: hacer algo interesante ...
  // TODO: chequear si fue marcada como okay ya ...
  if (fraseElement.className === "frase_okay") {
    console.log("ya esta okay")
    return
  }
  
  fraseElement.className = "frase_ok"
  i = fraseElement.children[0].innerHTML
  autor = autorElement.children[0].innerHTML
  i = i + '<label class="autor_label"> - ' + autor + '</label>'
  fraseElement.children[0].innerHTML = i
  
  console.log(i)
  console.log("ok")
}