const GeolocalizationForm = (props) => {
  let helperMsg, classNameHelper;
  if (props.validPlace === undefined) {
    helperMsg = classNameHelper = '';
  }
  else if (props.validPlace) {
    helperMsg = 'Datos correctos.';
    classNameHelper = 'green-text';
  } else {
    helperMsg = 'El nombre no puede estar vacío.';
    classNameHelper = 'red-text';
  }

  return (
    <div className="row">
      <form className="col s12" onSubmit={props.onSearch}>
        <div className="row">
          <div className="input-field col s7 offset-s2">
            <input
              placeholder="Busca un lugar, p.ej. Lima, Perú"
              id="place"
              type="text"
              className="validate"
              onChange={props.onChangePlaceName} />
            <label htmlFor="place"></label>
            <span
              className={`helper-text ${classNameHelper}`}>
              {helperMsg}</span>
          </div>
          <div className="input-field col s1">
            <button
              className="btn waves-effect waves-light"
            >
              <i className="material-icons center">search</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeolocalizationForm;