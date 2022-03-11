import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let catalogs: Array<string> = ['service', 'client', 'provider', 'warehouse', 'account'];

const AddressSchema = new Schema({
    parentId: {
        // index: true,
        // unique: [true, 'El valor del campon `{PATH}` debe ser único.'],
        type: Schema.Types.String,
        required: [true, 'El valor del campo `{PATH}` es requerido.']
    },
    parentType: {
        // index: true,
        // unique: [true, 'El valor del campon `{PATH}` debe ser único.'],
        type: Schema.Types.String,
        enum: catalogs,
        required: [true, 'El valor del campo `{PATH}` es requerido.']
    },
    street: {
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.String,
        maxlength: [100, 'La longitud del campo {PATH} no debe ser mayor a 100 caracteres.']
    },
    outdoorNumber: {
        type: Schema.Types.String,
        maxlength: [20, 'La longitud del campo {PATH} no debe ser mayor a 20 caracteres.']
    },
    interiorNumber: {
        type: Schema.Types.String,
        maxlength: [20, 'La longitud del campo {PATH} no debe ser mayor a 20 caracteres.']
    },
    settlement: {
        type: Schema.Types.String,
        maxlength: [100, 'La longitud del campo {PATH} no debe ser mayor a 100 caracteres.']
    },
    location: {
        type: Schema.Types.String,
        maxlength: [100, 'La longitud del campo {PATH} no debe ser mayor a 100 caracteres.']
    },
    reference: {
        type: Schema.Types.String,
        maxlength: [255, 'La longitud del campo {PATH} no debe ser mayor a 255 caracteres.']
    },
    //NOTA: Los valores máximos para longitud y latitud son:
	//      https://en.wikipedia.org/wiki/Mercator_projection#Mathematics_of_the_Projection
	//      Longitud: entre -180 y 180.
	//      Latitud: entre -85 y 85.
    latitude: {
        type: Schema.Types.Number,
        min: [-85, 'El valor del campo `{PATH}` ({VALUE}) está por debajo del mínimo de ({MIN}).'],
        max: [85, 'El valor del campo `{PATH}` ({VALUE}) excede el máximo permitido de ({MAX}).'],
        required: [true, 'El valor del campo `{PATH}` es requerido.']
    },
    longitude: {
        type: Schema.Types.Number,
        min: [-180, 'El valor del campo `{PATH}` ({VALUE}) está por debajo del mínimo de ({MIN}).'],
        max: [180, 'El valor del campo `{PATH}` ({VALUE}) excede el máximo permitido de ({MAX}).'],
        required: [true, 'El valor del campo `{PATH}` es requerido.']
    },
    loc: {
        type: { type: Schema.Types.String },
        coordinates: [Schema.Types.Number],
        // default: function() {
        //     //@ts-ignore
        //     let latitude: Number = this.latitude;
        //     //@ts-ignore
        //     let longitude: Number = this.longitude;
        //     return {
        //         type: 'point',
        //         coordinates: [longitude, latitude]
        //     };
        // }
    },
    zipCode: {
        type: Schema.Types.Number,
        min: [1000, 'El valor del campo `{PATH}` ({VALUE}) está por debajo del mínimo de ({MIN}).'],
        max: [99999, 'El valor del campo `{PATH}` ({VALUE}) excede el máximo permitido de ({MAX}).'],
        required: [true, 'El valor del campo `{PATH}` es requerido.']
    },
    extraDetails: {
        ref: 'ZipCode',
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.ObjectId
    },
    typeValue: {
        default: 'default',
        maxlength: [70, 'El campo no puede contener más de `{MAXLENGTH}` caracteres.'],
        required: [true, 'El campo es requerido.'],
        type: Schema.Types.String
    }
}, {
    timestamps: true
});

AddressSchema.index({ loc: '2dsphere' });
AddressSchema.virtual('type', {
    ref: 'AddressType',
    localField: 'typeValue',
    foreignField: 'value',
    justOne: true
});
const AddressModel = mongoose.model('Address', AddressSchema, 'Addresses');

// https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#example
/*
AddressModel.aggregate(
    [
        { "$geoNear": {
            "near": {
                "type": "Point",
                "coordinates": [<long>,<lat>]
            },
            "distanceField": "distance",
            "spherical": true,
            "maxDistance": 10000
        }}
    ],
    function(error: any,results: any) {

    }
)
*/

export default AddressModel;