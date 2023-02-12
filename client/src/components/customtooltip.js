import { Tooltip, OverlayTrigger } from "react-bootstrap";


const renderToolTip = (props) => (
  <Tooltip id={`tooltip-${props.tooltipId}`}>{props.text}</Tooltip>
);

export const CustomTooltip = (props) => {
  return (
    <OverlayTrigger placement={props.placement || "bottom"} overlay={renderToolTip(props)}>
      {props.children}
    </OverlayTrigger>
  );
};