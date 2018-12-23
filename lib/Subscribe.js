import React from "react";
import StateContext from "./StateContext";
class Subscribe extends React.PureComponent {
    constructor() {
        super(...arguments);
        /**
         * Container instances that are subscribed
         */
        this.instances = [];
        /**
         * Force re-render if state changed in container.
         * Promise is needed to track if all subscribers updated.
         */
        this.handleUpdate = () => new Promise((resolve) => {
            this.forceUpdate(resolve);
        });
    }
    /**
     * Unsubscrobe from all containers before unmount
     * Assume that handle update will not race with unmount.
     */
    componentWillUnmount() {
        this.instances.forEach((container) => {
            container.unsubscribe(this.handleUpdate);
        });
    }
    /**
     *
     */
    createInstances(containers) {
        return this.instances = containers.map((ContainerItem) => {
            let instance = this.context.get(ContainerItem);
            if (instance === undefined) {
                instance = new ContainerItem();
                this.context.set(ContainerItem, instance);
            }
            instance.subscribe(this.handleUpdate);
            return instance;
        });
    }
    /**
     * Use render as props function to re-render on state update
     */
    render() {
        return (this.props.children(...this.createInstances(this.props.to)));
    }
}
/**
 * Use StateContext as context
 */
Subscribe.contextType = StateContext;
export default Subscribe;
