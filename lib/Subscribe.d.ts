import React from "react";
import ContainerType from "./ContainerType";
import SubscribeProps from "./SubscribeProps";
export declare class Subscribe<Containers extends ContainerType[]> extends React.PureComponent<SubscribeProps<Containers>> {
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