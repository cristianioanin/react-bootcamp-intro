function ItemForm({ listId, setListsFn }) {
    const uuid = {
        form: window.crypto.randomUUID(),
        input: window.crypto.randomUUID(),
    };

    function submitHandler(e) {
        e.preventDefault();

        const form = document.forms[uuid.form];
        const itemName = form[uuid.input].value;

        form.reset();

        // TODO: de adaugat validari

        fetch('http://localhost:3000/items', {
            method: 'POST',
            body: JSON.stringify({
                name: itemName,
                checked: false,
                listId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((newItem) => {
                setListsFn((currentState) => {
                    return currentState.map((stateList) => {
                        if (stateList.id === listId) {
                            return {
                                ...stateList,
                                items: [...stateList.items, newItem],
                            };
                        }

                        return stateList;
                    });
                });
            });
    }

    return (
        <form
            onSubmit={submitHandler}
            name={uuid.form}
            style={{ display: 'flex' }}
        >
            <input
                type="text"
                placeholder="Item name"
                name={uuid.input}
                required
            />
            <button>Add</button>
        </form>
    );
}

export default ItemForm;
