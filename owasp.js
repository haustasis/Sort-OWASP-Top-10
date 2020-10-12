const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const owasp10 = [
  'Injection',
  'Broken Authentication',
  'Sensitive Data Exposure',
  'XML External Entities (XXE)',
  'Broken Access Control',
  'Security Misconfiguration',
  'Cross-Site Scripting XSS',
  'Insecure Deserialization',
  'Using Components with Known Vulnerabilities',
  'Insufficient Logging & Monitoring',
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...owasp10]
    .map((s) => ({ value: s, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((s) => s.value)
    .forEach((security, index) => {
      const listItem = document.createElement('li');

      // listItem.classList.add('wrong');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="security-name">${security}</p>          
          <i class="fas fa-bug"></i>
        </div>
      `;
      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}
function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}
function dragOver(e) {
  e.preventDefault();
  // console.log('Event: ', 'dragover');
}
function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const securityName = listItem.querySelector('.draggable').innerText.trim();

    if (securityName !== owasp10[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
