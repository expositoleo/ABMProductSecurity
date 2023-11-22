import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import DangerBar from '../DangerBar/DangerBar';



const DangerInput = () => {

    //Variable que va a guardar el valor elegido por el usuario
    const [value, setValue] = useState(0);

    //Se va actualizar el valor elegido por el usuario cada vez que se cambie
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue (Number(event.target.value));
    }

  return (
    <div className="m-3 w-50">
        
        <h2> Ejemplo 1 </h2>

        {/* Componente padre */}
        <Form.Range value={value} onChange={handleChange}/>

        {/* Componente hijo */}
        <DangerBar value={value}/>

    </div>
    
    )
}

export default DangerInput