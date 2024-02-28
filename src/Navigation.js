var classBefore = "idk";

var activeTab;

export function miFade() {
  document.getElementById("home").style.opacity = "1";
}
export function kitchen() {
  document.getElementById("kitchen").style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("home").style.opacity = "0";
}
export function home() {
  document.getElementById("home").style.display = "flex";
  document.getElementById("kitchen").style.display = "none";
  setTimeout(miFade, 50);
}
export function openSelection(evt, userSelection, choosenClass, textContent) {
  var i, tabcontent, tablinks;
  activeTab = userSelection;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  var x = document.querySelector("#opNav");
  x.classList.remove(classBefore);
  x.classList.add(choosenClass);
  document.querySelector("#opNav span").innerHTML = textContent;
  document.getElementById(userSelection).style.display = "block";
  evt.currentTarget.className += " active";
  classBefore = choosenClass;
}
export function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById(activeTab).style.display = "none";
}
export function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById(activeTab).style.display = "block";
}
/**
 * TEST NAVIGATION
 */

export function nav(move) {
  //refa home active de ty no gestion ny navigation
  if (document.getElementById("home").style.display != "none") {
    console.log("navigation.js nav home != none");
    const currentIndex = document.activeElement.tabIndex;
    var next = currentIndex + move;
    next %= 4;
    const items = document.querySelectorAll("#opKitchen .tablinks");
    const targetElement = items[next];
    if (targetElement) {
      targetElement.focus();
    }
  }
  //refa mySidenav misokatra de ty no gestion ny navigation
  if (document.getElementById("mySidenav").style.width == "100%") {
    console.log("navigation.js nav mySidenav == 100%");

    const currentIndexTwo = document.activeElement.tabIndex;
    var nextTwo = currentIndexTwo + move;
    nextTwo %= 5;
    const itemsTwo = document.querySelectorAll(".tab .tablinks");
    const targetElementTwo = itemsTwo[nextTwo];
    if (targetElementTwo) {
      targetElementTwo.focus();
    }
  }

  // const currentIndexFour = document.activeElement.tabIndex;
  // var nextFour = currentIndexFour + move;
  // if (nextFour >= 2) nextFour = 1;
  // if (nextFour === -1) nextFour = 0;
  // const itemsFour = document.querySelectorAll(".listChoiceTrueFalse");
  // const targetElementFour = itemsFour[nextFour];
}
export function showContent(eltFocused) {
  if (eltFocused) {
    // const content = eltFocused.textContent;
    //console.log("Content of focused element: ", content);
    eltFocused.click();
  }
}
