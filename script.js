//Mobile navbar
let navbarIcon = document.querySelector('.navbar-icon');
let navbarLinks = document.querySelectorAll('#navbar a:not(:first-child)');
let linksDisplay = 'none';
//console.log(navbarLinks);
navbarIcon.addEventListener('click',() => {
    if(linksDisplay == 'none'){
        linksDisplay = 'block';
    }else{
        linksDisplay = 'none';
    }
    navbarLinks.forEach((link) => {
        link.style.display = linksDisplay;
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
        case "commits":
            url = ``;
            break;
        default:
            url = `https://api.github.com/users/guismith/repos`;
            break;
    }
    try {
        const response = await fetch(url, {
            headers: {
                Accept: 'application/vnd.github+json',
                'X-Github-API-Version': '2022-11-28'
            }
        });
        //console.log(response);
        if(response.ok){
            const data = await response.json();
            data.ok = response.ok;
            return data;
        }else{
            console.log(`API do github retornou erro! Status: ${response.status}`);
            return {ok: response.ok, status: response.status};
        }
    } catch (error) {
        console.log(error);
        return {
            ok: response.ok,
            status: response.status
        };
    }
}

main();
async function main(){
    const cardModel = document.getElementById('card-model');
    const repositories = await getGithubData('repositories');
    //console.log(repositories);
    if(repositories.ok){
        var graphColors = {};
        repositories.forEach(async function(repository){
            let content = await getGithubData('contents',repository.name); //Gets content
            if (content.length > 0) {
                console.log(content.findIndex(obj => obj.name.includes('external_logo')));
                let logoIndex = content.findIndex(obj => obj.name.includes('external_logo'));
                if (logoIndex > -1) {
                    //console.log(content);
                    let card = cloneCard(cardModel,repository.name); //Clones the card container
                    //Set image source
                    card.querySelector('.card-img-top').src = content[logoIndex].download_url;
                    //Set title text
                    card.querySelector('.card-title').textContent = repository.name;
                    //Set description text
                    card.querySelector('.card-description').textContent = repository.description;
                    //Set language
                    card.querySelector('.card-language').textContent = repository.language;
                    //Set created at
                    card.querySelector('.card-created .created-date').textContent = formatDateTime(repository.created_at);
                    //Set updated at
                    card.querySelector('.card-last-update .last-update').textContent = formatDateTime(repository.updated_at);
                    //Clone button
                    document.querySelector('#copyModal .repository-link').textContent = repository.clone_url;
                    card.querySelector('.clone-btn').addEventListener("click", async () => {
                        try {
                            await navigator.clipboard.writeText(repository.clone_url);
                        } catch (error) {
                            console.log("Houve um erro ao copiar!");
                        }

                    });
                    //Set visit button
                    const visitButton = card.querySelector('.visib-btn');
                    if (repository.homepage == null) {
                        visitButton.classList.add('disabled');
                        visitButton.href = "#";
                        visitButton.addEventListener('click', (event) => {
                            event.preventDefault();
                        });
                    }else{
                        visitButton.href = repository.homepage;
                    }
                    //Set link href
                    card.querySelector('.view-repo-btn').href = repository.html_url;                    
                }else{
                    console.log(`Repository ${repository.name} is not ready to launch`);
                }
            }else{
                console.log(`Repository '${repository.name}' has no content!`);
            }
        });
    }else{
        document.querySelector('#projects .title-container h1').innerText = "Oops...";;
        document.querySelector('#projects .title-container h2').innerText = "Houve um erro ao carregar dados de Github, volte mais tarde!";
    }
}

//Returns the clone of a card
function cloneCard(element, id){
    const cloned = element.cloneNode(true);
    cloned.id = id;
    element.parentNode.appendChild(cloned);
    cloned.style.display = "block";
    return cloned;
}

/*
Data criação
Quantidade de commits
Clonar
Visitar projeto
Ver repositório
Linguagem
Última atualização

*/

function formatDateTime(isoString) {
    const date = new Date(isoString);
  
    // Extract date components
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();
  
    // Extract time components
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    // Format as DD/MM/YYYY HH:MM:SS
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
/*
// Example usage
const isoDate = '2024-06-21T15:20:39Z';
const formattedDate = formatDateTime(isoDate);
console.log(formattedDate); // Output: 21/06/2024 15:20:39
*/