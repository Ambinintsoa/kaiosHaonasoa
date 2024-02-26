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
  const currentIndex = document.activeElement.tabIndex;
  const next = currentIndex + move;
  const items = document.querySelectorAll("#opKitchen .tablinks");
  const targetElement = items[next];

  const currentIndexTwo = document.activeElement.tabIndex;
  const nextTwo = currentIndexTwo + move;
  const itemsTwo = document.querySelectorAll(".tab .tablinks");
  const targetElementTwo = itemsTwo[nextTwo];

  const currentIndexThree = document.activeElement.tabIndex;
  const nextThree = currentIndexThree + move;
  const itemsThree = document.querySelectorAll(".listChoice");
  const targetElementThree = itemsThree[nextThree];

  const currentIndexFour = document.activeElement.tabIndex;
  const nextFour = currentIndexFour + move;
  const itemsFour = document.querySelectorAll(".listChoiceTrueFalse");
  const targetElementFour = itemsFour[nextFour];

  if (targetElement) {
    targetElement.focus();
  }
  if (targetElementTwo) {
    targetElementTwo.focus();
  }
  if (targetElementThree) {
    targetElementThree.focus();
  }
  if (targetElementFour) {
    targetElementFour.focus();
  }
}
export function showContent(eltFocused) {
  if (eltFocused) {
    // const content = eltFocused.textContent;
    //console.log("Content of focused element: ", content);
    eltFocused.click();
  }
}
