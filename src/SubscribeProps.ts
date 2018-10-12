import React from "react";
import Container from "./Container";
import ContainerType from "./ContainerType";

interface SubscribeProps {
  to: ContainerType[];
  children(...instances: Container[]): React.ReactNode;
}

export default SubscribeProps;
