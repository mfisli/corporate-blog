'use strict';
function log(msg,obj){
    console.log(msg); 
    if(obj){
        console.log(obj);
    }
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
function buildPostsHTML(posts){
    if(posts){
        log("Building HTML with " + posts.length + " post(s)."); 
    } else {
        log("ERROR! Posts are empty.");
        return;
    }
    var blogHTML = document.getElementById("posts");
    blogHTML.innerHTML = ""; 
    for(var i = 0; i < posts.length; i++){
        blogHTML.innerHTML += 
        "<div class='post'>" +
         "<h4 class='post-title'>" + posts[i].title + "<br /></h4>" + 
         "<p class='post-body'>" +  posts[i].body + "</p>" + 
        "</div>"; 
    }
}
function getPosts() {
    log("Getting Posts ...");
    document.getElementById("posts").innerHTML = "Loading Posts ...";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            log("Got posts.");
            let rawPosts = this.responseText;
            let postsArray = JSON.parse(rawPosts);
            buildPostsHTML(postsArray); 
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    xhttp.send();
}
function loadBlog(){
    //getUsers();  
    getPosts();
}
window.onload = function () {
    log("start"); 
    loadBlog();
}
/*
function getUsers() { // this would be cleaner with jQuery when().then()
    log("Getting Users ...");
    document.getElementById("blog").innerHTML = "Loading Users ...";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            log("Got users.");
            let rawPayload = this.responseText;
            let jsonObj = JSON.parse(rawPayload);
            usersArray = processUsers(jsonObj);   // don't really need a constr; it's already an object
            usersReady = true;
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
    xhttp.send();
}

function processUsers(obj){
    var blogArray = []; 
    for( var i = 0; i < obj.length; i++){
        let name = obj[i].username;
        let city = obj[i].address.city;
        let subject = obj[i].company.catchPhrase;
        let body = obj[i].company.bs;
        blogArray.push(new Blog(name,city,subject,body));
    }
    return blogArray;
}*/