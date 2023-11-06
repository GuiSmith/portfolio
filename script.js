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

test();

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

async function test(){
    const cards = document.querySelector(".card-container");
    const repositories = await getGithubData('repositories');
    console.log(repositories);
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
            cloneCard(cards,repository.name); //
            let languages = await getGithubData('languages',repository.name);
            let totalBytes = 0;
            let languagesText = "";
            //console.log(languages);
            for(const language in languages){
                //console.log(`${language}: ${languages[language]}`);
                totalBytes += languages[language];
            }
            //console.log(`Total bytes: ${totalBytes}`);
            for(const language in languages){
                languagesText += `${language}: ${getPercetage(totalBytes,languages[language])}%.<br>`;
                let bar = document.createElement('div');
                bar.classList.add("card-graph-bar");
                bar.style.width = `${getPercetage(totalBytes,languages[language])}%`;
                bar.style.backgroundColor = randomColor();
                console.log(bar.style.backgroundColor);
                document.querySelector(`#${repository.name} .card-graph`).appendChild(bar);
            }
            //console.log(languagesText);
            //console.log(content[externalLogoIndex]);
            setContent(`#${repository.name} .card-img-top`,'src',content[externalLogoIndex].download_url);
            setContent(`#${repository.name} .card-title`,'text',repository.name);
            setContent(`#${repository.name} .card-description`,'text',repository.description);
            setContent(`#${repository.name} .card-graph`, 'title', languagesText);
            setContent(`#${repository.name} .card-languages`,'text',languagesText);
            setContent(`#${repository.name} .card-link`, 'href', repository.svn_url);
            
        }else{
            //console.log(`${repository.name} is not ready to launch`);
        }
    });
    setTimeout(() => {
        stabilizeHeight();
    },1000);
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

//Returns the percentage of a value compared to given 100%
function getPercetage(hundred, value){
    let percentage = (100*value)/hundred;
    return percentage.toFixed(2);
}

function stabilizeHeight(){
    const elements = document.querySelectorAll(".card");
    //console.log(elements);
    let maxHeight = 0;
    elements.forEach(function(element){
        if(element.offsetHeight > maxHeight){
            maxHeight = element.offsetHeight;
            //console.log(`${element.id}: ${element.offsetHeight} is new maxheight`);
        }
    });
    //console.log(maxHeight);
    elements.forEach(function(element){
        if(element.offsetHeight < maxHeight){
            element.style.height = `${maxHeight}px`;
        }
    });
}

function randomColor(){
    let sum = 0;
    let colors = [];
    for(let i=0;i<3;i++){
        let random = randomNumber(0,255);
        colors.push(random);
        sum += random;
        //console.log(`color: ${random}`);
    }
    if(sum == 765){
        console.log("color adjusted");
        colors[0] = 200;
    }
    // Ensure the colors are not too similar
    while (sum > 350 && sum < 650) {
        sum = 0;
        colors = [];
        for (let i = 0; i < 3; i++) {
            let random = randomNumber(0, 255);
            colors.push(random);
            sum += random;
        }
    }
    //console.log(`rgb(${colors[0]},${colors[1]},${colors[2]})`);
    //console.log(sum);
    return `rgb(${colors[0]},${colors[1]},${colors[2]})`;
}

function randomNumber(from, to){
    return Math.floor(Math.random() * to) + from;
}

randomColor();