import { useEffect, useState } from 'react';
import List from './components/List';
import ListForm from './components/ListForm';

function App() {
    const [lists, setLists] = useState([]);
    window.lists = lists;

    useEffect(() => {
        fetch('http://localhost:3000/lists?_embed=items')
            .then((response) => response.json())
            .then((data) => {
                setLists(data);
            });
    }, []);

    return (
        <main>
            <h1>My Lists</h1>
            <section>
                <h2>Create a new list</h2>
                <ListForm setListsFn={setLists} />
            </section>
            <section className="dashboard">
                {lists?.map((list, index) => (
                    <List key={index} list={list} setListsFn={setLists} />
                ))}
            </section>
        </main>
    );
}

export default App;
