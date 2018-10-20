import React from "react";
import Constr from "@hyper/generic-types/lib/Constructor";
import Container from "./Container";
import SubscribeProps from "./SubscribeProps";
declare class Subscribe<Containers extends Array<Constr<Container>>> extends React.PureComponent<SubscribeProps<Containers>> {
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