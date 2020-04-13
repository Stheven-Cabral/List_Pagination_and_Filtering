/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentListItems = document.querySelectorAll('.student-item');
const itemsPerPage = 10;
const pageContainer = document.querySelector('.page');

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);

   for (let i = 0; i < list.length; i += 1) {
      if (i >= startIndex && i < endIndex) {
         studentListItems[i].style.display = 'block';
      } else {
         studentListItems[i].style.display = 'none';
      } 
   }
}

// showPage(studentListItems, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
   const listLength = list.length;
   const pagesNeeded = Math.ceil(listLength/itemsPerPage);
   let paginationStart = `<ul>`;
   const newDiv = document.createElement('div');
   newDiv.className = "pagination";
   pageContainer.appendChild(newDiv);

   for (let p = 0; p <= pagesNeeded; p += 1) {
      if (p === 0 || p < pagesNeeded ) {
         paginationStart += `<li><a href="#">${p+1}</a></li>`
      } else {
         paginationStart += `</ul>`;
      }
   }
   newDiv.innerHTML = paginationStart;

   const aPageElement = document.querySelectorAll('.pagination a');
   aPageElement[0].classList.add('active');
   for (let a = 0; a < aPageElement.length; a += 1) {
      aPageElement[a].addEventListener('click', (e) => {
         for (let b = 0; b < aPageElement.length; b += 1) {
            aPageElement[b].classList.remove('active');
         }
         aPageElement[a].classList.add('active');
         showPage(studentListItems, a+1);
      });
   }
}

showPage(studentListItems, 1);
appendPageLinks(studentListItems);


/***
 * appendSearchBar function - Appends a search bar to the page.
 * Called the appendSearchBar function.
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
 * Create global variables for the search input and search button.
 * `searchList` function - filters the list of students when a user uses the search bar.
 * Call the `searchList` function on search button click event.
 * Call the `searchList` function on search bar keyup event.
 ***/

const search = document.querySelector('#search-input');
const submit = document.querySelector('#search-button');

function searchList(searchInput, students) {
   let searchResults = [];

   for (let i = 0; i < students.length; i += 1) {
      students[i].style.display = 'none';
      if (searchInput.value.length !== 0 && students[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
         students[i].style.display = 'block';
         searchResults.push(students[i]);
      } else if (searchInput.value.length === 0) {
         students[i].style.display = 'block';
         searchResults.push(students[i]);
         showPage(studentListItems, 1);
      }
   }

   addNoResultAlert(searchResults);
   adjustPagination(searchResults);
 }

 submit.addEventListener('click', (event) => {
   event.preventDefault();
   searchList(search, studentListItems);
 });

 search.addEventListener('keyup', () => {
   searchList(search, studentListItems);
 });

 /**
  * `adjustPagination` function - Takes ones parameter, a list. The function removes the existing
  * pagination, and adds a new based on the number of students in the filtered list.
  * @param {array} list 
  ***/

 function adjustPagination(list) {
    const paginationContainer = document.querySelector('.pagination');
    pageContainer.removeChild(paginationContainer);
    appendPageLinks(list);
 }

 /***
  * `addNoResultAlert` function - Takes one paramenter, a list, and displays 'No Result' if the list is empty.
  */
 function addNoResultAlert(list) {
    if (list.length === 0) {
       const noResultAlertContainer = document.createElement('p');
       noResultAlertContainer.textContent = "No Results";
       pageContainer.appendChild(noResultAlertContainer);
    }
 }