import { Request, Response } from 'express';
import { CountryModel, StateModel, TownModel, ZipCodeModel, SettlementModel } from '../models/locations';
import { RemodelMongoDBErrors } from '../scripts/data-management';
import configuration from '../configuration';

//PPPP   AAA  IIIII  SSSS
//P   P A   A   I   S
//PPPP  AAAAA   I    SSS
//P     A   A   I       S
//P     A   A IIIII SSSS

export class CountryController {

    // GGGG EEEEE TTTTT
    //G     E       T
    //G  GG EEE     T
    //G   G E       T
    // GGGG EEEEE   T

    public getCountry(request: Request, response: Response): void {
        CountryModel.find(request.params.id, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }

    public getCountries(request: Request, response: Response): void {
        //Filtros.
        /*
        * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment
        * 
        * La asignación por 3 puntos (...filters) toma el resto de los parámetros query del request, es decir,
        * TODO lo que no sea "limit" o "page".
        */
        let { limit, page, ...filters } = request.query;
        //Se eliminan todas las llaves cuyo valor sea exactamente "undefined".
        // console.log('[SERVICIOS][DIRECCIONES][getCountries] Fitros (antes): ', filters);
        Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
        //Para poder implementar expresiones regulares a filtros específicos.
        //https://docs.mongodb.com/manual/reference/operator/query/regex/
        let regExFilters: Array<string> = ['name'];
        Object.keys(filters).forEach(key => {
            if(regExFilters.indexOf(key) >= 0) {
                filters[key] = { $regex: filters[key], $options: 'i' };
            }
        });
        //Filtros de tipo fecha.
        //NOTA: El formato de la fecha (de tipo [string]) debe ser el siguiente:
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
                    let startDate = new Date(filters[key]);
                    let endDate = new Date(filters[key]);
                    //Se agrega un día a la finca final.
                    endDate.setDate(endDate.getDate() + 1);
                    filters[key] = { $gte: startDate, $lt: endDate };
                } catch(e) {

                }
            }
        });
        // console.log('[SERVICIOS][DIRECCIONES][getCountries] Fitros (después): ', filters);
        //Paginación.
        //NOTA: Todos los parámetros obtenidos desde el query son devueltos como tipo "string", por eso la conversión.
        limit = parseInt(limit) || parseInt(configuration.filters.limit);
        page = parseInt(page) || parseInt(configuration.filters.page);
        const skip: number = limit * (page - 1);
        //Consulta.
        //Product.find({ name: { $regex: 'sorv', $options: 'i'}})
        CountryModel.find(filters, null, { /*limit, skip,*/ sort: { name: 1 } }, (error: any, data: any) => {
            if(error){
                console.log('[CONTROLADORES][PAISES][getCountries] Error: ', error);
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con la información proporcionada.' }));
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

    public postCountry(request: Request, response: Response): void {
        let newCountryModel = new CountryModel(request.body);
        newCountryModel.save((error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }
    
    public postInitializeCountries(request: Request, response: Response): void {
        //1. Se elimina toda la información.
        CountryModel.collection.drop((error: any) => {
            if(error && error.code != 26){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                // response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
                console.log('[CONTROLADORES][CÓDIGOS POSTALES][postInitializeStates] La colección de eliminó con éxito.');
                //2. Se inserta la nueva información.
                const countriesJSON = require('../info/countries.json');
                let countries: Array<any> = [];
                countriesJSON.forEach((country: any, index: number) => {
                    countries.push({
                        _id: (index + 1),
                        name: country.name,
                        country: country.country
                    });
                });
                CountryModel.insertMany(countries, (error: any, data: any) => {
                    if(error){
                        response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
                    } else {
                        response.status(200).end(JSON.stringify(data));
                    }
                });
            }
        });
    }

    //PPPP  U   U TTTTT
    //P   P U   U   T
    //PPPP  U   U   T
    //P     U   U   T
    //P      UUU    T

    public putCountry(request: Request, response: Response): void {
        CountryModel.findOneAndUpdate({ _id: request.body._id }, request.body, { new: true }, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
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

    public deleteCountry(request: Request, response: Response): void {
        CountryModel.findOneAndDelete({ _id: request.query._id }, (error: any, data: any) => {
            //NOTA: Si la función "findOneAndDelete" de verdad encontró el registro, este se devuelve en "data".
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con el identificador proporcionado.' }));
            } else {
                response.status(200).end(JSON.stringify({ message: 'Registro eliminado con éxito.' }));
            }
        });
    }

    //DDDD  RRRR   OOO  PPPP
    //D   D R   R O   O P   P
    //D   D RRRR  O   O PPPP
    //D   D R   R O   O P
    //DDDD  R   R  OOO  P
    
    public dropCountries(request: Request, response: Response): void {
        CountryModel.collection.drop((error: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
            }
        });
    }
}

//EEEEE  SSSS TTTTT  AAA  DDDD   OOO
//E     S       T   A   A D   D O   O
//EEE    SSS    T   AAAAA D   D O   O
//E         S   T   A   A D   D O   O
//EEEEE SSSS    T   A   A DDDD   OOO

export class StateController {

    // GGGG EEEEE TTTTT
    //G     E       T
    //G  GG EEE     T
    //G   G E       T
    // GGGG EEEEE   T

    public getState(request: Request, response: Response): void {
        StateModel.find(request.params.id, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }

    public getStates(request: Request, response: Response): void {
        //Filtros.
        /*
        * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment
        * 
        * La asignación por 3 puntos (...filters) toma el resto de los parámetros query del request, es decir,
        * TODO lo que no sea "limit" o "page".
        */
        let { limit, page, ...filters } = request.query;
        //Se eliminan todas las llaves cuyo valor sea exactamente "undefined".
        // console.log('[SERVICIOS][DIRECCIONES][getStates] Fitros (antes): ', filters);
        Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
        //Para poder implementar expresiones regulares a filtros específicos.
        //https://docs.mongodb.com/manual/reference/operator/query/regex/
        let regExFilters: Array<string> = ['name'];
        Object.keys(filters).forEach(key => {
            if(regExFilters.indexOf(key) >= 0) {
                filters[key] = { $regex: filters[key], $options: 'i' };
            }
        });
        //Filtros de tipo fecha.
        //NOTA: El formato de la fecha (de tipo [string]) debe ser el siguiente:
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
                    let startDate = new Date(filters[key]);
                    let endDate = new Date(filters[key]);
                    //Se agrega un día a la finca final.
                    endDate.setDate(endDate.getDate() + 1);
                    filters[key] = { $gte: startDate, $lt: endDate };
                } catch(e) {

                }
            }
        });
        // console.log('[SERVICIOS][DIRECCIONES][getStates] Fitros (después): ', filters);
        //Paginación.
        //NOTA: Todos los parámetros obtenidos desde el query son devueltos como tipo "string", por eso la conversión.
        limit = parseInt(limit) || parseInt(configuration.filters.limit);
        page = parseInt(page) || parseInt(configuration.filters.page);
        const skip: number = limit * (page - 1);
        //Consulta.
        //Product.find({ name: { $regex: 'sorv', $options: 'i'}})
        StateModel.find(filters, null, { /*limit, skip,*/ sort: { name: 1 } })
        .populate([{ path: 'country', select: '_id name' }])
        .exec((error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
        // StateModel.find(filters, null, { limit, skip, sort: { name: 1 } }, (error: any, data: any) => {
        //     if(error){
        //         response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
        //     } else {
        //         response.status(200).end(JSON.stringify(data));
        //     }
        // });
    }

    //PPPP   OOO   SSSS TTTTT
    //P   P O   O S       T
    //PPPP  O   O  SSS    T
    //P     O   O     S   T
    //P      OOO  SSSS    T

    public postState(request: Request, response: Response): void {
        let newStateModel = new StateModel(request.body);
        newStateModel.save((error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }

    public postInitializeStates(request: Request, response: Response): void {
        //1. Se elimina toda la información.
        StateModel.collection.drop((error: any) => {
            if(error && error.code != 26){
                console.log('[CONTROLADORES][CÓDIGOS POSTALES][postInitializeStates][DROP] Error: ', error);
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                // response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
                console.log('[CONTROLADORES][CÓDIGOS POSTALES][postInitializeStates] La colección de eliminó con éxito.');
                //2. Se inserta la nueva información.
                const statesJSON = require('../info/states.json');
                let states: Array<any> = [];
                statesJSON.forEach((state: any, index: number) => {
                    states.push({
                        _id: (index + 1),
                        name: state.name,
                        country: state.country
                    });
                });
                StateModel.insertMany(states, (error: any, data: any) => {
                    if(error){
                        response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
                    } else {
                        response.status(200).end(JSON.stringify(data));
                    }
                });
            }
        });
    }
    
    //PPPP  U   U TTTTT
    //P   P U   U   T
    //PPPP  U   U   T
    //P     U   U   T
    //P      UUU    T

    public putState(request: Request, response: Response): void {
        StateModel.findOneAndUpdate({ _id: request.body._id }, request.body, { new: true }, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
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

    public deleteState(request: Request, response: Response): void {
        StateModel.findOneAndDelete({ _id: request.query._id }, (error: any, data: any) => {
            //NOTA: Si la función "findOneAndDelete" de verdad encontró el registro, este se devuelve en "data".
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con el identificador proporcionado.' }));
            } else {
                response.status(200).end(JSON.stringify({ message: 'Registro eliminado con éxito.' }));
            }
        });
    }

    //DDDD  RRRR   OOO  PPPP
    //D   D R   R O   O P   P
    //D   D RRRR  O   O PPPP
    //D   D R   R O   O P
    //DDDD  R   R  OOO  P
    
    public dropStates(request: Request, response: Response): void {
        StateModel.collection.drop((error: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
            }
        });
    }
}

//M   M U   U N   N IIIII  CCCC IIIII PPPP  IIIII  OOO
//MM MM U   U NN  N   I   C       I   P   P   I   O   O
//M M M U   U N N N   I   C       I   PPPP    I   O   O
//M   M U   U N  NN   I   C       I   P       I   O   O
//M   M  UUU  N   N IIIII  CCCC IIIII P     IIIII  OOO

export class TownController {

    // GGGG EEEEE TTTTT
    //G     E       T
    //G  GG EEE     T
    //G   G E       T
    // GGGG EEEEE   T

    public getTown(request: Request, response: Response): void {
        TownModel.find(request.params.id, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }

    public getTowns(request: Request, response: Response): void {
        //Filtros.
        /*
        * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment
        * 
        * La asignación por 3 puntos (...filters) toma el resto de los parámetros query del request, es decir,
        * TODO lo que no sea "limit" o "page".
        */
        let { limit, page, ...filters } = request.query;
        //Se eliminan todas las llaves cuyo valor sea exactamente "undefined".
        // console.log('[SERVICIOS][DIRECCIONES][getTowns] Fitros (antes): ', filters);
        Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
        //Para poder implementar expresiones regulares a filtros específicos.
        //https://docs.mongodb.com/manual/reference/operator/query/regex/
        let regExFilters: Array<string> = ['name'];
        Object.keys(filters).forEach(key => {
            if(regExFilters.indexOf(key) >= 0) {
                filters[key] = { $regex: filters[key], $options: 'i' };
            }
        });
        //Filtros de tipo fecha.
        //NOTA: El formato de la fecha (de tipo [string]) debe ser el siguiente:
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
                    let startDate = new Date(filters[key]);
                    let endDate = new Date(filters[key]);
                    //Se agrega un día a la finca final.
                    endDate.setDate(endDate.getDate() + 1);
                    filters[key] = { $gte: startDate, $lt: endDate };
                } catch(e) {

                }
            }
        });
        // console.log('[SERVICIOS][DIRECCIONES][getTowns] Fitros (después): ', filters);
        //Paginación.
        //NOTA: Todos los parámetros obtenidos desde el query son devueltos como tipo "string", por eso la conversión.
        limit = parseInt(limit) || parseInt(configuration.filters.limit);
        page = parseInt(page) || parseInt(configuration.filters.page);
        const skip: number = limit * (page - 1);
        //Consulta.
        //Product.find({ name: { $regex: 'sorv', $options: 'i'}})
        TownModel.find(filters, null, { /*limit, skip,*/ sort: { name: 1 } })
        .populate([{ path: 'country', select: '_id name' }, { path: 'state', select: '_id name' }])
        .exec((error: any, data: any) => {
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

    public postTown(request: Request, response: Response): void {
        let newTownModel = new TownModel(request.body);
        newTownModel.save((error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }

    public postInitializeTowns(request: Request, response: Response): void {
        //1. Se elimina toda la información.
        TownModel.collection.drop((error: any) => {
            if(error && error.code != 26){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                // response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
                console.log('[CONTROLADORES][CÓDIGOS POSTALES][postInitializeTowns] La colección de eliminó con éxito.');
                //2. Se inserta la nueva información.
                const townsJSON = require('../info/towns.json');
                let towns: Array<any> = [];
                townsJSON.forEach((town: any, index: number) => {
                    towns.push({
                        _id: (index + 1), //town.id,
                        name: town.name,
                        country: town.country,
                        state: town.state
                    });
                });
                TownModel.insertMany(towns, (error: any, data: any) => {
                    if(error){
                        response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
                    } else {
                        response.status(200).end(JSON.stringify(data));
                    }
                });
            }
        });
    }
    
    //PPPP  U   U TTTTT
    //P   P U   U   T
    //PPPP  U   U   T
    //P     U   U   T
    //P      UUU    T

    public putTown(request: Request, response: Response): void {
        TownModel.findOneAndUpdate({ _id: request.body._id }, request.body, { new: true }, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
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

    public deleteTown(request: Request, response: Response): void {
        TownModel.findOneAndDelete({ _id: request.query._id }, (error: any, data: any) => {
            //NOTA: Si la función "findOneAndDelete" de verdad encontró el registro, este se devuelve en "data".
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con el identificador proporcionado.' }));
            } else {
                response.status(200).end(JSON.stringify({ message: 'Registro eliminado con éxito.' }));
            }
        });
    }

    //DDDD  RRRR   OOO  PPPP
    //D   D R   R O   O P   P
    //D   D RRRR  O   O PPPP
    //D   D R   R O   O P
    //DDDD  R   R  OOO  P
    
    public dropTowns(request: Request, response: Response): void {
        TownModel.collection.drop((error: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
            }
        });
    }
}

// CCCC  OOO  DDDD  IIIII  GGGG  OOO       PPPP   OOO   SSSS TTTTT  AAA  L
//C     O   O D   D   I   G     O   O      P   P O   O S       T   A   A L
//C     O   O D   D   I   G  GG O   O      PPPP  O   O  SSS    T   AAAAA L
//C     O   O D   D   I   G   G O   O      P     O   O     S   T   A   A L
// CCCC  OOO  DDDD  IIIII  GGGG  OOO       P      OOO  SSSS    T   A   A LLLLL

export class ZipCodeController {

    // GGGG EEEEE TTTTT
    //G     E       T
    //G  GG EEE     T
    //G   G E       T
    // GGGG EEEEE   T

    public getZipCode(request: Request, response: Response): void {
        ZipCodeModel.find(request.params.id, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }

    public getZipCodes(request: Request, response: Response): void {
        //Filtros.
        /*
        * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment
        * 
        * La asignación por 3 puntos (...filters) toma el resto de los parámetros query del request, es decir,
        * TODO lo que no sea "limit" o "page".
        */
        let { limit, page, ...filters } = request.query;
        //Se eliminan todas las llaves cuyo valor sea exactamente "undefined".
        // console.log('[SERVICIOS][DIRECCIONES][getZipCodes] Fitros (antes): ', filters);
        Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
        //Para poder implementar expresiones regulares a filtros específicos.
        //https://docs.mongodb.com/manual/reference/operator/query/regex/
        let regExFilters: Array<string> = ['name'];
        Object.keys(filters).forEach(key => {
            if(regExFilters.indexOf(key) >= 0) {
                filters[key] = { $regex: filters[key], $options: 'i' };
            }
        });
        //Filtros de tipo fecha.
        //NOTA: El formato de la fecha (de tipo [string]) debe ser el siguiente:
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
                    let startDate = new Date(filters[key]);
                    let endDate = new Date(filters[key]);
                    //Se agrega un día a la finca final.
                    endDate.setDate(endDate.getDate() + 1);
                    filters[key] = { $gte: startDate, $lt: endDate };
                } catch(e) {

                }
            }
        });
        // console.log('[SERVICIOS][DIRECCIONES][getZipCodes] Fitros (después): ', filters);
        //Paginación.
        //NOTA: Todos los parámetros obtenidos desde el query son devueltos como tipo "string", por eso la conversión.
        limit = parseInt(limit) || parseInt(configuration.filters.limit);
        page = parseInt(page) || parseInt(configuration.filters.page);
        const skip: number = limit * (page - 1);
        //Consulta.
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
        ZipCodeModel.find(filters, null, { /*limit, skip,*/ sort: { name: 1 } })
        .populate(populateQuery)
        .exec((error: any, data: any) => {
            if(error){
                console.log('[CONTROLADORES][CÓDIGOS POSTALES][getZipCodes] Error: ', error);
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con la información proporcionada.' }));
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

    public postZipCode(request: Request, response: Response): void {
        let newZipCodeModel = new ZipCodeModel(request.body);
        newZipCodeModel.save((error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }

    public postInitializeZipCodes(request: Request, response: Response): void {
        //1. Se elimina toda la información.
        ZipCodeModel.collection.drop((error: any) => {
            if(error && error.code != 26){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                // response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
                console.log('[CONTROLADORES][CÓDIGOS POSTALES][postInitializeZipCodes] La colección de eliminó con éxito.');
                //2. Se inserta la nueva información.
                const zipCodesJSON = require('../info/zipCodes.json');
                let zipCodes: Array<any> = [];
                zipCodesJSON.forEach((zipCode: any, index: number) => {
                    zipCodes.push({
                        // _id: (index + 1),
                        name: zipCode.name,
                        country: zipCode.country,
                        state: zipCode.state,
                        town: zipCode.town,
                        settlement: zipCode.settlement,
                        zipCode: zipCode.zipCode
                    });
                });
                console.log(`[CONTROLADORES][CÓDIGOS POSTALES][postInitializeZipCodes] Registros a insertar: ${zipCodes.length}`);
                ZipCodeModel.insertMany(zipCodes, (error: any, data: any) => {
                    if(error){
                        response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
                    } else {
                        // response.status(200).end(JSON.stringify(data));
                        response.status(200).end(JSON.stringify({
                            message: 'Información insertada con éxito.'
                        }));
                    }
                });
            }
        });
    }
    
    //PPPP  U   U TTTTT
    //P   P U   U   T
    //PPPP  U   U   T
    //P     U   U   T
    //P      UUU    T

    public putZipCode(request: Request, response: Response): void {
        ZipCodeModel.findOneAndUpdate({ _id: request.body._id }, request.body, { new: true }, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
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

    public deleteZipCode(request: Request, response: Response): void {
        ZipCodeModel.findOneAndDelete({ _id: request.query._id }, (error: any, data: any) => {
            //NOTA: Si la función "findOneAndDelete" de verdad encontró el registro, este se devuelve en "data".
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con el identificador proporcionado.' }));
            } else {
                response.status(200).end(JSON.stringify({ message: 'Registro eliminado con éxito.' }));
            }
        });
    }

    //DDDD  RRRR   OOO  PPPP
    //D   D R   R O   O P   P
    //D   D RRRR  O   O PPPP
    //D   D R   R O   O P
    //DDDD  R   R  OOO  P
    
    public dropZipCodes(request: Request, response: Response): void {
        ZipCodeModel.collection.drop((error: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
            }
        });
    }
}

// AAA   SSSS EEEEE N   N TTTTT  AAA  M   M IIIII EEEEE N   N TTTTT  OOO
//A   A S     E     NN  N   T   A   A MM MM   I   E     NN  N   T   O   O
//AAAAA  SSS  EEE   N N N   T   AAAAA M M M   I   EEE   N N N   T   O   O
//A   A     S E     N  NN   T   A   A M   M   I   E     N  NN   T   O   O
//A   A SSSS  EEEEE N   N   T   A   A M   M IIIII EEEEE N   N   T    OOO

export class SettlementController {
    
    // GGGG EEEEE TTTTT
    //G     E       T
    //G  GG EEE     T
    //G   G E       T
    // GGGG EEEEE   T

    public getSettlement(request: Request, response: Response): void {
        SettlementModel.find(request.params.id, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }

    public getSettlements(request: Request, response: Response): void {
        //Filtros.
        /*
        * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment
        * 
        * La asignación por 3 puntos (...filters) toma el resto de los parámetros query del request, es decir,
        * TODO lo que no sea "limit" o "page".
        */
        let { limit, page, ...filters } = request.query;
        //Se eliminan todas las llaves cuyo valor sea exactamente "undefined".
        // console.log('[SERVICIOS][DIRECCIONES][getSettlements] Fitros (antes): ', filters);
        Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
        //Para poder implementar expresiones regulares a filtros específicos.
        //https://docs.mongodb.com/manual/reference/operator/query/regex/
        let regExFilters: Array<string> = ['name'];
        Object.keys(filters).forEach(key => {
            if(regExFilters.indexOf(key) >= 0) {
                filters[key] = { $regex: filters[key], $options: 'i' };
            }
        });
        //Filtros de tipo fecha.
        //NOTA: El formato de la fecha (de tipo [string]) debe ser el siguiente:
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
                    let startDate = new Date(filters[key]);
                    let endDate = new Date(filters[key]);
                    //Se agrega un día a la finca final.
                    endDate.setDate(endDate.getDate() + 1);
                    filters[key] = { $gte: startDate, $lt: endDate };
                } catch(e) {

                }
            }
        });
        // console.log('[SERVICIOS][DIRECCIONES][getSettlements] Fitros (después): ', filters);
        //Paginación.
        //NOTA: Todos los parámetros obtenidos desde el query son devueltos como tipo "string", por eso la conversión.
        limit = parseInt(limit) || parseInt(configuration.filters.limit);
        page = parseInt(page) || parseInt(configuration.filters.page);
        const skip: number = limit * (page - 1);
        //Consulta.
        //Product.find({ name: { $regex: 'sorv', $options: 'i'}})
        SettlementModel.find(filters, null, { /*limit, skip,*/ sort: { name: 1 } }, (error: any, data: any) => {
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

    public postSettlement(request: Request, response: Response): void {
        let newSettlementModel = new SettlementModel(request.body);
        newSettlementModel.save((error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify(data));
            }
        });
    }
    
    public postInitializeSettlements(request: Request, response: Response): void {
        //1. Se elimina toda la información.
        SettlementModel.collection.drop((error: any) => {
            if(error && error.code != 26){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                // response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
                console.log('[CONTROLADORES][CÓDIGOS POSTALES][postInitializeSettlements] La colección de eliminó con éxito.');
                //2. Se inserta la nueva información.
                const settlementsJSON = require('../info/settlements.json');
                let settlements: Array<any> = [];
                settlementsJSON.forEach((settlement: any, index: number) => {
                    settlements.push({
                        _id: settlement.id,
                        name: settlement.name
                    });
                });
                SettlementModel.insertMany(settlements, (error: any, data: any) => {
                    if(error){
                        response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
                    } else {
                        response.status(200).end(JSON.stringify(data));
                    }
                });
            }
        });
    }
    
    //PPPP  U   U TTTTT
    //P   P U   U   T
    //PPPP  U   U   T
    //P     U   U   T
    //P      UUU    T

    public putSettlement(request: Request, response: Response): void {
        SettlementModel.findOneAndUpdate({ _id: request.body._id }, request.body, { new: true }, (error: any, data: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
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

    public deleteSettlement(request: Request, response: Response): void {
        SettlementModel.findOneAndDelete({ _id: request.query._id }, (error: any, data: any) => {
            //NOTA: Si la función "findOneAndDelete" de verdad encontró el registro, este se devuelve en "data".
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else if(!data) {
                response.status(404).end(JSON.stringify({ message: 'No se encontró ningún registro con el identificador proporcionado.' }));
            } else {
                response.status(200).end(JSON.stringify({ message: 'Registro eliminado con éxito.' }));
            }
        });
    }

    //DDDD  RRRR   OOO  PPPP
    //D   D R   R O   O P   P
    //D   D RRRR  O   O PPPP
    //D   D R   R O   O P
    //DDDD  R   R  OOO  P
    
    public dropSettlements(request: Request, response: Response): void {
        SettlementModel.collection.drop((error: any) => {
            if(error){
                response.status(400).end(JSON.stringify(RemodelMongoDBErrors(error)));
            } else {
                response.status(200).end(JSON.stringify({ message: 'La colección de eliminó con éxito.' }));
            }
        });
    }
}