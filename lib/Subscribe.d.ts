import React from "react";
import Constructor from "@hyper/generic-types/lib/Constructor";
import Container from "./Container";
import SubscribeProps from "./SubscribeProps";
declare class Subscribe<Containers extends Array<Constructor<Container>>> extends React.PureComponent<SubscribeProps<Containers>> {
    static contextType: React.Context<Map<import("@hyper/generic-types/lib/Class").default<Container<{}>>, Container<{}>>>;
    /**
     * Container instances that are subscribed
     */
    private instances;
    /**
     * Unsubscrobe from all containers before unmount
     * Assume that handle update will not race with unmount.
     */
    componentWillUnmount(): void;
    /**
     * Force re-render if state changed in container.
     * Promise is needed to track if all subscribers updated.
     */
    private handleUpdate;
    /**
     *
     */
    private createInstances;
    /**
     * Use render as props function to re-render on state update
     */
    render(): React.ReactNode;
}
export default Subscribe;
//# sourceMappingURL=Subscribe.d.ts.map