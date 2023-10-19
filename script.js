import {setContent} from './sources.js';

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

function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

async function getRepositories(){
    const response = await fetch('https://api.github.com/users/guismith/repos', {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-Github-API-Version': '2022-11-28'
        }
    });

    if(!response.ok){
        console.error(`Erro: ${response}`);
    }

    const data = await response.json();
    return data;
}

async function test(){
    const repositories = await getRepositories();
    console.log(repositories);
    const repositoriesList = document.querySelector('#repositories-list');
    repositories.forEach(function(repository){
        console.log(`Name: ${repository.name}`);
        repositoriesList.innerHTML += `<li>${repository.name}</li>`;
    });
}

test();