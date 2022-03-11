import * as mongoose from 'mongoose';

/**
 * Devuelve un resumen con los datos generales de la consulta (total de registros, paginas, etc).
 *
 * @export
 * @param {mongoose.Model<mongoose.Document, {}>} model
 * @param {*} filters
 * @returns {Promise<any>}
 */
export function getQueryResume(model: mongoose.Model<mongoose.Document, {}>, filters: any): Promise<any> {
    return new Promise(async (resolve: (value?: {} | PromiseLike<{}> | undefined) => void, reject: (reason?: any) => void) => {
        model.countDocuments(filters, (error: any, count: number) => {
            if(error){
                reject(error);
            } else {
                resolve(count);
            }
        });
    });
}
