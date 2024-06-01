//Mobile navbar
let navbarIcon = document.querySelector('.navbar-icon');
let navbarLinks = document.querySelectorAll('#navbar a:not(:first-child)');
let display = 'none';
console.log(navbarLinks);
navbarIcon.addEventListener('click',() => {
    if(display == 'none'){
        display = 'block';
    }else{
        display = 'none';
    }
    navbarLinks.forEach((link) => {
        link.style.display = display;
    })
    
});

//Scroll
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

//Scrolls to top
function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Gets github data
async function getGithubData(request, repository = 'std'){
    let url;
    switch (request){
        case "repositories":
            url = `https://api.github.com/users/guismith/repos`;
            break;
        case "contents":
            url = `https://api.github.com/repos/guismith/${repository}/contents/`;
            break;
        case "languages":
            url = `https://api.github.com/repos/guismith/${repository}/languages`;
            break;
        default:
            url = `https://api.github.com/users/guismith/repos`;
            break;
    }
    const response = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-Github-API-Version': '2022-11-28'
        }
    });

    if(!response.ok){
        console.error(`Erro`);
        console.log(response);
    }else{
        const data = await response.json();
        return data;
    }
}

main();
async function main(){
    const cards = document.querySelector(".card-container");
    const repositories = await getGithubData('repositories');
    //console.log(repositories);
    var graphColors = {};
    repositories.forEach(async function(repository){
        let content = await getGithubData('contents',repository.name); //Gets content
        let logoIndex = content.findIndex(obj => obj.name.includes('external_logo'));
        if (logoIndex > -1) {
            //console.log(content);
            cloneCard(cards,repository.name); //Clones the card container
            setContent(`#${repository.name} .card-img-top`,'src',content[logoIndex].download_url);
            setContent(`#${repository.name} .card-title`,'text',repository.name);
            setContent(`#${repository.name} .card-description`,'text',repository.description);
            setContent(`#${repository.name} .card-link`, 'href', repository.svn_url);
        }else{
            //console.log('Not ready to launch');
        }
    });
}

//Clones projects cards
function cloneCard(element, id){
    const cloned = element.cloneNode(true);
    cloned.id = id;
    element.parentNode.appendChild(cloned);
    cloned.style.display = "block";
    return cloned;
}

//Sets atributes of an element
function setContent(query,attribute,value){
    const element = document.querySelector(query);
    if(attribute == 'text'){
        element.innerHTML = value;
    }else{
        element.setAttribute(attribute,value);
    }
    
}