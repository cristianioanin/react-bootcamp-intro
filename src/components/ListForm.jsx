function ListForm({ setListsFn }) {
    function submitHandler(e) {
        e.preventDefault();

        const form = document.forms['list-form'];
        const input = form['list-title'];
        const title = input?.value; // undefined daca e null/undefined inainte de ? (Elvis operator)

        form.reset();

        if (!title) {
            // inseamna ca s-a scos required de pe input
            input.setAttribute('required', true);
            form.reportValidity();

            return;
        }

        // avem titlu
        fetch('http://localhost:3000/lists', {
            method: 'POST',
            body: JSON.stringify({ title }),
            headers: {
                'Content-Type': 'application/json',
            },
            // }).then((param) => console.log(param)); // o noua declaratie de functie, care apeleaza console.log in corpul functiei
            // }).then(console.log); // referinta la declaratia functiei console.log
        })
            .then((response) => response.json())
            .then((newList) => {
                // vrem sa actualizam state plecand de la valoarea curenta pe care o avem pe state
                // lists ?
                setListsFn((currentState) => {
                    // currentState = [{ title: "Title", id: "1" }]
                    return [
                        ...currentState,
                        {
                            ...newList,
                            items: [],
                        },
                    ];
                });
            });
    }

    return (
        <form onSubmit={submitHandler} name="list-form">
            <input
                type="text"
                placeholder="List title"
                name="list-title"
                required
            />
            <button>Create</button>
        </form>
    );
}

export default ListForm;
