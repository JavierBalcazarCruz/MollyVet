import nodemailer from "nodemailer";

//Credenciales del email
const emailRegistro = async (datos) =>{
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const {email, nombre, token } = datos;
      
      //Enviar Email
      const info = await transport.sendMail({
        from: "MollyVet - Administrador de pacientes veteriaria",
        to: email,
        subject: `Confirma tu cuenta en Mollyvet`,
        text: 'Confirma tu cuenta ',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en MollyVet</p>
        <p>Tú cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: <a href ="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`
      });
      console.log("****************mensaje enviado:%s", info.messageId);
};



export default emailRegistro;
