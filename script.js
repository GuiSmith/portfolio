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
        console.error(`Erro: ${response}`);
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
        let show = false; //Sets variable to check if a repository is ready to launch
        let externalLogoIndex = 0; //Sets the holder of the index that has the external_logo object, so I don't have to check it again.
        for (const item of content) { //Iterates through the content 
            if(item.name.includes('external_logo')){ //Checks if there is an item called "external_logo" 
                //console.log(`${repository.name} has an external logo`); //Console logs it so I can really check
                //console.log(content); //Console logs the content of the repository that is ready to launch
                show = true;
                //console.log(externalLogoIndex);
                break; //Closes the iteration to save time and processes
            }
            externalLogoIndex++;
        }
        if(show){ //If the current repository is ready to launch
            cloneCard(cards,repository.name); //Clones the card container
            setContent(`#${repository.name} .card-img-top`,'src',content[externalLogoIndex].download_url);
            setContent(`#${repository.name} .card-title`,'text',repository.name);
            setContent(`#${repository.name} .card-description`,'text',repository.description);
            setContent(`#${repository.name} .card-link`, 'href', repository.svn_url);
            // console.log(document.querySelector(`#${repository.name}`));
        }else{
            //console.log(`${repository.name} is not ready to launch`);
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