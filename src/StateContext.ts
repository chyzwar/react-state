import React from "react";
import ContainerMap from "./ContainerMap";

const StateContext = React.createContext<ContainerMap>(new Map());

export default StateContext;
