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
}
