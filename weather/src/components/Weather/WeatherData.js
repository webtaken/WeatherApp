import { useEffect } from 'react';
import M from 'materialize-css';

const weatherMetricMetadata = {
  "pres": {
    tooltipInfo: "Presión que ejerce la atmósfera sobre la superficie de la tierra",
    text: "Presión (mb)",
    magnitude: "mb"
  },
  "windSpd": {
    tooltipInfo: "Velocidad del viento horizontalmente y su dirección en puntos cardinales",
    text: "Viento (m/s)",
    magnitude: "m/s"
  },
  "rh": {
    tooltipInfo: "La relación entre cantidad de vapor de agua contenida en el aire y la máxima cantidad que el aire es capaz de contener a esa temperatura",
    text: "Humedad Relativa (%)",
    magnitude: "%"
  },
  "dewpt": {
    tooltipInfo: "Temperatura a la cual se debe enfriar el aire para que el vapor de agua se condense en rocío o escarcha",
    text: "Punto de rocío (°C)",
    magnitude: "°C"
  },
  "clouds": {
    tooltipInfo: "Fracción de cielo cubierto por todas las nubes visibles",
    text: "Cobertura nubosa (%)",
    magnitude: "%"
  },
  "vis": {
    tooltipInfo: "Distancia horizontal máxima a la que un observador puede distinguir claramente algunos objetos de referencia en el horizonte.",
    text: "Visibilidad (Km)",
    magnitude: "Km"
  },
  "precip": {
    tooltipInfo: "La tasa de agua por unidad de tiempo, generalmente medida en milímetros por hora",
    text: "Precipitación (mm/hr)",
    magnitude: "mm/hr"
  },
  "uv": {
    tooltipInfo: "Es un indicador de la intensidad de radiación ultravioleta proveniente del Sol en la superficie terrestre en una escala que comienza en 0 y no está acotado superiormente",
    text: "Índice UV (0-11+)"
  },
};

const handleWeatherMetric = (keyMetric, valueMetric) => {
  let metricId = keyMetric;
  let metricVal = <p className='white-text center-align'>
    {`${valueMetric} ${weatherMetricMetadata[keyMetric].magnitude || ""}`}
  </p>;
  let tooltipInfo = weatherMetricMetadata[keyMetric].tooltipInfo;
  let metricText = weatherMetricMetadata[keyMetric].text;

  return <div className="col s3"
    key={metricId}>
    <p className="white-text">
      <i className="material-icons left tooltipped"
        data-position="top"
        data-tooltip={tooltipInfo}>info</i>
      {metricText}</p>
    {metricVal}
  </div>;
};

const WeatherData = (props) => {
  const weatherMetrics = Object.entries(props.metrics).map((metric) => {
    const [keyMetric, valueMetric] = metric;
    return handleWeatherMetric(keyMetric, valueMetric);
  });

  useEffect(() => {
    let elems = document.querySelectorAll('.tooltipped');
    // inicializando los tooltips
    M.Tooltip.init(elems, {
      exitDelay: 0,
      enterDelay: 200,
    });
  }, []);
  return (
    <div className={`col s12 ${props.pod === 'd' ? 'green accent-4' : 'deep-purple accent'}`}
      style={{ borderRadius: '0px 0px 10px 10px' }}
    >
      <div className="row">
        {weatherMetrics}
      </div>
    </div >
  );
};

export default WeatherData;