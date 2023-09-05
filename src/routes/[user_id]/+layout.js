/** @type {import('./$types').LayoutLoad} */
export async function load({ params }) {
    return { userIDParam: params.user_id };
}