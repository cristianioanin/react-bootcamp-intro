import { useState } from 'react';
import ItemForm from './ItemForm';

function List({ list, setListsFn }) {
    const [deleteDisabled, setDeleteDisabled] = useState(false);

    function handleCheckedStatusChange(e, item) {
        const checked = e.target.checked;

        fetch(`http://localhost:3000/items/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...item,
                checked,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                list.items.find((item) => item.id === data.id).checked =
                    checked;

                // Bad practice to directly overwrite props
                // list = {
                //     ...list,
                //     items: list.items.map((item) => {
                //         if (item.id === data.id) {
                //             return {
                //                 ...item,
                //                 checked,
                //             };
                //         }

                //         return item;
                //     }),
                // };
            });
    }

    function handleDeleteList(id) {
        setDeleteDisabled((prev) => !prev);

        fetch(`http://localhost:3000/lists/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setListsFn((previousValue) =>
                        previousValue.filter((list) => list.id !== id)
                    );
                }
            })
            .finally(() => setDeleteDisabled(false));
    }

    return (
        <div className="list">
            <button
                className="delete-list"
                onClick={() => handleDeleteList(list.id)}
                disabled={deleteDisabled}
            >
                x
            </button>
            <h2>{list.title}</h2>
            <ul id={list.id}>
                {list.items.map((item) => (
                    <li key={item.id} id={item.id}>
                        <label>
                            <input
                                type="checkbox"
                                defaultChecked={item.checked}
                                onChange={(e) =>
                                    handleCheckedStatusChange(e, item)
                                }
                            />
                            {item.name}
                        </label>
                    </li>
                ))}
            </ul>
            <ItemForm listId={list.id} setListsFn={setListsFn}></ItemForm>
        </div>
    );
}

export default List;
