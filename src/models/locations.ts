import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

//Paises.
const CountrySchema = new Schema({
    _id: {
        index: true,
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    },
    name: {
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.String
    }
}, {
    autoIndex: false,
    timestamps: true
});
export const CountryModel = mongoose.model('Country', CountrySchema, 'Countries');

//Estados.
const StateSchema = new Schema({
    _id: {
        index: true,
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    },
    name: {
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.String
    },
    country: {
        ref: 'Country',
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    }
}, {
    autoIndex: false,
    timestamps: true
});
export const StateModel = mongoose.model('State', StateSchema, 'States');

//Municipios.
const TownSchema = new Schema({
    _id: {
        index: true,
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    },
    name: {
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.String
    },
    country: {
        ref: 'Country',
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    },
    state: {
        ref: 'State',
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    }
}, {
    autoIndex: false,
    timestamps: true
});
// TownSchema.index({ country: 1, state: 1, id: 1 });
export const TownModel = mongoose.model('Town', TownSchema, 'Towns');

//Tipos de asentamientos.
const SettlementSchema = new Schema({
    _id: {
        index: true,
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    },
    name: {
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.String
    }
}, {
    autoIndex: false,
    timestamps: true
});
export const SettlementModel = mongoose.model('Settlement', SettlementSchema, 'Settlements');

//Códigos postales.
const ZipCodeSchema = new Schema({
    // _id: {
    //     index: true,
    //     required: [true, 'El valor del campo `{PATH}` es requerido.'],
    //     type: Schema.Types.Number
    // },
    name: {
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.String
    },
    country: {
        ref: 'Country',
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    },
    state: {
        ref: 'State',
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    },
    town: {
        ref: 'Town',
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    },
    settlement: {
        ref: 'Settlement',
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        type: Schema.Types.Number
    },
    zipCode: {
        required: [true, 'El valor del campo `{PATH}` es requerido.'],
        min: [1000, 'El valor del campo `{PATH}` ({VALUE}) está por debajo del mínimo de ({MIN}).'],
        max: [99999, 'El valor del campo `{PATH}` ({VALUE}) excede el máximo permitido de ({MAX}).'],
        type: Schema.Types.Number
    }
}, {
    //autoIndex: false,
    timestamps: true
});
export const ZipCodeModel = mongoose.model('ZipCode', ZipCodeSchema, 'ZipCodes');