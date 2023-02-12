export function BankCard(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mt-3 " + bg + txt;
  }

  function width(){
    return {"width" : props.width ?  props.width : "25rem"};
  }

  return (
    <div className={classes()} style={ width()}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <div className="card-text">{props.text}</div>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}