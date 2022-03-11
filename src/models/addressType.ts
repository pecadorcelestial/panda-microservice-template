import * as mongoose from 'mongoose';

// Initialize `Schema` variable with mongoose Schema type.
const Schema = mongoose.Schema;

export const AddressTypeSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: [true, 'El campo es requerido.'],
        maxlength: [70, 'El campo no puede contener más de `{MAXLENGTH}` caracteres.']
    },
    value: {
        index: true,
        type: mongoose.Schema.Types.String,
        required: [true, 'El campo es requerido.'],
        maxlength: [70, 'El campo no puede contener más de `{MAXLENGTH}` caracteres.'],
        unique: true
    }
}, { 
    autoIndex: false,
    timestamps: true 
});
AddressTypeSchema.index({ value: 1 });
const AddressTypeModel = mongoose.model('AddressType', AddressTypeSchema, 'AddressTypes');
export default AddressTypeModel;