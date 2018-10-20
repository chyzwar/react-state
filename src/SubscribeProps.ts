import React from "react";
import Constructor from "@hyper/generic-types/lib/Constructor";
import Container from "./Container";

interface SubscribeProps<Containers extends Array<Constructor<Container>>> {
  to: Containers;
  children(...instances: Container[]): React.ReactNode;
}

export default SubscribeProps;
