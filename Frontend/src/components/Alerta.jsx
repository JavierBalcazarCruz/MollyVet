const Alerta = ({ alerta }) => {
    let mensaje = alerta.msg;
    const msg = mensaje.split("bienvenido");
    console.log(msg);
    return (
        <div>
            <h3>{msg[0]}</h3>
            <br></br>
            <h4 className="titleConfirm2">{msg[1]}</h4>
        </div>
    )
};

export default Alerta;
