const weekDaysES = ["Domingo", "Lunes", "Martes",
  "Miércoles", "Jueves", "Viernes", "Sábado"];

const WeatherHeader = (props) => {
  let {
    cityName,
    icon,
    temp,
    description
  } = props.weatherProps;

  const currDate = new Date();
  const currDay = weekDaysES[currDate.getDay()];
  const currHour = `${currDate.getHours()}:${currDate.getMinutes()}`;

  return (
    <div className="col s12 deep-purple lighten-3"
      style={{ borderRadius: '10px 10px 0px 0px' }}>
      <h3 className="white-text center-align">Clima Actual</h3>
      <h4 className="white-text center-align">({cityName})</h4>
      <div className="row">
        <div className="col s12 m6">
          <div className="container">
            <img
              src={`https://www.weatherbit.io/static/img/icons/${icon}.png`}
              alt="WeatherIcon"
              style={{
                width: "12em",
                height: "10em"
              }} />
          </div>
        </div>
        <div className="col s12 m6">
          <h3 className="white-text">{temp}°C</h3>
          <h4 className="white-text">{currDay}, {currHour}</h4>
          <h6 className="white-text"><strong>{description}</strong></h6>
        </div>
      </div>
    </div>
  );
};

export default WeatherHeader;