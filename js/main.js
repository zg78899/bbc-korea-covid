// 전역변수화 하기 위해서
(() => {
  //객체 
  const actions = {
    birdFlies(key) {
      if(key){
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
      }else{
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
      }
    },
    birdFlies2(key) {
      if(key){
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px,${-window.innerHeight * 0.7}px)`;
      }else{
        document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
      }
    },
  }
  
  
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  
  let currentItem = graphicElems[0];
  let ioIndex;
  //현재 활성화된 visible클래스가 붙은 .graphic-item을 지정
  const io = new IntersectionObserver((entries,observer)=>{
    // console.log(entries[0].target.dataset.index);
    ioIndex = entries[0].target.dataset.index * 1;
    console.log(ioIndex)
  })

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    // stepElems[i].setAttribute('data-index',i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  };
//활성화
  function acitivate(action){
    currentItem.classList.add('visible');
    if(action){
      actions[action](true);
    }

  }
  //비활성화
  function inAcitivate(action){
    currentItem.classList.remove('visible');
    if(action){
      actions[action](false)
    }
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;
    // let temp = 0;


    // for (let i = 0; i < stepElems.length; i++) {
      for(let i =ioIndex-1; i<ioIndex+2; i++){
      console.log('inIndex',i);
      step = stepElems[i];
      if(!step) continue;

      boundingRect = step.getBoundingClientRect();
      // temp++;
      // console.log(boundingRect.top);
      //활성화
      if (boundingRect.top > window.innerHeight * 0.1
         && boundingRect.top < window.innerHeight * 0.8) {
        // if (currentItem) {
        //   //활성화 시키기 전에 붙어있는 친구가 있다면 제거하시오
        //   inAcitivate();
        // }
        inAcitivate(currentItem.dataset.action);
        // console.log(step.dataset.index);
        currentItem = graphicElems[step.dataset.index]
        //활성화
        acitivate(currentItem.dataset.action);
      }
    }
    // console.log(temp);
  });
  window.addEventListener('load',()=>{
    setTimeout(()=>{
      scrollTo(0,0);
    },100);
  });

  acitivate();

})();