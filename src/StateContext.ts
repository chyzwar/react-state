import React from "react";
import ContainerMap from "./ContainerMap";
import Nullable from "@hyper/generic-types/lib/Nullable";

const StateContext = React.createContext<Nullable<ContainerMap>>(null);

export default StateContext;
