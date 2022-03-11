/**
 * Crea una cadena "query" a partir de los parámetros enviados.
 *
 * @export
 * @param {*} parameters
 * @returns {string}
 */
export function buildQuery(parameters: any): string {
    let result: string = '';
    let keys: string[] = Object.keys(parameters);
    if(keys && keys.length > 0) {
        let entries: [string, {}][] = Object.entries(parameters);
        for(const [key, value] of entries) {
            result += `${(result === '' ? '?' : '&')}${key}=${value}`
        }
    }
    return result;
}