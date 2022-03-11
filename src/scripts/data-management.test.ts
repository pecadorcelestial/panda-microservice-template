import { parseCookies, RemodelMongoDBErrors } from './data-management';

describe('Función [parseCookies]', () => {
    test('Debe parsear correctamente un arreglo de cookies.', () => {
        let parsedCookies = parseCookies('yummy_cookie=choco;tasty_cookie=strawberry');
        let expectedValue = {
            yummy_cookie: 'choco',
            tasty_cookie: 'strawberry'
        }
        expect(expectedValue).toEqual(parsedCookies);
    });
    test('Debe devolver [undefined] al enviar una cadena vacia.', () => {
        expect(parseCookies('')).toBe(undefined);
    });
});

describe('Función [RemodelMongoDBErrors]', () => {
    let mongooseErrors = {
        errors: {
            parentId: {
                message: 'El valor del campo `parentId` es requerido.',
                name: 'ValidatorError',
                properties: {
                    message: 'El valor del campo `parentId` es requerido.',
                    type: 'required',
                    path: 'parentId'
                },
                king: 'required',
                path: 'parentId'
            },
            latitude: {
                message: 'El valor del campo `latitude` (200.614145) excede el máximo permitido de (85).',
                name: 'ValidatorError',
                properties: {
                    message: 'El valor del campo `latitude` (200.614145) excede el máximo permitido de (85).',
                    type: 'max',
                    max: 85,
                    path: 'latitude',
                    value: 200.614145
                },
                king: 'max',
                path: 'latitude',
                value: 200.614145
            },
            longitude: {
                message: 'El valor del campo `longitude` (-1000.3878499) está por debajo del mínimo de (-180).',
                name: 'ValidatorError',
                properties: {
                    message: 'El valor del campo `longitude` (-1000.3878499) está por debajo del mínimo de (-180).',
                    type: 'min',
                    min: -180,
                    path: 'longitude',
                    value: -1000.3878499
                },
                king: 'min',
                path: 'longitude',
                value: -1000.3878499
            }
        },
        _message: 'Address validation failed',
        message: 'Address validation failed: parentId: El valor del campo `parentId` es requerido., latitude: El valor del campo `latitude` (200.614145) excede el máximo permitido de (85)., longitude: El valor del campo `longitude` (-1000.3878499) está por debajo del mínimo de (-180).',
        name: 'ValidationError'
    };
    let expectedMongooseErrors: any = {
        errors: [
            {
                property: 'parentId',
                message: 'El valor del campo `parentId` es requerido.'
            },
            {
                property: 'latitude',
                message: 'El valor del campo `latitude` (200.614145) excede el máximo permitido de (85).'
            },
            {
                property: 'longitude',
                message: 'El valor del campo `longitude` (-1000.3878499) está por debajo del mínimo de (-180).'
            }
        ]
    };
    test('Debe remodelar correctamente los errores devueltos por [mongoose].', () => {
        expect(RemodelMongoDBErrors(mongooseErrors)).toEqual(expectedMongooseErrors);
    });
    let mongoDBErrors = {
        driver: true,
        name: "MongoError",
        index: 0,
        code: 11000,
        errmsg: "E11000 duplicate key error collection: addressesDB.Addresses index: parentId_1 dup key: { : ObjectId('5c6f2856f002554ab4b07fd5') }"
    };
    let expectedMongoDBErrors = {
        errors: [
            {
                code: 11000,
                message: "E11000 duplicate key error collection: addressesDB.Addresses index: parentId_1 dup key: { : ObjectId('5c6f2856f002554ab4b07fd5') }"
            }
        ]
    };
    test('Debe remodelar correctamente los errores devueltos por [mongoDB].', () => {
        expect(RemodelMongoDBErrors(mongoDBErrors)).toEqual(expectedMongoDBErrors);
    });
    let error = {
        property: 'parentId',
        message: 'El valor del campo `parentId` es requerido.'
    };
    test('Debería devolver los errores en un arreglo al no ser devueltos por [mongoose].', () => {
        expect(RemodelMongoDBErrors(error)).toEqual({ errors: [{ errors: error }]});
    });
});