import Night1 from '../../assets/imgs/night1.jpg';
import Night2 from '../../assets/imgs/night2.jpg';
import Night3 from '../../assets/imgs/night3.jpg';
import Day1 from '../../assets/imgs/day1.jpg';
import Day2 from '../../assets/imgs/day2.jpg';
import Day3 from '../../assets/imgs/day3.jpg';

const weekDaysES = ["Domingo", "Lunes", "Martes",
  "Miércoles", "Jueves", "Viernes", "Sábado"];

const bgImagesNight = [Night1, Night2, Night3];
const bgImagesDay = [Day1, Day2, Day3];

const WeatherHeader = (props) => {
  let {
    cityName,
    icon,
    temp,
    description,
    pod
  } = props.weatherProps;

  const currDate = new Date();
  const currDay = weekDaysES[currDate.getDay()];
  const currHour = `${currDate.getHours()}:${currDate.getMinutes() < 10 ?
    `0${currDate.getMinutes()}` : `${currDate.getMinutes()}`}`;
  const bgImg = pod === 'd' ?
    bgImagesDay[Math.floor(Math.random() * bgImagesDay.length)] :
    bgImagesNight[Math.floor(Math.random() * bgImagesNight.length)];

  const colorHeadText = pod === 'd' ? "indigo-text text-darken-2" : "white-text";
  const colorBodyText = "white-text";
  return (
    <div className="col s12 deep-purple lighten-3"
      style={{
        borderRadius: '10px 10px 0px 0px',
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
      }}>
      <h3 className={`${colorHeadText} center-align`}><b>Clima Actual</b></h3>
      <h4 className={`${colorHeadText} center-align`}>({cityName})</h4>
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
          <h3 className={`${colorBodyText}`}><b>{temp}°C</b></h3>
          <h4 className={`${colorBodyText}`}>{currDay}, {currHour}</h4>
          <h6 className={`${colorBodyText}`}><strong>{description}</strong></h6>
        </div>
      </div>
    </div>
  );
};

export default WeatherHeader;