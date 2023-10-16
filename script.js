let scrollTop = document.querySelector(".scroll-top");
scrollTop.addEventListener("click",function(){
    topFunction();
});

window.onscroll = function(){scrollFunction()};

function scrollFunction(){
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30){
        scrollTop.style.display = "block";
    }else{
        scrollTop.style.display = "none";
    }
}

function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}