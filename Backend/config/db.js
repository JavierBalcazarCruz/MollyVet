import mongoosse from 'mongoose'

const conectarDB = async() =>{
    try {        
        const db =  await mongoosse.connect(process.env.MONGO_URI,{
          
        });
        //url y puerto
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1); //Nos va imprimir un mensaje de error
    }
}

export default conectarDB;