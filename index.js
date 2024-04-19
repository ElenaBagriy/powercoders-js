const form = document.querySelector(".form");
const resultField = document.querySelector(".answer-box");
let arrayToSort = [];

form.addEventListener("submit", handleForm);

function handleForm(event) {
  event.preventDefault();
  const inputValue = event.target[0].value.trim();
  const isValid = onValidate(inputValue);

  if (isValid) {
    arrayToSort = [...inputValue.replace(/\s+|,/g, "")];
  }

  const sortedArray = treeSort(arrayToSort);
  resultField.textContent = `Answer: ${sortedArray.join(", ")}`;
}

function onValidate(inputValue) {
  let isValid = true;

  for (let i = 0; i < inputValue.length; i++) {
    const char = inputValue[i];

    if (!(char >= "0" && char <= "9") && char !== "," && char !== " ") {
      isValid = false;
      break;
    }
  }
  if (isValid) {
    return true;
  } else {
    alert("Use right characters");
    return false;
  }
}

// Функция для создания нового узла дерева
function createNode(value) {
  return {
    value: value,
    left: null,
    right: null,
  };
}

// Функция для вставки нового значения в дерево
function insertNode(root, value) {
  if (!root) {
    return createNode(value);
  }

  if (value < root.value) {
    root.left = insertNode(root.left, value);
  } else {
    root.right = insertNode(root.right, value);
  }

  return root;
}

// Функция для обхода дерева и сбора отсортированных значений
function inorderTraversal(root, result) {
  if (!root) {
    return;
  }

  inorderTraversal(root.left, result);
  result.push(root.value);
  inorderTraversal(root.right, result);
}

// Основная функция сортировки чисел методом дерева
function treeSort(nums) {
  let root = null;

  // Вставляем каждое число из массива в дерево
  for (const num of nums) {
    root = insertNode(root, num);
  }

  const sortedResult = [];

  // Обходим дерево в порядке сортировки и собираем отсортированные числа
  inorderTraversal(root, sortedResult);

  return sortedResult;
}
