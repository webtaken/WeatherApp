const Recommendation = (props) => {
  if (props.left === true) {
    return <div className="row z-depth-2">
      <div className="col s12 m4" style={{ width: "200px", height: "150px" }}>
        {props.imgSrc}
      </div>
      <div className="col s12 m8">
        <h5>{props.description}</h5>
      </div>
    </div>;
  }

  return <div className="row z-depth-2">
    <div className="col s12 m8">
      <h5>{props.description}</h5>
    </div>
    <div className="col s12 m4" style={{ width: "200px", height: "150px" }}>
      {props.imgSrc}
    </div>
  </div>;
};

export default Recommendation;