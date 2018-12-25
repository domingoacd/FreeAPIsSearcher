const loadCategories = () => {

}

const formSubmit = document.getElementById("api-form");
const createCard = (element)=>{
    let card = document.createElement("div"),
        cardContent = document.createElement("div"),
        anchor = document.createElement("a"),
        cardTitle = document.createElement("h4"),
        cardDescription = document.createElement("p");

    card.classList.add("card");
    card.classList.add("bg-primary");
    card.classList.add("mb-2");
    card.classList.add("mx-md-2");
    card.classList.add("col-11");
    card.classList.add("col-md-3");
    document.getElementById("result-list").appendChild(card);
    document.getElementById("result-list").classList.add("justify-content-center");

    anchor.href = element.Link;
    anchor.target = "blank"
    anchor.classList.add("text-white");
    card.appendChild(anchor);

    cardContent.classList.add("card-body");
    anchor.appendChild(cardContent);
    
    cardTitle.textContent = element.API;
    cardContent.appendChild(cardTitle);

    cardDescription.textContent = element.Description;
    cardContent.appendChild(cardDescription);
}
const clearResults = ()=>{
    const results = document.getElementById("result-list");
    while(results.firstChild){
        results.removeChild(results.firstChild);
    }
}
const showResults = (results)=>{
    clearResults();
    let apis = results.entries;
    for(let cont = 0; cont < apis.length; cont++){
        createCard(apis[cont]);
    }
}
const manageApisInfo = (event) => {
    event.preventDefault();
    const request = new XMLHttpRequest();
    const description = document.getElementById("desc").value;
    const authorization = document.getElementById("auth").value;
    const https = document.getElementById("https").value;
    const category = encodeURIComponent(document.getElementById("category").value);
    const url = `https://api.publicapis.org/entries?title=&description=${description}&auth=${authorization}&https=${https}&category=${category}`;
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    request.onload = ()=>{
        showResults(request.response);
    }
    
}
formSubmit.addEventListener("submit", manageApisInfo);
const hideLoadBar = () => {
    const loadSpinner = document.getElementById("load-spinner");
    loadSpinner.classList.add("d-none");
}