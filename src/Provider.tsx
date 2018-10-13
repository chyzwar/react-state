import React from "react";
import StateContext from "./StateContext";
import ProviderProps from "./ProviderProps";
import ContainerMap from "./ContainerMap";

class Provider extends React.PureComponent<ProviderProps> {
  public render() {
    return (
      <StateContext.Consumer>
        {(parentMap) => {
          const childMap: ContainerMap = new Map(parentMap);

          if (this.props.inject) {
            this.props.inject.forEach((instance) => {
              childMap.set(instance.constructor, instance);
            });
          }

          return (
            <StateContext.Provider value={childMap}>
              {this.props.children}
            </StateContext.Provider>
          );
        }}
      </StateContext.Consumer>
    );
  }
}

export default Provider;
