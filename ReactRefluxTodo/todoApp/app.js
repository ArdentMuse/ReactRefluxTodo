var dom = React.DOM;

var items = [
    { name: "Thing1", number: 1 },
    { name: "Thing2", number: 2 },
    { name: "Thing3", number: 3 }
];

var actions = Reflux.createActions(
    ["addTodo"]
);

var store = Reflux.createStore({
    listenables: [actions],
    onAddTodo: function (todoName) {
        items.push({
            name: todoName,
            number: items.length + 1
        });
        console.log("Added Todo!");
        this.trigger();
    },
    getInitialState: function() {
        return { items: items };
    }
});

var TodoItem = React.createClass({
    render: function () {
        var item = this.props.item;
        return dom.li({ className: "todoItem" },
            dom.b(null, item.name + ": "),
            item.number);
    }
});

var TodoList = React.createClass({
    mixins: [Reflux.connect(store)],
    render: function () {
        return dom.ul({ className: "todoList" },
            this.state.items.map(function (item) { return React.createElement(TodoItem, { item: item }); }));
    }
});

var AddTodo = React.createClass({
    mixins: [Reflux.connect(store)],
    addTodo: function() {
        actions.addTodo(this.refs["todoName"].getDOMNode().value);
    },
    render: function() {
        return dom.div({ className: "addTodoControl" },
            dom.input({ type: "text", name: "todoName", ref: "todoName" }),
            dom.button({ id: "addTodoButton", onClick: this.addTodo }, "Add Todo"));
    }
});

var TodoApp = React.createClass({
    render: function() {
        return dom.div({ className: "TodoAppContent" },
            React.createElement(TodoList, null),
            React.createElement(AddTodo, null));
    }
});


React.render(
    React.createElement(TodoApp, null),
    document.getElementById("app"));