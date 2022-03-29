import ShowCity from "../Components/UploadData/ShowCity";
import Header from "../Components/Header/Header";
import cityImg from "../img/citypageimg.jpg";

const CityViewPage = () => {
    return (
        <div>
            <Header
                className="header"
                title="Ciudades"
                src={cityImg}
                alt="imagen del titulo"
                text="Busca y selecciona la ciudad de tus sueños"
            ></Header>
            <ShowCity />
        </div>
    );
};

export default CityViewPage;
