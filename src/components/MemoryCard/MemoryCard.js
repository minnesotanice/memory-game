import React from "react";
import "./MemoryCard.css";

const MemoryCard = props => (
      <img onClick={() => props.recordMemory(props.id)} className="jsClickTrack img-thumbnail mt-3 mb-3" alt={props.name} src={props.image} data-id={props.id} />

);

export default MemoryCard;
