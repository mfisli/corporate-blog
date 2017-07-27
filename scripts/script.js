// TODO:
// Get users displayed on about page
// Search function for contact us page
// Apply pagination to posts on home page

'use strict';
function log(msg,obj){
    console.log(msg); 
    if(obj){
        console.log(obj);
    }
}
function buildPostsHTML(posts){
    if(posts){
        log("Building HTML with " + posts.length + " post(s)."); 
    } else {
        log("ERROR! Posts are empty.");
        return;
    }
    var postsHTML = document.getElementById("posts");
    postsHTML.innerHTML = ""; 
    for(var i = 0; i < posts.length; i++){
        postsHTML.innerHTML += 
        "<div class='post'>" +
         "<h4 class='post-title'>" + posts[i].title + "<br /></h4>" + 
         "<div class='post-meta'>" + "user name" + " | " + "Jul 25, 2017" + "<br/>" + 
         "<p class='post-body'>" +  posts[i].body + "</p>" + 
        "</div>"; 
    }
}
function getPosts() {
    var posts = document.getElementById("posts")
    if(!posts){
        log("ERROR: No Posts element found!");
        return;
    }
    posts.innerHTML = "Loading Posts ...";
    log("Getting Posts ...");
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
function buildStaffHTML(obj){
    if(obj){
        log("Building HTML with " + obj.length + " staff(s)."); 
    } else {
        log("ERROR! Staff is empty.");
        return;
    }
    // TODO replace hard-coded keys 
    var staffHTML = document.getElementById("staff");
    staffHTML.innerHTML = ""; 
    for(var i = 0; i < obj.length; i++){
        staffHTML.innerHTML += 
        "<div class='employee'>" +
         "<img src='http://via.placeholder.com/150x150' alt=\'" + obj[i].name + " photo\'/>" + 
         "<h4 class='employee-name'>" + obj[i].name + "<br /></h4>" +  
         "<p class='employee-email'> Email: " +  obj[i].email + "</p>" +
         "<p class='employee-phone'> Phone: " +  obj[i].phone + "</p>" +
         "<p class='employee-catch-phrase'>" + obj[i].company.catchPhrase + "</p>" + 
        "</div>"; 
    }

}
function getEmployees(){
    var staff = document.getElementById("staff");
    if (!staff){
        log("ERROR! No staff element.");
        return;
    }
    log("Getting employees ...");
    staff.innerHTML = "Loading Staff ...";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            log("Got employees");
            let jsonObj = JSON.parse(this.responseText);
            buildStaffHTML(jsonObj);
        }
    }
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
    xhttp.send(); 
} 
function buildAboutUsHTML(obj){
    if(!obj){
        log("ERROR! Staff is empty.");
        return;
    }
    log("Building About Us HTML"); 
    var aboutUsHTML = document.getElementById("about-us");
    aboutUsHTML.innerHTML = "";
    var html = "";

    html += "<div class='about-us-body'>";
    for (let item of obj) {
            html +="<p>" + item + "</p>";
    }
    html += "</div>"; 
    aboutUsHTML.innerHTML = html;

}
function getAboutUs(){
    var aboutUs = document.getElementById("about-us");
    if (!aboutUs){
        log("ERROR! Missing about-us-body element");
        return;
    } 
    log("Getting About Us ..."); 
    aboutUs.innerHTML = "Loading About Us ...";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            log("Got About Us.");
            let jsonObj = JSON.parse(this.responseText);
            buildAboutUsHTML(jsonObj);
        }
    }
    xhttp.open("Get", "https://baconipsum.com/api/?type=meat-and-filler&paras=3", true);
    xhttp.send(); 

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