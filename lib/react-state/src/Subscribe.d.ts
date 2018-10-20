import React from "react";
import Container from "./Container";
import SubscribeProps from "./SubscribeProps";
import Class from "@hyper/generic-types/lib/Class";
declare type ContainerTypes = Array<Class<Container>>;
export declare class Subscribe<Containers extends ContainerTypes> extends React.PureComponent<SubscribeProps<Containers>> {
    private instances;
    /**
     * Unsubscrobe from all containers before unmount
     */
    componentWillUnmount(): void;
    /**
     * Forece re-render if state change in container
     */
    private handleUpdate;
    private createInstances;
    render(): JSX.Element;
}
export default Subscribe;
//# sourceMappingURL=Subscribe.d.ts.map