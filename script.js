var todoList = {
  todos: [],
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of comleted todos
    // for (var i = 0; i < totalTodos; i++) {
    //   if (this.todos[i].completed == true) {
    //     completedTodos++;
    //   }
    // }

    this.todos.forEach(function (todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    // if (completedTodos === totalTodos) {
    //   //make everything false
    //   //   for (var i = 0; i < totalTodos; i++) {
    //   //     this.todos[i].completed = false;
    //   //   }
    //   this.todos.forEach(function (todo) {
    //     todo.completed = false;
    //   });
    // } else {
    //   //   for (var i = 0; i < totalTodos; i++) {
    //   //     this.todos[i].completed = true;
    //   //   }
    //   this.todos.forEach(function (todo) {
    //     todo.completed = true;
    //   });
    // }

    this.todos.forEach(function (todo) {
      // case 1: If everything is true make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        //case 2: otherwise make everything true
        todo.completed = true;
      }
    });
  },
};

var handlers = {
  addTodo: function () {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function () {
    var changeTodoPositionInput = document.getElementById(
      "changeTodoPositionInput"
    );
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function () {
    var toggleCompletedInput = document.getElementById("toggleCompletedInput");
    todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
    toggleCompletedInput.value = "";
    view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  },
};

var view = {
  displayTodos: function () {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";

    //for loop to render li in ul
    // for (var i = 0; i < todoList.todos.length; i++) {
    //   var todoLi = document.createElement("li");
    //   var todo = todoList.todos[i];
    //   var todoTextWithCompletion = "";

    //   //if completed
    //   if (todo.completed === true) {
    //     todoTextWithCompletion = "(x) " + todo.todoText;
    //   } else {
    //     todoTextWithCompletion = "( ) " + todo.todoText;
    //   }

    //   //dom manupilation
    //   //todo with an id of position which is i
    //   todoLi.id = i;
    //   todoLi.textContent = todoTextWithCompletion;
    //   todoLi.appendChild(this.createDeleteTodo());
    //   todosUl.appendChild(todoLi);
    // }

    todoList.todos.forEach(function (todo, position) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";

      //if completed
      if (todo.completed === true) {
        todoTextWithCompletion = "(x) " + todo.todoText;
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText;
      }

      //dom manupilation
      //todo with an id of position which is i
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteTodo());
      todosUl.appendChild(todoLi);
    }, this);

    // for (let el of todoList.todos) {
    //   var todosUl = document.querySelector("ul");
    //   var todoLi = document.createElement("li");
    //   todoLi.textContent = el.todoText;
    //   todosUl.appendChild(todoLi);
    //   console.log(el);
    // }
  },
  createDeleteTodo: function () {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";

    return deleteButton;
  },
  setUpEventListner: function () {
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function (event) {
      console.log(event.target.parentNode.id);
      //get the element that was clicked
      var elementClicked = event.target;

      //check if element clicked is delete button

      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  },
};

view.setUpEventListner();
