'use strict';
const KEY_ENTER = 13;

document.addEventListener('DOMContentLoaded', () => {
  const newTodoElement = document.querySelector('.new-todo');
  const todoListElement = document.querySelector('.todo-list');
  const footerElement = document.querySelector('.footer');
  const todoCountElement = document.querySelector('.todo-count strong');
  const clearCompletedElement = document.querySelector('.clear-completed');

  // sorgt dafür das der footer eingeblendet wird wenn nötig

  const refreshFooter = () => {
    if (todoListElement.children.length == 0) {
      footerElement.style.display = 'none';
    } else {
      footerElement.style.display = '';
    }
    let todoCounter = 0;
    for (const todoListItem of todoListElement.children) {
      if (!todoListItem.classList.contains('completed')) {
        todoCounter++;
      }
    }
    todoCountElement.innerText = todoCounter;

    // sorgt dafür das mitgezählt wird und der clear button nur dann da ist, wenn er da sein soll also wenn todos completed sind

    let completedCounter = 0;
    for (const a of todoListElement.children) {
      if (a.classList.contains('completed')) {
        completedCounter++;
      }
    }

    if (completedCounter === 0) {
      clearCompletedElement.style.display = 'none';
    } else {
      clearCompletedElement.style.display = '';
    }
  };

  // sorgt dafür das die completed tasks aus der liste gelöscht werden wenn der button geklickt wird

  clearCompletedElement.addEventListener('click', () => {
    const completedLiElements = todoListElement.querySelectorAll(
      'li.completed'
    );
    for (const completedLiElement of completedLiElements) {
      completedLiElement.remove();
    }
    refreshFooter();
  });

  refreshFooter();

  //sorgt dafür das häckchen und x funktionieren in dem die classen hinzugefügt werden bzw. das li mit remove entfernt wird

  const addCallbacksForLi = liElement => {
    const checkboxElement = liElement.querySelector('.toggle');
    const destroyButtonElement = liElement.querySelector('.destroy');
    checkboxElement.addEventListener('change', () => {
      if (checkboxElement.checked) {
        liElement.classList.add('completed');
      } else {
        liElement.classList.remove('completed');
      }
      refreshFooter();
    });
    destroyButtonElement.addEventListener('click', () => {
      liElement.remove();
      refreshFooter();
    });
  };

  //hier wird die ganze html struktur aufgebaut also ein neues listenelement hinzugefügt wird

  newTodoElement.addEventListener('keypress', event => {
    if (event.which == KEY_ENTER && newTodoElement.value !== '') {
      const newButtonElement = document.createElement('button');
      newButtonElement.classList.add('destroy');

      const newLabelElement = document.createElement('label');
      newLabelElement.appendChild(
        document.createTextNode(newTodoElement.value)
      );

      const newInputCheckbox = document.createElement('input');
      newInputCheckbox.type = 'checkbox';
      newInputCheckbox.classList.add('toggle');

      const newDivElement = document.createElement('div');
      newDivElement.classList.add('view');
      newDivElement.appendChild(newInputCheckbox);
      newDivElement.appendChild(newLabelElement);
      newDivElement.appendChild(newButtonElement);

      const newLiElement = document.createElement('li');
      newLiElement.appendChild(newDivElement);

      addCallbacksForLi(newLiElement);

      todoListElement.prepend(newLiElement);

      newTodoElement.value = '';

      refreshFooter();
    }
  });
});
