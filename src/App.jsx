import { Link, useLoaderData } from 'react-router-dom';
import List from './components/List';

function App() {
    let { lists } = useLoaderData();
    lists = lists.map((list) => ({
        ...list,
        items: list.items.slice(0, 2),
    }));

    return (
        <main>
            <h1>My Lists</h1>
            <section className="dashboard">
                {lists?.map((list) => (
                    <Link to={`/lists/${list.id}`} key={list.id}>
                        <List previewList={list} preview={true} />
                    </Link>
                ))}
                <div className="list new-list">
                    <Link to={'/new'}>
                        <button>+</button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default App;
