const manageApisInfo = () => {
    const searcher = document.getElementById("searcher");
    hideLoadBar();
    showApisForm(searcher);
}
const hideLoadBar = () => {
    const loadSpinner = document.getElementById("load-spinner");
    loadSpinner.classList.add("d-none");
}
const showApisForm = (form)=>{
     form.classList.remove("d-none");
}
const url = encodeURI('https://api.publicapis.org/entries?');
const request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';
request.send();
request.onload = manageApisInfo;