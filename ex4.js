(function () {
    'use strict';

    var ul = document.getElementById('list');
    var button = document.getElementById('button1');
    var input = document.getElementById('input1');

    var counter = 1;
    var items = [new Item(counter++, 'item 1'), new Item(counter++, 'item 2')];

    render();

    function render() {
        while (ul.hasChildNodes()){
            ul.removeChild(ul.lastChild);
        }

        for (var i = 0; i < items.length; i++)  {
            addLi(items[i]);
        }
    }

    function addItem(item) {
        var itemObj = new Item(counter++, item);
        items.push(itemObj);
        var request = new XMLHttpRequest();
        request.open('POST', '/api/items', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify({id: counter, text: item}));
        render();
    }

    function deleteItem(id) {
        items = items.filter(function(each) {return each.id !== id;});
        render();
    }

    button.onclick = function() {
        addItem(input.value);
    };

    function Item(id, text) {
        this.id = id;
        this.text = text;
    }

    function addLi(item) {
        var li = document.createElement('li');
        li.innerText = item.text;
        ul.appendChild(li);
        var b = document.createElement('button');
        b.innerText = 'X';
        b.onclick = function () {
            deleteItem(item.id);
        };
        li.appendChild(b);
    }
})();
