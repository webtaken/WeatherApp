const GeolocalizationForm = () => {
  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s8 offset-s2">
            <input
              placeholder="Busca un lugar, p.ej. Lima, Perú"
              id="place"
              type="text"
              className="validate" />
            <label htmlFor="place"></label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeolocalizationForm;