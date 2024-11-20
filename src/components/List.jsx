import { useEffect, useState } from 'react';
import ItemForm from './ItemForm';
import { useLoaderData, useNavigate } from 'react-router-dom';

function List({ previewList, preview }) {
    const [deleteDisabled, setDeleteDisabled] = useState(false);
    const loaderData = useLoaderData();
    const [list, setList] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setList(preview ? previewList : loaderData.list);
    }, [preview, previewList, loaderData]);

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
            });
    }

    function handleDeleteList(id) {
        setDeleteDisabled((prev) => !prev);

        fetch(`http://localhost:3000/lists/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/home');
                }
            })
            .finally(() => setDeleteDisabled(false));
    }

    function handleNewItemAdded(item) {
        setList({
            ...list,
            items: [...list.items, item],
        });
    }

    return (
        <>
            {list && (
                <div className={`list ${preview ? 'list-preview' : ''}`}>
                    {!preview && (
                        <button
                            className="delete-list"
                            onClick={() => handleDeleteList(list.id)}
                            disabled={deleteDisabled}
                        >
                            &times;
                        </button>
                    )}
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
                        {preview && <li className="more-items">.....</li>}
                    </ul>
                    {!preview && (
                        <ItemForm
                            listId={list.id}
                            onNewItemAdded={handleNewItemAdded}
                        ></ItemForm>
                    )}
                </div>
            )}
        </>
    );
}

export default List;
