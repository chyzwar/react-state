import React from "react";
import StateContext from "./StateContext";
export class Subscribe extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.instances = [];
    }
    /**
     * Unsubscrobe from all containers before unmount
     */
    componentWillUnmount() {
        this.instances.forEach((container) => {
            container.unsubscribe(this.handleUpdate);
        });
    }
    /**
     * Forece re-render if state change in container
     */
    handleUpdate() {
        return new Promise((resolve) => {
            this.forceUpdate(resolve);
        });
    }
    createInstances(map, containers) {
        if (map.size === 0) {
            throw new Error("You must wrap your <Subscribe> components with a <Provider>");
        }
        this.instances = containers.map((ContainerItem) => {
            let instance = map.get(ContainerItem);
            if (instance === undefined) {
                instance = new ContainerItem();
                map.set(ContainerItem, instance);
            }
            instance.subscribe(this.handleUpdate);
            return instance;
        });
        return this.instances;
    }
    render() {
        return (React.createElement(StateContext.Consumer, null, (map) => this.props.children(...this.createInstances(map, this.props.to))));
    }
}
export default Subscribe;
