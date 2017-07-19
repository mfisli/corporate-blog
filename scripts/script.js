function log(msg){
    console.log(msg); 
}
function loadBlog() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("blogs").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
  xhttp.send();
}

window.onload = function () {
    log("start"); 
    loadBlog()
}
