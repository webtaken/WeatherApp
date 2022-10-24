import TempWarm from "../../assets/imgs/recommendations/temperature/caluroso.svg";
import TempNormal from "../../assets/imgs/recommendations/temperature/normal.svg";
import TempCold from "../../assets/imgs/recommendations/temperature/frio.svg";
import UvNormal from "../../assets/imgs/recommendations/uvIndex/normal.svg";
import UvMedium from "../../assets/imgs/recommendations/uvIndex/medio.svg";
import UvHigh from "../../assets/imgs/recommendations/uvIndex/alto.svg";
import VisNiebla from "../../assets/imgs/recommendations/vis/niebla.svg";
import VisNeblina from "../../assets/imgs/recommendations/vis/neblina_calima.svg";
import VisLowVis from "../../assets/imgs/recommendations/vis/poca_visibilidad.svg";
import VisGoodVis from "../../assets/imgs/recommendations/vis/buena_visibilidad.svg";
import HumedadRocio from "../../assets/imgs/recommendations/humidity/dew.svg";
import HumedadSeco from "../../assets/imgs/recommendations/humidity/dry.svg";
import HumedadNormal from "../../assets/imgs/recommendations/humidity/normal.svg";

import Recommendation from "./Recommendation";
import { useEffect, useRef, useState } from "react";
import "materialize-css/extras/noUiSlider/nouislider.css";
import nouislider from "materialize-css/extras/noUiSlider/nouislider.js"

/*consideraré las siguientes métricas
temp
uv index
windspd
vis
rh, dewpt (combinación de ambos)
clouds,precip (combinación de ambos)
*/

const tempRecommendations = (temp) => {
  let imgSrc, description;
  if (temp <= 14) {
    imgSrc = <img src={TempCold} alt="frío" />;
    description = "Se ve que está muy frío 🥶 afuera, será mejor que uses una bufanda 🧣 o abrigo 🧥 antes de salir.";
  } else if (temp > 14 && temp <= 24) {
    imgSrc = <img src={TempNormal} alt="templado" />;
    description = "Afuera todo está templado 😁, puedes disfrutar de una caminata placentera.";
  } else {
    imgSrc = <img src={TempWarm} alt="muy caluroso" />;
    description = "El clima está que arde 🥵, ve por algo refrescante 🥃🥤.";
  }
  return {
    imgSrc: imgSrc,
    description: description
  }
};

const uvRecommendations = (uv) => {
  let imgSrc, description;
  if (uv <= 4) {
    // índice moderado
    imgSrc = <img src={UvNormal} alt="uv normal" />;
    description = "😎 El índice UV es normal por tu zona, está bien si usas unas gafas de sol o un sombrero ligero 👒.";
  } else if (uv > 4 && uv <= 8) {
    imgSrc = <img src={UvMedium} alt="uv medio" />;
    description = "✔ El índice UV está a niveles medios por tu zona, utiliza sombrero y prendas que te cubran, protector solar, permanece en lugares con sombra y cuida a tus bebés 👶.";
  } else {
    imgSrc = <img src={UvHigh} alt="uv elevado" />;
    description = "❗ El índice UV está a niveles altos por tu zona, utiliza sombrero y prendas que te cubran, protector solar, permanece en interiores y cuida a los niños 👦👧.";
  }
  return {
    imgSrc: imgSrc,
    description: description
  }
};

const visRecommendations = (vis) => {
  let imgSrc, description;
  if (vis <= 1.0) {
    // niebla extremada poca visibilidad
    imgSrc = <img src={VisNiebla} alt="niebla" />;
    description = "⚠ Extremadamente poca visibilidad por tu zona, cuidado al conducir 🚘.";
  } else if (vis > 1.0 && vis <= 4.0) {
    imgSrc = <img src={VisNeblina} alt="neblina o calima" />;
    description = "🌁 Tu zona experimenta una neblina o calima, escasa visibilidad ten cuidado al conducir.";
  } else if (vis > 4.0 && vis <= 10.0) {
    imgSrc = <img src={VisLowVis} alt="visibilidad moderada" />;
    description = "Visibilidad moderada por tu zona, neblina o calima débil.";
  } else {
    imgSrc = <img src={VisGoodVis} alt="buena visibilidad" />;
    description = "Visibilidad buena por tu zona, conduce tranquilamente por la carretera 🚗.";
  }
  return {
    imgSrc: imgSrc,
    description: description
  };
};

const humidityRecommendations = (rh, dewpt) => {
  let imgSrc, description;
  if (rh >= 80) {
    imgSrc = <img src={HumedadRocio} alt="rocío" />
    description = `Estás cerca del punto de rocío ${dewpt}°C 💦 cuidate de la humedad excesiva`;
  } else if (rh <= 20) {
    imgSrc = <img src={HumedadSeco} alt="aire seco" />
    description = "El aire está muy seco ⌛";
  } else {
    imgSrc = <img src={HumedadNormal} alt="humedad normal" />
    description = "El aire no está ni húmedo ni seco 🍃.";
  }
  return {
    imgSrc: imgSrc,
    description: description
  };
};


