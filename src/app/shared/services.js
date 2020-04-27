const endpoint = 'https://reqres.in/api/users';

export const createUser = async (user) => {

    const resp = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify( user ),
        header: {
            'Content-type': 'application/json'
        }
    });

    return await resp.json();
}