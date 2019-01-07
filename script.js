const hideLoadSpinner = () => {
    const loadSpinner = document.getElementById("load-spinner");
    loadSpinner.classList.add("d-none");
}

const showLoadSpinner = () => {
    const loadSpinner = document.getElementById("load-spinner");
    loadSpinner.classList.remove("d-none");
}

/* Creates the  container with the API info*/
const createCard = (api) => {
    let card = document.createElement("div"),
        cardContent = document.createElement("div"),
        anchor = document.createElement("a"),
        cardTitle = document.createElement("h4"),
        cardDescription = document.createElement("p"),
        resulstList = document.getElementById("result-list");

    /* Creates the container for the API info */
    card.classList.add("card");
    card.classList.add("bg-primary");
    card.classList.add("text-white");
    card.classList.add("mb-2");
    card.classList.add("mx-md-2");
    card.classList.add("col-11");
    card.classList.add("col-md-3");

    resulstList.appendChild(card);
    resulstList.classList.add("justify-content-center");

    if (api == null) {
        /* If there are not API that match the search */
        card.textContent = "No Results";
    } else if (api == "error") {
        /* If  the request failed*/
        card.textContent = "Network error";
    } else {
        /* If the request was successful and there are matching APIs */
        anchor.href = api.Link;
        anchor.target = "blank"
        anchor.classList.add("text-white");
        card.appendChild(anchor);

        cardContent.classList.add("card-body");
        anchor.appendChild(cardContent);

        cardTitle.textContent = api.API;
        cardContent.appendChild(cardTitle);

        cardDescription.textContent = api.Description;
        cardContent.appendChild(cardDescription);
    }
}

/* If the connection with the server failed */
const conectionError = () => {
    hideLoadSpinner();
    createCard("error");
}

/* Inserts the list of categories inside of its respective "select" field */
const insertCategories = (categories) => {
    const categoryField = document.getElementById("category");
    categories.forEach(category => {
        let optionField = document.createElement("option");
        optionField.value = category;
        optionField.innerText = category;
        categoryField.appendChild(optionField);
    });
}

/* Updates the list of APIs categories */
const loadCategories = () => {
    const request = new XMLHttpRequest();
    const url = encodeURI('https://api.publicapis.org/categories');
    request.open('GET', url);
    request.responseType = 'json';
    request.send();
    request.onreadystatechange = () => {
        if (request.status != 200) {
            /* If request failed */
            conectionError();
        };
    }
    request.onload = ()=>{
        /* If request was successful */
        hideLoadSpinner();
        insertCategories(request.response);
    }
}

/* Clears the results of previous searches */
const clearPreviousResults = ()=>{
    const results = document.getElementById("result-list");
    while(results.firstChild){
        results.removeChild(results.firstChild);
    }
}

/* Shows the query results */
const showResults = (results)=>{
    let apis = results.entries;
    if(apis == null){
        /* If  no API match the search*/
        createCard(apis);
    }else{
        for (let cont = 0; cont < apis.length; cont++) {
            createCard(apis[cont]);
        }
    }
}

/* Makes the request and receives the answer */
const searchAPIs = (event) => {
    event.preventDefault();
    clearPreviousResults();
    showLoadSpinner();
    const request = new XMLHttpRequest();
    const description = document.getElementById("desc").value;
    const authorization = document.getElementById("auth").value;
    const https = document.getElementById("https").value;
    const category = encodeURIComponent(document.getElementById("category").value);
    const url = `https://api.publicapis.org/entries?title=&description=${description}&auth=${authorization}&https=${https}&category=${category}`;
    
    request.open('GET', url);
    request.responseType = 'json';
    request.onreadystatechange = ()=>{
        if(request.status != 200){
            /* If request failed */
            conectionError();
        };
    }
    request.send();
    request.onload = ()=>{
        hideLoadSpinner();
        showResults(request.response);
    }
    
}

/* Events assignment section */
window.onload = loadCategories;
const formSubmit = document.getElementById("api-form");
formSubmit.addEventListener("submit", searchAPIs);