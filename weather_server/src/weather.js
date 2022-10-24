
const manageWeatherMetrics = (metrics) => {
  return {
    cityName: metrics.city_name,
    icon: metrics.weather.icon,
    temp: Math.round(metrics.temp),
    pod: metrics.pod,
    description: metrics.weather.description,
    pres: Math.round(metrics.pres),
    windSpd: metrics.wind_spd.toFixed(2),
    windCdirFull: metrics.wind_cdir_full,
    rh: metrics.rh,
    dewpt: metrics.dewpt.toFixed(2),
    clouds: metrics.clouds,
    vis: metrics.vis.toFixed(2),
    precip: metrics.precip.toFixed(2),
    uv: Math.round(metrics.uv)
  };
};

module.exports = manageWeatherMetrics;



