import React from "react";
import StateContext from "./StateContext";
class Provider extends React.PureComponent {
    render() {
        return (React.createElement(StateContext.Consumer, null, (parentMap) => {
            const childMap = new Map(parentMap);
            if (this.props.inject) {
                this.props.inject.forEach((instance) => {
                    childMap.set(instance.constructor, instance);
                });
            }
            return (React.createElement(StateContext.Provider, { value: childMap }, this.props.children));
        }));
    }
}
export default Provider;
