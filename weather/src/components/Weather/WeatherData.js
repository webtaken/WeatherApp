import { useEffect } from 'react';
import M from 'materialize-css';

const weatherMetricMetadata = [{
  tooltipInfo: "Presión que ejerce la atmósfera sobre la superficie de la tierra",
  text: "Presión (mb)"
}, {
  tooltipInfo: "Velocidad del viento horizontalmente y su dirección en puntos cardinales",
  text: "Viento (m/s)"
}, {
  tooltipInfo: "La relación entre cantidad de vapor de agua contenida en el aire y la máxima cantidad que el aire es capaz de contener a esa temperatura",
  text: "Humedad Relativa (%)"
}, {
  tooltipInfo: "Temperatura a la cual se debe enfriar el aire para que el vapor de agua se condense en rocío o escarcha",
  text: "Punto de rocío (°C)"
}, {
  tooltipInfo: "Fracción de cielo cubierto por todas las nubes visibles",
  text: "Cobertura nubosa (%)"
}, {
  tooltipInfo: "Distancia horizontal máxima a la que un observador puede distinguir claramente algunos objetos de referencia en el horizonte.",
  text: "Visibilidad (Km)"
}, {
  tooltipInfo: "La tasa de agua por unidad de tiempo, generalmente medida en milímetros por hora",
  text: "Precipitación (mm/hr)"
}, {
  tooltipInfo: "Es un indicador de la intensidad de radiación ultravioleta proveniente del Sol en la superficie terrestre en una escala que comienza en 0 y no está acotado superiormente",
  text: "Índice UV (0-11+)"
},
];

const handleWeatherMetric = (metric, index) => {
  let metricId = metric.id;
  let metricVal = <p className='white-text'>{metric.value}</p>;
  let tooltipInfo = weatherMetricMetadata[index].tooltipInfo;
  let metricText = weatherMetricMetadata[index].text;

  return <div className="col s2"
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
  const weatherMetrics = props.metrics.map((metric, index) => {
    return handleWeatherMetric(metric, index);
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
    <div className="col s12 green"
      style={{ borderRadius: '0px 0px 10px 10px' }}
    >
      <div className="row">
        {weatherMetrics}
      </div>
    </div >
  );
};

export default WeatherData;