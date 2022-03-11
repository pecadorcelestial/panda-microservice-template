//Librería para administración de MongoDB.
import mongoose from 'mongoose';
//Librería para la ejecución de peticiones HTTP.
import request from 'supertest';
//Funciones del servidor.
import app from '../app';
//Configuración de ambiente.
process.env.NODE_ENV = 'test';
//Archivo de configuración.
import configuration from '../configuration';

const clearDB = () => {
    for(let i in mongoose.connection.collections) {
        mongoose.connection.collections[i].drop(() => {});
    }
}

beforeAll(async (done: jest.DoneCallback) => {
    if(mongoose.connection.readyState === 0) {
        mongoose.connect(configuration.connection.url, { useCreateIndex: true, useNewUrlParser: true }, (error: any) => {
            if(error) throw error;
            clearDB();
            return done();
        });
    } else {
        clearDB();
        return done();
    }
});

afterAll((done: jest.DoneCallback) => {
    clearDB();
    mongoose.connection.close();
    return done();
});

describe('Pruebas básicas de las rutas (ÉXITO).', () => {
    
    let _id: string;

    /*test('Ruta raíz - GET /', async (done: jest.DoneCallback) => {
        const response = await request(app).get('/');
        /*
        text: '{"message":"GET"}',
        body: { message: 'GET' },
        */
        /*expect(response.status).toBe(200);
        expect(response.text).toContain('GET');
        expect(response.body.message).toBe('GET');
        done();
    });*/
    test('Debe crear una dirección correctamente - POST /address', async (done: jest.DoneCallback) => {
        let address = {
            parentId: "5c6f2856f002554ab4b07fd5",
            parentType: "client",
            street: "Nogal",
            outdoorNumber: "121",
            interiorNumber: "3er. Piso",
            settlement: "Arboledas",
            location: "",
            reference: "",
            latitude: 20.6165895,
            longitude: -100.3889093,
            loc: {
                type: "Point",
                coordinates: [-100.3889093, 20.6165895]
            },
            zipCode: 76140,
            extraDetails: "5c891f8d29e5e225f4d59bd5"
        };
        const response = await request(app).post('/address').send(address);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('parentId');
        expect(response.body.street).toBe('Nogal');
        expect(response.body).toHaveProperty('outdoorNumber');
        expect(response.body).toHaveProperty('interiorNumber');
        expect(response.body).toHaveProperty('settlement');
        expect(response.body).toHaveProperty('location');
        expect(response.body).toHaveProperty('reference');
        expect(response.body).toHaveProperty('latitude');
        expect(response.body).toHaveProperty('longitude');
        expect(response.body).toHaveProperty('zipCode');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
        //Se guarda el identificador para próximas pruebas.
        _id = response.body._id;
        done();
    });
    test('Debe buscar una direción específica - GET /address', async (done: jest.DoneCallback) => {
        const response = await request(app).get('/address').query({ _id });
        expect(response.status).toBe(200);
        done();
    });
    test('Debe buscar todas las direciones disponibles - GET /addresses', async (done: jest.DoneCallback) => {
        const response = await request(app).get('/addresses').query({ createdAt: new Date().toLocaleDateString(),settlement: 'Arboledas'/*, "zipCode.zipCode": 76140*/ });
        expect(response.status).toBe(200);
        // expect(response.body.results.length).toBe(1);
        done();
    });
    test('Debe crear una segunda dirección correctamente - POST /address', async (done: jest.DoneCallback) => {
        let address = {
            parentId: "5c6f2856f002554ab4b07fd5",
            parentType: "client",
            street: "Boulevard Bernardo Quintana",
            outdoorNumber: "4100",
            interiorNumber: "3er. Piso",
            settlement: "Alamos 3ra. Sección",
            location: "",
            reference: "",
            latitude: 20.614145,
            longitude: -100.3878499,
            loc: {
                type: "Point",
                coordinates: [-100.3878499, 20.614145]
            },
            zipCode: 76140,
            extraDetails: "5c891f8d29e5e225f4d59bd5"
        };
        const response = await request(app).post('/address').send(address);
        expect(response.status).toBe(200);
        done();
    });
    test('Debe buscar las direcciones cercanas a un punto - GET /addresses/byGeoNear', async (done: jest.DoneCallback) => {
        const response = await request(app).get('/addresses/byGeoNear?latitude=20.6165895&longitude=-100.3889093&maxDistance=1000');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        done();
    });
    test('Debe actualizar la información de una dirección correctamente - PUT /address', async (done: jest.DoneCallback) => {
        let newAddress = {
            _id,
            reference: 'Sobre la alberca de Aquarium.'
        };
        const response = await request(app).put('/address').send(newAddress);
        expect(response.status).toBe(200);
        expect(response.body.reference).toBe('Sobre la alberca de Aquarium.');
        done();
    });
    test('Debe eliminar una dirección correctamente - DELETE /address', async (done: jest.DoneCallback) => {
        const response = await request(app).delete(`/address?id=${_id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Registro eliminado con éxito.');
        done();
    });
});

describe('Pruebas básicas de las rutas (ERROR).', () => {
    test('NO debe crear una dirección - POST /address', async (done: jest.DoneCallback) => {
        //La petición debe tener información faltante o incorrecta.
        let address = {
            // parentId: "5c6f2856f002554ab4b07fd5",
            parentType: "client",
            street: "Nogal",
            outdoorNumber: "121",
            interiorNumber: "3er. Piso",
            settlement: "Arboledas",
            location: "",
            reference: "",
            latitude: 20.6165895,
            longitude: -100.3889093,
            loc: {
                type: "Point",
                coordinates: [-100.3889093, 20.6165895]
            },
            zipCode: 76140,
            extraDetails: "5c891f8d29e5e225f4d59bd5"
        };
        const response = await request(app).post('/address').send(address);
        expect(response.status).toBe(400);
        done();
    });
    test('NO debe actualizar la información de una dirección - PUT /address', async (done: jest.DoneCallback) => {
        //Se envía un valor incorrecto para el identificador del objeto.
        let newAddress = {
            _id: '100',
            reference: 'Sobre la alberca de Aquarium.'
        };
        const response = await request(app).put('/address').send(newAddress);
        expect(response.status).toBe(400);
        done();
    });
    test('NO debe eliminar una dirección - DELETE /address', async (done: jest.DoneCallback) => {
        //Se envía un valor incorrecto para el identificador del objeto.
        const response = await request(app).delete('/address').query({ street: 'sin nombre' });
        expect(response.status).toBe(404);
        done();
    })
});