/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
/*** 
 * Created a global variable that contains each student item from the list.
 * Created a global variable that contains each student's name only.
 * Created a global variable for how many items to list per page.
 * Created a global variable assigned to the the `.page`.

***/

const studentListItems = document.querySelectorAll('.student-item');
const studentNames = document.querySelectorAll('.student-details h3');
const itemsPerPage = 10;
const pageContainer = document.querySelector('.page');


/*** 
 * `showPage` function to hide all of the items in the list except for the ten you want to show.
 * @param {array} list - accepts an array of list elements.
 * @param {number} page - accepts the page number you want to view.
***/

function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);

   for (let i = 0; i < list.length; i += 1) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      } 
   }
}


/*** 
 * `appendPageLinks function` - generate, append, and add functionality to the pagination buttons.
   When pagination links are clicked, the student items contained in that page are displayed, and the 
   clicked pagination link remains highlighted.
   @param {array} list - accepts an array of list elements.
***/

function appendPageLinks(list) {
   const listLength = list.length;
   const pagesNeeded = Math.ceil(listLength/itemsPerPage);
   let paginationStart = `<ul>`;
   const newDiv = document.createElement('div');

   newDiv.className = "pagination";
   pageContainer.appendChild(newDiv);

   for (let p = 0; p <= pagesNeeded; p += 1) {
      if (p < pagesNeeded ) {
         paginationStart += `<li><a href="#">${p+1}</a></li>`
      } else {
         paginationStart += `</ul>`;
      }
   }
   newDiv.innerHTML = paginationStart;

   const aPageElement = document.querySelectorAll('.pagination a');
   if (aPageElement.length > 0) {
      aPageElement[0].classList.add('active');
      for (let a = 0; a < aPageElement.length; a += 1) {
         aPageElement[a].addEventListener('click', () => {
            for (let b = 0; b < aPageElement.length; b += 1) {
               aPageElement[b].classList.remove('active');
            }
            aPageElement[a].classList.add('active');
            showPage(list, a+1);
         });
      }
   }   
}


/***
 * Called the `showPage` function to display the first ten student list elements on the first page.
 * Called the `appendPageLinks` function to append the appropriate number of page links based on the `studentListItems` length.
***/

showPage(studentListItems, 1);
appendPageLinks(studentListItems);


/***
 * appendSearchBar function - Appends a search bar to the page.
 * Called the `appendSearchBar` function to append the search bar at the top of the page.
***/

function appendSearchBar() {
   const pageHeaderContainer = document.querySelector('.page-header');
   const searchBarContainer = document.createElement('div');
   pageHeaderContainer.appendChild(searchBarContainer);
   searchBarContainer.classList.add("student-search");
   searchBarContainer.innerHTML = `<input id="search-input" placeholder="Search for students..."><button id="search-button">Search</button>`;
}
appendSearchBar()


/***
* Created global variables assigned to the `#search-input` and `#search-button`.
 ***/

const search = document.querySelector('#search-input');
const submit = document.querySelector('#search-button');


/***
 * `searchList` function - filters the list of students when a user uses the search bar. 
   In addition calls the `addNoResultAlert` and `adjustPagination` functions.
 * @param {string} searchInput - accepts the value of the `#search-input`.
 * @param {array} names - accepts an array of student names.
 * @param {array} student - accepts an array of student list items.
***/

function searchList(searchInput, names, students) {
   let searchResults = [];

   for (let i = 0; i < students.length; i += 1) {
      students[i].style.display = 'none';
      if (searchInput.value.length !== 0 && names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
         students[i].style.display = 'block';
         searchResults.push(students[i]);
         showPage(searchResults, 1);
      } else if (searchInput.value.length === 0) {
         students[i].style.display = 'block';
         searchResults.push(students[i]);
         showPage(studentListItems, 1);
      }
   }
   adjustPagination(searchResults);
   addNoResultAlert(searchResults);
 }


/***
* Called the `searchList` function on `#search-button` click events.
* Called the `searchList` function on `#search-input` keyup events.
***/

 submit.addEventListener('click', (event) => {
   event.preventDefault();
   searchList(search, studentNames, studentListItems);
 });

 search.addEventListener('keyup', () => {
   searchList(search, studentNames, studentListItems);
 });


 /**
  * `adjustPagination` function -  removes the existing pagination, and adds new pagination based on the number of students in the filtered list.
  * @param {array} list - accepts an array filtered student list elements.
  ***/

 function adjustPagination(list) {
   const paginationContainer = document.querySelector('.pagination');
    pageContainer.removeChild(paginationContainer);
    appendPageLinks(list);
 }


 /***
  * `addNoResultAlert` function - adds a <p> element to the the `.page` container. The <p> element contains the string 'Your search returned no results'.
  * Called the `addNoResultAlert' function.
  ***/
 function noResultAlert() {
    const noResultAlertContainer = document.createElement('p');
    noResultAlertContainer.className = 'no-result';
    noResultAlertContainer.textContent = "Your search returned no results.";
    pageContainer.appendChild(noResultAlertContainer);
    noResultAlertContainer.style.visibility = 'hidden';
}
noResultAlert();


/***
 * `addNoResultAlert` takes a list and displays a no result message when the list length is 0; otherwise, the no result message is not displayed.
 * @param {array} list - accepts an array of filtered student list elements. 
 ***/

function addNoResultAlert(list) {
   const noResultAlertContainer = document.querySelector('.no-result');
   if (list.length === 0) {
      noResultAlertContainer.style.visibility = 'visible';
   } else {
      noResultAlertContainer.style.visibility = 'hidden';
   }
}