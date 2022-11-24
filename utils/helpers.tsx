export function isValidQuery(query: string | string[] | undefined) {
    // check the query properties
    return typeof query === "string";
}