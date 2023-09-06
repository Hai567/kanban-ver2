/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    return {
        user_id: params.user_id,
        kanban_id: params.kanban_id 
    }
};