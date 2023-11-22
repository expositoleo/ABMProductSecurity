import { ProgressBar } from "react-bootstrap";


//Se especifica cuales son los props y el tipo de dato que el componente hijo puede recibir
type DangerBarProps = {
    value: number;
};

//El componente hijo tiene "argumentos" del tipo "DangerBarProps"
const DangerBar = ({value}:DangerBarProps) => {

    //Logica según el valor recibido del componente padre se mostrara un color diferente
    const getVariant = (value:number) => {
        if (value < 30) {
            return 'sucess';
        } else if (value < 60) {
            return 'warning';
        } else {
            return 'danger';
        }


    };
    
  return (
     <ProgressBar animated now={value} variant={getVariant(value)}/>
  )
}

export default DangerBar