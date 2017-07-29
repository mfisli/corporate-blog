// >> TODO <<
// Contact Us:
//  Responsive layout
//  Include names that are close to search keyword
//  Display staff sorted by last name 
// Posts / Home page: 
//  Pagination on posts on home page
//  Add placeholder images with each post
//  Add favicon
// About Us:
//  Add placeholder banner 
// Nice to have: 
//  jQ UI animations

'use strict';
var staff = {
    listings : []
};
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
function buildStaffHTML(staffMembers){
    var staffHTML = document.getElementById("staff");
    staffHTML.innerHTML = ""; 
    if(!staffMembers){
        var staffMembers = staff.listings;
    }
    if(staffMembers.length != 0){
        log("Building HTML with " + staffMembers.length + " employees(s)."); 
    } else {
        log("ERROR! Staff is empty.");
        return;
    }
    // TODO replace hard-coded keys 

    for(var i = 0; i < staffMembers.length; i++){
        staffHTML.innerHTML += 
        "<div class='employee'>" +
         "<img src='http://via.placeholder.com/150x150' alt=\'" + staffMembers[i].name + " photo\'/>" + 
         "<h4 class='employee-name'>" + staffMembers[i].name + "<br /></h4>" +  
         "<p class='employee-email'> Email: " +  staffMembers[i].email + "</p>" +
         "<p class='employee-phone'> Phone: " +  staffMembers[i].phone + "</p>" +
         "<p class='employee-catch-phrase'>" + staffMembers[i].company.catchPhrase + "</p>" + 
        "</div>"; 
    }

}
function getEmployees(){
    var staffHTML = document.getElementById("staff");
    if (!staffHTML){
        log("ERROR! No staff element.");
        return;
    }
    log("Getting employees ...");
    staffHTML.innerHTML = "Loading Staff ...";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            log("Got employees");
            staff.listings = JSON.parse(this.responseText);
            buildStaffHTML();
        }
    }
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
    xhttp.send(); 
} 
function buildAboutUsHTML(obj){
    if(!obj){
        log("ERROR! About us is empty.");
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
function searchNames(){
    var target = document.getElementById('name').value; 
    if (!target){
        log("No names given.");
        buildStaffHTML(staff.listings);
        return;
    }
    if(!staff.listings.length){
        log('Nothing to search');
        return;
    }
    log("Considering " + staff.listings.length + " Staff member(s).");
    var result = []; 
    for(let employee of staff.listings){
        if (employee.name == target){
            result.push(employee);
            log("Added " + employee.name);
        }
    }
    buildStaffHTML(result);
}