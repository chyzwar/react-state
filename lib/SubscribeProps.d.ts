import React from "react";
import Container from "./Container";
import ContainerType from "./ContainerType";
interface SubscribeProps<Containers extends ContainerType[]> {
    to: Containers;
    children(...instances: Container[]): React.ReactNode;
}
export default SubscribeProps;
//# sourceMappingURL=SubscribeProps.d.ts.map