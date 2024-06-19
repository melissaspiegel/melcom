import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Create a new unordered list (ul) element
  const ul = document.createElement('ul');
  alert(ul);

  // Iterate over each child element (row) of the block
  [...block.children].forEach((row) => {
    // Create a new list item (li) element
    const li = document.createElement('li');

    // Move all child elements from the row to the list item
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Iterate over each child element of the list item
    [...li.children].forEach((div) => {
      // If the child element contains only a picture, assign a class name for the image
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      // Otherwise, assign a class name for the body content
      else div.className = 'cards-card-body';
    });

    // Append the list item to the unordered list
    ul.append(li);
  });

  // Replace each img element with an optimized picture element
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

  // Clear the content of the block
  block.textContent = '';

  // Append the unordered list to the block
  block.append(ul);
}
