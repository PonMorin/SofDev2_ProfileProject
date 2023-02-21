function searchData() {
    var input = document.getElementById("user-search").value.toLowerCase();
    var cards = document.getElementsByClassName("profile");
    for (var i = 0; i < cards.length; i++) {
      var email = cards[i].getElementsByClassName("profile-email")[0].innerHTML.toLowerCase();
      var name = cards[i].getElementsByClassName("profile-name")[0].innerHTML.toLowerCase();
      var department = cards[i].getElementsByClassName("profile-department")[0].innerHTML.toLowerCase();
      var tag = cards[i].getElementsByClassName("profile-tag")[0].innerHTML.toLowerCase();
      var roles = cards[i].getElementsByClassName("profile-roles")[0].innerHTML.toLowerCase();
      if (email.includes(input) || name.includes(input) || department.includes(input) || tag.includes(input) || roles.includes(input)) {
        cards[i].style.display = "block";
      } else {
        cards[i].style.display = "none";
      }
    }
}