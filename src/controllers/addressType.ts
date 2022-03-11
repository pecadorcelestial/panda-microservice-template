import { Request, Response } from 'express';
import AddressTypeModel from '../models/addressType';
import { RemodelMongoDBErrors } from '../scripts/data-management';
import configuration from '../configuration';
import { getQueryResume } from '../scripts/models';
import { buildQuery } from '../scripts/parameters';

export class AddressTypeController {
    
    // GGGG EEEEE TTTTT
    //G     E       T
    //G  GG EEE     T
    //G   G E       T
    // GGGG EEEEE   T

    public getAddressTypes(request: Request, response: Response): void {
        // Filtros.
        let { all, limit, page, sort, ...filters } = request.query;
        all = all ? JSON.parse(all) : false;
        // Se eliminan todas las llaves cuyo valor sea exactamente "undefined".
        Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
        // Filtros tipo LIKE, es decir, de tipo 'string'.
        let regExFilters: Array<string> = ['name', 'value'];
        Object.keys(filters).forEach(key => {
            if(regExFilters.indexOf(key) >= 0) {
                filters[key] = { $regex: filters[key], $options: 'i' };
            }
        });
        // Filtros de tipo fecha.
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
        getQueryResume(AddressTypeModel, filters)
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
        AddressTypeModel.find(filters, null, pagination, (error: any, data: any) => {
            if(error) {
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                let result = {
                    results: data,
                    summary
                };
                response.status(200).end(JSON.stringify(result));
            }
        });
    }

    public getAddressType(request: Request, response: Response): void {
        let { id, full, ...filters } = request.query;
        if(!filters.hasOwnProperty('_id') && id) filters['_id'] = id;
        AddressTypeModel.findById(filters, (error: any, data: any) => {
           if(error){
               response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
           } else {
               response.status(200).end(JSON.stringify(data));
           }
        });
    }

    //PPPP   OOO   SSSS TTTTT
    //P   P O   O S       T
    //PPPP  O   O  SSS    T
    //P     O   O     S   T
    //P      OOO  SSSS    T

    public postAddressType(request: Request, response: Response): void {
        let status = new AddressTypeModel(request.body);
        status.save((error: any, data: any) => {
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

    public putAddressType(request: Request, response: Response): void {
        let { _id, id, value, ...data } = request.body;
        let filters = {
            _id: (_id || id),
            value
        }
        AddressTypeModel.findOneAndUpdate(filters, { $set: data }, { new: true }, (error: any, data: any) => {
            if(error) {
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

    public deleteAddressType(request: Request, response: Response): void {
        let { id, ...filters } = request.query;
        if(!filters.hasOwnProperty('_id') && id) filters['_id'] = id;
        AddressTypeModel.findOneAndDelete(filters, (error: any, data: any) => {
            if(error) {
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con el identificador proporcionado.' }));
            } else {
                response.status(200).end(JSON.stringify({ message: 'Registro eliminado con éxito.' }));
            }
        });
    }

}