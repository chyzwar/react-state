import React from "react";
import Constructor from "@hyper/generic-types/lib/Constructor";
import StateContext from "./StateContext";
import Container from "./Container";
import SubscribeProps from "./SubscribeProps";
import ContainerMap from "./ContainerMap";

class Subscribe<Containers extends Array<Constructor<Container>>> extends React.PureComponent<SubscribeProps<Containers>>{

  private instances: Container[] = [];

  /**
   * Unsubscrobe from all containers before unmount
   */
  public componentWillUnmount() {
    this.instances.forEach((container) => {
      container.unsubscribe(this.handleUpdate);
    });
  }

  /**
   * Forece re-render if state change in container
   */
  private handleUpdate() {
    return new Promise((resolve) => {
        this.forceUpdate(resolve);
    });
  }

  private createInstances(map: ContainerMap, containers: Containers): Container[] {
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

  public render() {
    return (
      <StateContext.Consumer>
        {(map: ContainerMap) => this.props.children(...this.createInstances(map, this.props.to))}
      </StateContext.Consumer>
    );
  }
}

export default Subscribe;
