const scroll_down = document.querySelector(".main-button");

scroll_down.onclick = ()=>{
    window.scrollTo(0,950);
}

const scroll_up = document.querySelector("#back-to-top-btn");

scroll_up.onclick = ()=>{
    window.scrollTo(0,0);
}