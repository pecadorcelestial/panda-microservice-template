import { Request, Response } from 'express';
import AddressModel from '../models/address';
import { RemodelMongoDBErrors } from '../scripts/data-management';
import configuration from '../configuration';
import { ZipCodeModel } from '../models/locations';
import { getQueryResume } from '../scripts/models';
import { buildQuery } from '../scripts/parameters';

export default class AddressController{

    // GGGG EEEEE TTTTT
    //G     E       T
    //G  GG EEE     T
    //G   G E       T
    // GGGG EEEEE   T

    /**
     * @apiDefine ApiSingleSuccess
     * 
     * @apiSuccess {String} _id Identificador único generado por MongoDB.
	 * @apiSuccess {String} parentId Identificador tipo ObjectId del catálogo padre.
	 * @apiSuccess {String} street Nombre de la calle.
	 * @apiSuccess {String} outdoorNumber Número exterior.
	 * @apiSuccess {String} interiorNumber Número interior.
	 * @apiSuccess {String} settlement Nombre de la colonia / asentamiento.
	 * @apiSuccess {String} location Información sobre la ubicación.
	 * @apiSuccess {String} reference Referencia de la dirección.
	 * @apiSuccess {Number} latitude Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.
	 * @apiSuccess {Number} longitude Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..
	 * @apiSuccess {Number} zipCode Código postal.
	 * @apiSuccess {Number} zipCodeId Identificador tipo ObjectId del catálogo de ubicaciones.
	 * @apiSuccess {Date} createdAt Fecha de creación.
	 * @apiSuccess {Date} updatedAt Fecha de la última modificación.
     * 
     * @apiSuccessExample Success-Response:
     * {
     *     "loc": {
     *         "coordinates": [
     *             -100.3889093,
     *             20.6165895
     *         ],
     *         "type": "Point"
     *     },
     *     "_id": "5c704eeaf4ce5a673cc0bb14",
     *     "parentId": "5c6f2856f002554ab4b07fd5",
     *     "street": "Nogal",
     *     "outdoorNumber": "121",
     *     "interiorNumber": "3er. Piso",
     *     "settlement": "Arboledas",
     *     "location": "",
     *     "reference": "",
     *     "latitude": 20.6165895,
     *     "longitude": -100.3889093,
     *     "zipCode": 76140,
     *     "zipCodeId": 1,
     *     "createdAt": "2019-02-22T19:35:06.150Z",
     *     "updatedAt": "2019-02-22T19:35:06.150Z",
     *     "__v": 0
     * }
     */

