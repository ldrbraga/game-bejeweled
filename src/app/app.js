let targetColors, ev1, html;

const colors = ['gulp', 'css', 'node', 'js', 'html'];

const constructGameBlocks = () => {
  for (let i = 1; i <= 100; i++) {
    document
      .querySelector('.game')
      .innerHTML = document.querySelector('.game').innerHTML + `<div id="div${i}" ondrop="dragdrop.drop  (event)" ondragover="dragdrop.allowDrop(event)"><p ondragstart="dragdrop.drag(event)" draggable="true" id="drag${i}" class="div ${colors[Math.floor(Math.random() * 5)]}"></p></div>`
  };

  setTimeout(() => {
    actionsGame.removeItens(document.querySelectorAll('.game .div'));
  }, 1000)
}

const dragdrop = {
  allowDrop : (ev) => {
    ev.preventDefault();
  },
  
  drag : (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  
    targetColors = ev.target.classList.value;
  
    ev1 = ev.clientX;
  
    console.log('ev1', ev);
  },
  
  drop: (ev) => {
    ev.preventDefault();
    // var data = ev.dataTransfer.getData("text");
  
    html = '';
  
    console.log('ev2', ev);
    // console.log(document.getElementById(ev.target.parentNode.id).nextSibling.previousSibling.classList.value)
  
    // console.log(document.getElementById(ev.target.parentNode.id).children["0"].classList.value)
  
    // if (document.getElementById(ev.target.parentNode.id).children["0"].classList.value === targetColors) {
        // alert('par');  
    // }  
    // console.log(ev.target.offsetWidth)
    // console.log(ev.clientX)
    if((ev1 < ev.clientX) && ((ev1 * 1.8) > ev.clientX)) {
      // console.log('oi')
      html = document.getElementById(ev.dataTransfer.getData("text")).parentNode.outerHTML
      document.getElementById(ev.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(ev.dataTransfer.getData("text")).parentNode)
      ev.target.parentNode.insertAdjacentHTML('afterend', html);
    } else if ((ev1 > ev.clientX) && ((ev1 - ev.clientX) < (ev.target.offsetWidth * 2.5))) {
      // console.log('oill', ev.dataTransfer.getData("text").parentNode)
      html = document.getElementById(ev.dataTransfer.getData("text")).parentNode.outerHTML
      document.getElementById(ev.dataTransfer.getData("text")).parentNode.parentNode.removeChild(document.getElementById(ev.dataTransfer.getData("text")).parentNode)
      ev.target.parentNode.insertAdjacentHTML('beforebegin', html);
    }
  }
}

const actionsGame = {
  removeItens : (list) => {
    Array.from(list, (item, index) => {
      let thisColor = item.classList.value;
      let thisColorPrev = list[index - 1] ? list[index - 1] : false;
      let thisColorNext = list[index + 1] ? list[index + 1] : false;
    
      if((thisColor === (thisColorNext ? thisColorNext.classList.value : false)) && (thisColor === (thisColorPrev ? thisColorPrev.classList.value : false ))) {
        item.parentNode.parentNode.removeChild(item.parentNode);
        thisColorPrev.parentNode.parentNode.removeChild(thisColorPrev.parentNode);
        thisColorNext.parentNode.parentNode.removeChild(thisColorNext.parentNode);
      }
    })
  }
}


constructGameBlocks();