const windSpeedRecommendations = (windSpd) => {
  let beaufortNumber = 0, description, clues;
  let mphWindSpd = Math.round(windSpd * 2.23694);
  if (mphWindSpd < 1) {
    beaufortNumber = 0;
    description = "Calmado";
    clues = "Viento en calma. El humo se eleva verticalmente con poca o ninguna deriva."
  } else if (mphWindSpd >= 1 && mphWindSpd <= 3) {
    beaufortNumber = 1;
    description = "Aire ligero";
    clues = "Poco o ningún movimiento con banderas. El viento apenas mueve las hojas de los árboles."
  } else if (mphWindSpd >= 4 && mphWindSpd <= 7) {
    beaufortNumber = 2;
    description = "Brisa ligera";
    clues = "Se siente viento en la cara. Las hojas susurran y las ramitas se mueven. Las paletas de viento ordinarias se mueven."
  } else if (mphWindSpd >= 8 && mphWindSpd <= 12) {
    beaufortNumber = 3;
    description = "Brisa suave";
    clues = "Hojas y pequeñas ramitas en constante movimiento. El viento levanta hojas secas del suelo. Las banderas se extienden."
  } else if (mphWindSpd >= 13 && mphWindSpd <= 18) {
    beaufortNumber = 4;
    description = "Brisa moderada";
    clues = "El viento mueve pequeñas ramas. El viento levanta polvo y papeles sueltos del suelo y los arrastra."
  } else if (mphWindSpd >= 19 && mphWindSpd <= 24) {
    beaufortNumber = 5;
    description = "Brisa fresca";
    clues = "Grandes ramas y pequeños árboles con hojas comienzan a balancearse. Las ondas crestadas se forman en lagos interiores y ríos grandes."
  } else if (mphWindSpd >= 25 && mphWindSpd <= 31) {
    beaufortNumber = 6;
    description = "Brisa fuerte";
    clues = "Grandes ramas en continuo movimiento. Silbidos que se escuchan en líneas eléctricas y telefónicas aéreas o cercanas. Paraguas usados con dificultad."
  } else if (mphWindSpd >= 32 && mphWindSpd <= 38) {
    beaufortNumber = 7;
    description = "Cerca de vendaval";
    clues = "Árboles enteros en movimiento. Incomodidad que se siente al caminar contra el viento."
  } else if (mphWindSpd >= 39 && mphWindSpd <= 46) {
    beaufortNumber = 8;
    description = "Vendaval";
    clues = "El viento rompe ramitas y ramas pequeñas. El viento generalmente impide caminar."
  } else if (mphWindSpd >= 47 && mphWindSpd <= 54) {
    beaufortNumber = 9;
    description = "Vendaval fuerte";
    clues = "Ocurren daños estructurales, tales como cubiertas de chimeneas, tejas voladas y antenas de televisión dañadas. El suelo está lleno de muchas ramitas pequeñas y ramas rotas."
  } else if (mphWindSpd >= 55 && mphWindSpd <= 63) {
    beaufortNumber = 10;
    description = "Vendaval entero";
    clues = "Se producen daños estructurales considerables, especialmente en los techos. Los árboles pequeños pueden ser derribados y arrancados de raíz."
  } else if (mphWindSpd >= 64 && mphWindSpd <= 75) {
    beaufortNumber = 11;
    description = "Fuerza de tormenta";
    clues = "Se produce un daño generalizado. Árboles más grandes derribados y arrancados de raíz."
  } else {
    beaufortNumber = 12;
    description = "Fuerza de huracán";
    clues = "Daño severo y extenso. Los techos se pueden despegar. Ventanas rotas. Arboles arrancados. vehículos y pequeñas casas móviles volcadas. Los automóviles en movimiento pueden ser empujados fuera de las carreteras."
  }

  return {
    beaufortNumber: beaufortNumber,
    description: description,
    clues: clues
  }
};

const WeatherRecommendations = (props) => {
  const windSpeedSlider = useRef();

  const tempAdvice = tempRecommendations(props.metrics.temp);
  const uvAdvice = uvRecommendations(props.metrics.uv);
  const visAdvice = visRecommendations(props.metrics.vis);
  const humidAdvice = humidityRecommendations(props.metrics.rh, props.metrics.dewpt);
  const [windSpdAdvice, setWindSpdAdvice] = useState(windSpeedRecommendations(props.metrics.windSpd));
  useEffect(() => {
    let windSlider = document.getElementById('wind-speed-slider');
    function destroyExistingSlider() {
      if (windSlider && windSlider.noUiSlider) {
        windSlider.noUiSlider.destroy();
      }
    }
    destroyExistingSlider();

    let newWindRecommendation = windSpeedRecommendations(props.metrics.windSpd);
    setWindSpdAdvice(newWindRecommendation);

    nouislider.create(windSpeedSlider.current, {
      start: [newWindRecommendation.beaufortNumber],
      step: 1,
      orientation: 'horizontal', // 'horizontal' or 'vertical'
      range: {
        'min': 0,
        'max': 12
      },
      tooltips: [true]
    })
  }, [props.metrics.windSpd]);


  return (
    <div className="col s12"
      style={{ borderRadius: '10px 10px 10px 10px' }}>
      <Recommendation
        left={true}
        imgSrc={tempAdvice.imgSrc}
        description={tempAdvice.description} />
      <Recommendation
        left={false}
        imgSrc={uvAdvice.imgSrc}
        description={uvAdvice.description} />
      <Recommendation
        left={true}
        imgSrc={visAdvice.imgSrc}
        description={visAdvice.description} />
      <Recommendation
        left={false}
        imgSrc={humidAdvice.imgSrc}
        description={humidAdvice.description} />

      {/* Aquí irá el componente para el wind speed que es ligeramente diferente */}
      <div className="row z-depth-2">
        <div className="col s12">
          <h5 className="center-align">{windSpdAdvice.description && windSpdAdvice.description}</h5>
        </div>
        <div className="col s12">
          <div id="wind-speed-slider" ref={windSpeedSlider}></div>
        </div>
        <div className="col s12">
          <h5>{windSpdAdvice.clues && windSpdAdvice.clues}</h5>
        </div>
      </div>
    </div>
  );
};

export default WeatherRecommendations;