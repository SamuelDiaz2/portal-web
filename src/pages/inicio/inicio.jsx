
import SlideImages from '../../components/slide/slide';
import Servicios from '../../components/servicios/servicios';
import Mision from '../../components/mision/mision';
import Vision from '../../components/vision/vision';


function Inicio() {
    return (
        <div className="inicio-container">
            <SlideImages />
            <Servicios />
            <Mision />
            <Vision />
        </div>
    );
}

export default Inicio;