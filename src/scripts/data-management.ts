/**
* Recibe una variable de tipo string con las cookies y devuelve un arreglo con los datos.
*
* @export
* @param {(string | undefined)} cookies
* @returns {(any | undefined)}
*/
export function parseCookies(cookies: string | undefined): any | undefined {
    if(cookies && cookies != '') {
        let result: any = {};
        cookies.split(';').forEach((cookie: string) => {
            try {
                let cookieParts: string[] = cookie.split('=');
                result[cookieParts[0]] = decodeURI(cookieParts[1]);
            } catch(exception) {

            }
        });
        return result;
    } else {
        return undefined;
    }
}

/**
* Obtiene un arreglo de errores devueltos por la librería "mongoose" y extrae sólo las restricciones de cada error.
*
* @export
* @param {any} errors
* @returns {any}
*/
//TODO:
/*
{ 
    message: 'Cast to ObjectId failed for value "100" at path "_id" for model "Address"',
    name: 'CastError',
    stringValue: '"100"',
    kind: 'ObjectId',
    value: '100',
    path: '_id' 
}
*/
export function RemodelMongoDBErrors(errors: any): any {
    // console.log('[SERVICIOS][SCRIPTS][RemodelMongoDBErrors] Errores: ', JSON.stringify(errors));
    let array: Array<any> = [];
    if(errors.name) {
        switch(errors.name.toLowerCase()) {
            case 'validationerror':
                //Errores devueltos por la librería "mongoose".
                for(let property in errors.errors) {
                    if(errors.errors.hasOwnProperty(property)) {
                        array.push({
                            property,
                            message: errors.errors[property].message
                        });
                    }
                }
                break;
            case 'casterror':
                array.push({
                    property: errors.path,
                    message: errors.message
                });
                break;
            case 'mongoerror':
            default:
                //Errores devueltos por MONGO.
                array.push({
                    code: errors.code,
                    message: errors.errmsg
                });
                break
        }
    } else {
        //Cualquier otro error.
        array.push({
            errors
        });
    }
    //Se devuelte el resultado.
    return { errors: array };
}

/**
* Obtiene un arreglo de errores devueltos por la librería "class-validator" y extrae sólo las restricciones de cada error.
* NOTA: No se utiliza por el momento.
*
* @export
* @param {any} errors
* @returns {any[]}
*/
/*
export function RemodelMySQLErrors(errors: any): any[] {
    let result: any[] = [];
    errors.forEach((error: any) => {
        let constraints: string[] = [];
        for (let property in error.constraints) {
            if (error.constraints.hasOwnProperty(property)) {
                constraints.push(error.constraints[property]);
            }
        }
        result.push({
            property: error.property,
            constraints
        });
    });
    return result;
}
*/
/**
 * Recibe un arreglo de resultados de una consula a MySQL y devuelve un arreglo mejor formado.
 * NOTA: No se utiliza por el momento.
 *
 * @export
 * @param {any[]} rows
 * @returns {any}
*/
/*
export function parseMySQLResults(rows: any[]): any {
    if(rows) {
        let results: any[] = [];
        let item: any;
        //Se recorren uno a uno los identificadores.
        for(let i=0; i<rows.length; i++) {
            //Construcción automática.
            item = {};
            for (let property in rows[i]) {
                if (rows[i].hasOwnProperty(property)) {
                    item[property] = rows[i][property];
                }
            }
            results.push(item);
        }
        return results;
    } else {
        return [];
    }
}
*/