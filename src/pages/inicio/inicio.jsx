
import Head from '../../components/head/head';
import Servicios from '../../components/servicios/servicios';
import Mision from '../../components/mision/mision';
import Vision from '../../components/vision/vision';
import Footer from '../../components/footer/footer';


function Inicio() {
    return (
        <div className="inicio-container">
            <Head />
            <Servicios />
            <Mision />
            <Vision />
            <Footer />
        </div>
    );
}

export default Inicio;