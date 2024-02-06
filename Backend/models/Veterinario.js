import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import generarId from '../helpers/generarId.js';

//Crear el schema
const veterinarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:true,
        trim: true
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        trim:true
    },
    telefono:{
        type: String,
        default:null,
        trim: true
    },
    web:{
        type: String,
        default:null,
        trim: true
    },
    token:{
        type: String,
        default: generarId()
    },
    confirmado:{
        type: Boolean,
       default:false
    },
});
//Funcion que hashea el password antes de ser guardado en la bd
veterinarioSchema.pre('save',async function(next){
    //Valida si un password esta hasheado no lo vuelva a hashear, next es un mddlewhere
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    //El this.password ya va estar hasheado, y ya lo va almacenar en el campo password
    this.password = await bcrypt.hash(this.password,salt)
});

//Registra el modelo
const Veterinario = mongoose.model('Veterinario',veterinarioSchema);
export default Veterinario;