    /**
     * @api {get} /address Solicita la información de una dirección.
     * @apiVersion 1.0.0
     * @apiName GetAddress
     * @apiGroup Address
     * 
     * @apiParam {ObjectId} id Identificador único de la dirección.
     * 
     * @apiExample Ejemplo de uso:
     * curl -i http://localhost:8098/address?id=5c704eeaf4ce5a673cc0bb14
     * 
     * @apiUse ApiSingleSuccess
     * 
     * @apiError AddressNotFound Un objeto vacío.
     * 
     * @apiErrorExample Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {}
     */
    public getAddress(request: Request, response: Response): void {
        let { id, full, ...filters } = request.query;
        if(!filters.hasOwnProperty('_id') && id) filters['_id'] = id;
        AddressModel.findOne(filters)
        .populate({ path: 'extraDetails' })
        .populate({ path: 'type', select: '-_id name value' })
        .exec(async (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con el identificador proporcionado.' }));
            } else {
                // Se cambia el formato del código postal.
                let _data: any = Object.assign({}, data._doc);
                try {
                    // Código Postal.
                    if(typeof _data.zipCode === 'number' && _data.zipCode > 0) {
                        let newZipCode: string = _data.zipCode.toString();
                        if(newZipCode.length === 4) {
                            newZipCode = `0${newZipCode}`;
                        }
                        _data.zipCode = newZipCode;
                    }
                } catch(error) {}
                // Se llenan los sub documentos si así se pide.
                full = full ? JSON.parse(full) : false;
                if(full) {
                    let populateQuery = [
                        { 
                            path: 'country', 
                            select: '_id name' 
                        }, 
                        { 
                            path: 'state', 
                            select: '_id name' 
                        },
                        { 
                            path: 'town',
                            // match: {
                            //     id: 'town',
                            //     state: 'state',
                            //     country: 'country'
                            // },
                            select: '_id name' 
                        },
                        { 
                            path: 'settlement', 
                            select: '_id name' 
                        }
                    ];
                    await ZipCodeModel.populate(data.extraDetails, populateQuery, (error: any, newData: any) => {
                        if(error) {
                            response.status(200).end(JSON.stringify(_data));
                        } else {
                            _data.extraDetails = newData;
                            response.status(200).end(JSON.stringify(_data));
                        }
                    });
                } else {
                    response.status(200).end(JSON.stringify(_data));
                }
            }
        });
    }

    /**
     * @apiDefine ApiArraySuccess
     * 
     * @apiSuccess {Object[]} addresses Arreglo de direcciones.
     * @apiSuccess {String} addresses._id Identificador único generado por MongoDB.
	 * @apiSuccess {String} addresses.parentId Identificador tipo ObjectId del catálogo padre.
	 * @apiSuccess {String} addresses.street Nombre de la calle.
	 * @apiSuccess {String} addresses.outdoorNumber Número exterior.
	 * @apiSuccess {String} addresses.interiorNumber Número interior.
	 * @apiSuccess {String} addresses.settlement Nombre de la colonia / asentamiento.
	 * @apiSuccess {String} addresses.location Información sobre la ubicación.
	 * @apiSuccess {String} addresses.reference Referencia de la dirección.
	 * @apiSuccess {Number} addresses.latitude Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.
	 * @apiSuccess {Number} addresses.longitude Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..
	 * @apiSuccess {Number} addresses.zipCode Código postal.
	 * @apiSuccess {Number} addresses.zipCodeId Identificador tipo ObjectId del catálogo de ubicaciones.
	 * @apiSuccess {Date} addresses.createdAt Fecha de creación.
	 * @apiSuccess {Date} addresses.updatedAt Fecha de la última modificación.
     * 
     * @apiSuccessExample Success-Response:
     * [
	 *	 {
	 *	     "loc": {
	 *	         "coordinates": [
	 *	             -100.3889093,
	 *	             20.6165895
	 *	         ],
	 *	         "type": "Point"
	 *	     },
	 *	     "_id": "5c704eeaf4ce5a673cc0bb14",
	 *	     "parentId": "5c6f2856f002554ab4b07fd5",
	 *	     "street": "Nogal",
	 *	     "outdoorNumber": "121",
	 *	     "interiorNumber": "3er. Piso",
	 *	     "settlement": "Arboledas",
	 *	     "location": "",
	 *	     "reference": "",
	 *	     "latitude": 20.6165895,
	 *	     "longitude": -100.3889093,
	 *	     "zipCode": 76140,
	 *	     "zipCodeId": 1,
	 *	     "createdAt": "2019-02-22T19:35:06.150Z",
	 *	     "updatedAt": "2019-02-22T19:35:06.150Z",
	 *	     "__v": 0
     *	 },
	 *	 {
	 *	     "loc": {
	 *	         "coordinates": [
	 *	             -100.3878499,
	 *	             20.614145
	 *	         ],
	 *	         "type": "Point"
	 *	     },
	 *	     "_id": "5c704eeaf4ce5a673cc0bb14",
	 *	     "parentId": "5c6f2856f002554ab4b07fd5",
	 *	     "street": "Boulevard Bernardo Quintana",
	 *	     "outdoorNumber": "4100",
	 *	     "interiorNumber": "3er. Piso",
	 *	     "settlement": "Alamos 3ra. Sección",
	 *	     "location": "",
	 *	     "reference": "",
	 *	     "latitude": 20.614145,
	 *	     "longitude": -100.3878499,
	 *	     "zipCode": 76160,
	 *	     "zipCodeId": 1,
	 *	     "createdAt": "2019-02-22T19:35:06.150Z",
	 *	     "updatedAt": "2019-02-22T19:35:06.150Z",
	 *	     "__v": 0
     *	 }
     * ]
     */

    /**
     * @api {get} /addresses Solicita la información paginada de todas las direcciones.
     * @apiVersion 1.0.0
     * @apiName GetAddresses
     * @apiGroup Addresses
     * 
     * @apiParam {Number} limit Cantidad de resultados por pagina.
     * @apiParam {Number} page Número de pagina solicitada.
     * @apiParam {Number} zipCode Código postal.
     * 
     * @apiExample Ejemplo de uso:
     * curl -i http://localhost:8098/addresses?limit=20&page=2
     * 
     * @apiUse ApiArraySuccess
     * 
     * @apiError AddressesNotFound Un arreglo vacío.
     * 
     * @apiErrorExample Error-Response:
     *      HTTP/1.1 404 Not Found
     *      []
     */
    public getAddresses(request: Request, response: Response): void {
        //Filtros.
        /*
        * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment
        * 
        * La asignación por 3 puntos (...filters) toma el resto de los parámetros query del request, es decir,
        * TODO lo que no sea "limit" o "page".
        */
        // console.log(request.query);
        let { all, full, limit, page, sort, ...filters }: { all: boolean | string, full: boolean | string, limit: number, page: number, sort: any } & any = request.query;
        all = typeof all === 'boolean' ? all : (typeof all === 'string' ? JSON.parse(all) : false);
        full = typeof full === 'boolean' ? full : (typeof full === 'string' ? JSON.parse(full) : false);
        // console.log('¿Completo? R=', full);
        // Se eliminan todas las llaves cuyo valor sea exactamente "undefined".
        // console.log('[SERVICIOS][DIRECCIONES][getAddresses] Fitros (antes): ', filters);
        Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
        // Para poder implementar expresiones regulares a filtros específicos.
        // https://docs.mongodb.com/manual/reference/operator/query/regex/
        let regExFilters: Array<string> = ['settlement'];
        Object.keys(filters).forEach(key => {
            if(regExFilters.indexOf(key) >= 0) {
                filters[key] = { $regex: filters[key], $options: 'i' };
            }
        });
        // Filtros de tipo fecha.
        // NOTA: El formato de la fecha (de tipo [string]) debe ser el siguiente:
        /*
        https://www.w3schools.com/js/js_date_formats.asp
        ┌───────┬───────────────────────────────┐
        │ Tipo  │ Ejemplo                       │
        ├───────┼───────────────────────────────┤
        │ ISO   │ "1981-08-15"                  │
        │ Short │ "08/15/1981"                  │
        │ Long  │ "Aug 15 1981" o "15 Aug 1981" │
        └───────┴───────────────────────────────┘
        */
        let dateFilters: Array<string> = ['createdAt', 'updatedAt'];
        Object.keys(filters).forEach(key => {
            if(dateFilters.indexOf(key) >= 0) {
                try {
                    let _dateRange = JSON.parse(filters[key]);
                    if(_dateRange && 'start' in _dateRange && 'end' in _dateRange) {
                        filters[key] = { $gte: _dateRange.start, $lte: _dateRange.end };
                    } else {
                        delete filters[key];
                    }
                } catch(e) {

                }
            }
        });
        // Resumen.
        let summary: any = {};
        getQueryResume(AddressModel, filters)
        .then((count: number) => {
            // Paginas totales.
            let pages: number = Math.floor(count / limit);
            pages += count % limit > 0 ? 1 : 0;
            // Pagina anterior.
            let previousPage: string = '';
            if(page > 1) {
                let previousPageParameters = Object.assign({}, request.query);
                previousPageParameters['page'] = page - 1;
                previousPage = `${request.path}${buildQuery(previousPageParameters)}`;
            }
            // Pagina siguiente.
            let nextPage = '';
            if(page < pages) {
                let nextPageParameters = Object.assign({}, request.query);
                nextPageParameters['page'] = page + 1;
                nextPage = `${request.path}${buildQuery(nextPageParameters)}`;
            }
            // Resultado.
            if(!all) {
                summary = {
                    total: count,
                    pages,
                    currentPage: page,
                    nextPage,
                    previousPage
                };
            } else {
                summary = {
                    total: count,
                    pages: 1,
                    currentPage: 1,
                    nextPage: '',
                    previousPage: ''
                };
            }
        })
        .catch((error: any) => {
            
        });
        // Paginación.
        // NOTA: Todos los parámetros obtenidos desde el query son devueltos como tipo "string", por eso la conversión.
        let pagination: any = {};
        if(!all) {
            limit = parseInt(limit) || parseInt(configuration.filters.limit);
            page = parseInt(page) || parseInt(configuration.filters.page);
            const skip: number = limit * (page - 1);
            pagination = { limit, skip };
        }
        // Ordenamiento.
        let sortBy: any = {};
        let _sort = sort ? JSON.parse(sort) : {};
        if(_sort && 'field' in _sort && 'type' in _sort) {
            sortBy[_sort.field] = (_sort.type.trim().toUpperCase() === 'ASC' ? 1 : -1);
        }
        pagination.sort = sortBy;
        // Consulta.
        AddressModel.find(filters, null, pagination)
        .populate({ path: 'extraDetails' })
        .populate({ path: 'type', select: '-_id name value' })
        .exec( async (error: any, data: any[]) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                // Se revisa si se desean los valores completos de los detalles adicionales.
                if(full) {
                    let results: Array<any> = [];
                    let populateQuery = [
                        { 
                            path: 'country', 
                            select: '_id name' 
                        }, 
                        { 
                            path: 'state', 
                            select: '_id name' 
                        },
                        { 
                            path: 'town',
                            select: '_id name' 
                        },
                        { 
                            path: 'settlement', 
                            select: '_id name' 
                        }
                    ];
                    // for await (const document of data) {
                    for(let index: number = 0; index < data.length; index++) {
                        let cData: any = Object.assign({}, data[index]._doc);
                        try {
                            let cNewData = await ZipCodeModel.populate(data[index].extraDetails, populateQuery);
                            cData.extraDetails = cNewData;
                            results.push(cData);
                        } catch(error) {
                            continue;
                        }
                    }
                    let result = {
                        results,
                        summary
                    };
                    response.status(200).end(JSON.stringify(result));
                } else {
                    let result = {
                        results: data,
                        summary
                    };
                    response.status(200).end(JSON.stringify(result));
                }
            }
        });
    }

    // AAA   GGGG  GGGG RRRR  EEEEE  GGGG  AAA  TTTTT EEEEE
    //A   A G     G     R   R E     G     A   A   T   E
    //AAAAA G  GG G  GG RRRR  EEE   G  GG AAAAA   T   EEE
    //A   A G   G G   G R   R E     G   G A   A   T   E
    //A   A  GGGG  GGGG R   R EEEEE  GGGG A   A   T   EEEEE

    /**
     * @apiDefine ApiGeoArraySuccess
     * 
     * @apiSuccess {Object[]} addresses Arreglo de direcciones.
     * @apiSuccess {String} addresses._id Identificador único generado por MongoDB.
	 * @apiSuccess {String} addresses.parentId Identificador tipo ObjectId del catálogo padre.
	 * @apiSuccess {String} addresses.street Nombre de la calle.
	 * @apiSuccess {String} addresses.outdoorNumber Número exterior.
	 * @apiSuccess {String} addresses.interiorNumber Número interior.
	 * @apiSuccess {String} addresses.settlement Nombre de la colonia / asentamiento.
	 * @apiSuccess {String} addresses.location Información sobre la ubicación.
	 * @apiSuccess {String} addresses.reference Referencia de la dirección.
	 * @apiSuccess {Number} addresses.latitude Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.
	 * @apiSuccess {Number} addresses.longitude Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..
	 * @apiSuccess {Number} addresses.zipCode Código postal.
	 * @apiSuccess {Number} addresses.zipCodeId Identificador tipo ObjectId del catálogo de ubicaciones.
	 * @apiSuccess {Date} addresses.createdAt Fecha de creación.
	 * @apiSuccess {Date} addresses.updatedAt Fecha de la última modificación.
     * 
     * @apiSuccessExample Success-Response:
     * [
     *     {
     *         "_id": "5c704eeaf4ce5a673cc0bb14",
     *         "loc": {
     *             "coordinates": [
     *                 -100.3889093,
     *                 20.6165895
     *             ],
     *             "type": "Point"
     *         },
     *         "parentId": "5c6f2856f002554ab4b07fd5",
     *         "street": "Nogal",
     *         "outdoorNumber": "121",
     *         "interiorNumber": "3er. Piso",
     *         "settlement": "Arboledas",
     *         "location": "",
     *         "reference": "",
     *         "latitude": 20.6165895,
     *         "longitude": -100.3889093,
     *         "zipCode": 76140,
     *         "zipCodeId": 1,
     *         "createdAt": "2019-02-22T19:35:06.150Z",
     *         "updatedAt": "2019-02-22T19:35:06.150Z",
     *         "__v": 0,
     *         "distance": 0
     *     },
     *     {
     *         "_id": "5c74098d9213bf1754d79e7f",
     *         "loc": {
     *             "coordinates": [
     *                 -100.3878499,
     *                 20.614145
     *             ],
     *             "type": "Point"
     *         },
     *         "parentId": "5c6f2856f002554ab4b07fd5",
     *         "street": "Boulevard Bernardo Quintana",
     *         "outdoorNumber": "4100",
     *         "interiorNumber": "3er. Piso",
     *         "settlement": "Alamos 3ra. Sección",
     *         "location": "",
     *         "reference": "",
     *         "latitude": 20.614145,
     *         "longitude": -100.3878499,
     *         "zipCode": 76160,
     *         "zipCodeId": 1,
     *         "createdAt": "2019-02-25T15:28:13.586Z",
     *         "updatedAt": "2019-02-25T15:28:13.586Z",
     *         "__v": 0,
     *         "distance": 293.65342451090686
     *     }
     * ]
     */

    /**
     * @api {get} /addresses/byGeoNear Solicita la información de todas las direcciones cerca de un punto.
     * @apiVersion 1.0.0
     * @apiName GetAddressesByGeoLocation
     * @apiGroup Addresses
     * 
     * @apiParam {Number} latitude Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.
     * @apiParam {Number} longitude Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..
     * @apiParam {Number} maxDistance Distancia máxima en metros en los que se buscarán resultados.
     * 
     * @apiExample Ejemplo de uso:
     * curl -i http://localhost:8098/addresses/byGeoNear?latitude=20.6165895&longitude=-100.3889093&maxDistance=10000
     * 
     * @apiUse ApiGeoArraySuccess
     * 
     * @apiError AddressesNotFound Un arreglo vacío.
     * 
     * @apiErrorExample Error-Response:
     *      HTTP/1.1 404 Not Found
     *      []
     */
    //TODO: Agregar los filtros.
    public getAddressesByGeoLocation(request: Request, response: Response): void {
        let { longitude, latitude, maxDistance, ...filters } = request.query;
        AddressModel.aggregate([
                { 
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [parseFloat(longitude), parseFloat(latitude)]
                        },
                        distanceField: 'distance',
                        spherical: true,
                        maxDistance: parseFloat(maxDistance || configuration.filters.maxDistance),
                        query: {}
                    }
                }
            ], (error: any, data: any) => {
                if(error){
                    response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
                } else {
                    response.status(200).end(JSON.stringify(data));
                }
            }
        )
    }

    //PPPP   OOO   SSSS TTTTT
    //P   P O   O S       T
    //PPPP  O   O  SSS    T
    //P     O   O     S   T
    //P      OOO  SSSS    T

    /** 
     * @apiDefine AddressObject
     * 
     * @apiParam {Object} address Objeto / Interface tipo dirección.
     * @apiParam {ObjectId} address.parentId Identificador del catálogo padre.
     * @apiParam {String} addresses._id Identificador único generado por MongoDB.
	 * @apiParam {String} addresses.parentId Identificador tipo ObjectId del catálogo padre.
	 * @apiParam {String} addresses.street Nombre de la calle.
	 * @apiParam {String} addresses.outdoorNumber Número exterior.
	 * @apiParam {String} addresses.interiorNumber Número interior.
	 * @apiParam {String} addresses.settlement Nombre de la colonia / asentamiento.
	 * @apiParam {String} addresses.location Información sobre la ubicación.
	 * @apiParam {String} addresses.reference Referencia de la dirección.
	 * @apiParam {Number} addresses.latitude Distancia angular que hay desde un punto de la superficie de la Tierra hasta el paralelo del ecuador.
	 * @apiParam {Number} addresses.longitude Dimensión de una línea o de un cuerpo considerando su extensión en línea recta..
	 * @apiParam {Number} addresses.zipCode Código postal.
	 * @apiParam {Number} addresses.zipCodeId Identificador tipo ObjectId del catálogo de ubicaciones.
    */

    /**
     * @api {post} /address Guarda la información de una dirección.
     * @apiVersion 1.0.0
     * @apiName PostAddress
     * @apiGroup Address
     * 
     * @apiUse AddressObject
     * 
     * @apiUse ApiSingleSuccess
     * 
     * @apiError AddressNotFound Un objeto vacío.
     * 
     * @apiErrorExample Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {}
     */
    public postAddress(request: Request, response: Response): void {
        let address: any = request.body;
        // Se revisa si la direccipon contiene la propiedad "loc".
        if(!address.hasOwnProperty['loc']) {
            let longitude = address.longitude;
            let latitude = address.latitude;
            address['loc'] = { type: 'Point', coordinates: [longitude, latitude] };
        }
        let newAddressModel = new AddressModel(address);
        newAddressModel.save((error: any, data: any) => {
            if(error){
                // console.log('[DIRECCIONES][CONTROLADOR][postAddress] Error: ', error);
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }

    public postAddresses(request: Request, response: Response): void {
        AddressModel.insertMany(request.body, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }
    
    //PPPP  U   U TTTTT
    //P   P U   U   T
    //PPPP  U   U   T
    //P     U   U   T
    //P      UUU    T

    /**
     * @api {put} /address Actualiza la información de una dirección.
     * @apiVersion 1.0.0
     * @apiName PutAddress
     * @apiGroup Address
     * 
     * @apiUse AddressObject
     * 
     * @apiUse ApiSingleSuccess
     * 
     * @apiError AddressNotFound Un objeto vacío.
     * 
     * @apiErrorExample Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {}
     */
    public putAddress(request: Request, response: Response): void {
        let { _id, id, ...data } = request.body;
        AddressModel.findOneAndUpdate({ _id: (_id || id) }, { $set: data }, { new: true }, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con el identificador proporcionado.' }));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }
    
    //DDDD  EEEEE L     EEEEE TTTTT EEEEE
    //D   D E     L     E       T   E
    //D   D EEE   L     EEE     T   EEE
    //D   D E     L     E       T   E
    //DDDD  EEEEE LLLLL EEEEE   T   EEEEE

    /**
     * @api {delete} /address Elimina la información de una dirección.
     * @apiVersion 1.0.0
     * @apiName DeleteAddress
     * @apiGroup Address
     * 
     * @apiParam {ObjectId} id Identificador único de la dirección.
     * 
     * @apiSuccess {String} messge Mensaje de éxito.
     * 
     * @apiSuccessExample Success-Response:
     * {
     *      message: "Registro eliminado con éxito."
     * }
     * 
     * @apiError AddressNotFound Un objeto vacío.
     * 
     * @apiErrorExample Error-Response:
     *      HTTP/1.1 404 Not Found
     *      {}
     */
    public deleteAddress(request: Request, response: Response): void {
        //NOTA: Por alguna razón de debe utilizar "id" en lugar de "_id" (con guión bajo) (°~°).
        let { id, ...filters } = request.query;
        if(!filters.hasOwnProperty('_id') && id) filters['_id'] = id;
        AddressModel.findOneAndDelete(filters, (error: any, data: any) => {
            //NOTA: Si la función "findOneAndDelete" de verdad encontró el registro, este se devuelve en "data".
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con el identificador proporcionado.' }));
            } else {
                response.status(200).end(JSON.stringify({ message: 'Registro eliminado con éxito.', data }));
            }
        });
    }

    //DDDD  RRRR   OOO  PPPP
    //D   D R   R O   O P   P
    //D   D RRRR  O   O PPPP
    //D   D R   R O   O P
    //DDDD  R   R  OOO  P
    
    // public drop(request: Request, response: Response): void {
    //     AddressModel.collection.drop((error: any) => {
    //         if(error){
    //             response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
    //         } else {
    //             response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
    //         }
    //     });
    // }
}