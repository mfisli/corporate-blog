function log(msg){
    console.log(msg); 
}
function Blog(userName,city,subject,body){
    this.userName = userName;
    this.city = city;
    this.subject = subject;
    this.body = body;
}
function makeBlog(obj){
    return new Blog(obj.userName, obj.city, obj.subject, obj.body); 
}
function processJSON(obj){
    var blogArray = []; 
    for( var i = 0; i < obj.length; i++){
        name = obj[i].username;
        city = obj[i].address.city;
        subject = obj[i].company.catchPhrase;
        body = obj[i].company.bs;
        blogArray.push(new Blog(name,city,subject,body));
    }
    return blogArray;
}
function buildHTML(obj){
    log(obj); 
    var blogHTML = document.getElementById("blog");
    blogHTML.innerHTML = ""; 
    for(var i = 0; i < obj.length; i++){
        blogHTML.innerHTML += 
        "<div class='blog'>" + obj[i].userName + " from " + obj[i].city 
        + "<br /> <b>" + obj[i].subject + "</b> " + obj[i].body + "<br /></div>"
    }
}
function getBlogData() { 
    document.getElementById("blog").innerHTML = "Loading...";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var rawPayload = this.responseText;
            var jsonObj = JSON.parse(rawPayload);
            var blogArray = processJSON(jsonObj);
            buildHTML(blogArray);
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
    xhttp.send();
}
function loadBlog(){
    getBlogData()
}

window.onload = function () {
    log("start"); 
    loadBlog();
}
