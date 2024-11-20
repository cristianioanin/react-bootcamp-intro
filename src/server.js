const server = {
    async getLists() {
        const response = await fetch(
            'http://localhost:3000/lists?_embed=items'
        );

        return await response.json();
    },
    async getList(id) {
        const response = await fetch(
            `http://localhost:3000/lists/${id}?_embed=items`
        );

        return await response.json();
    },
};

export async function rootLoader() {
    return {
        lists: await server.getLists(),
    };
}

export async function listLoader({ params }) {
    return {
        list: await server.getList(params.id),
    };
}
