import React from "react";
import StateContext from "./StateContext";
import ContainerType from "./ContainerType";
import Container from "./Container";
import SubscribeProps from "./SubscribeProps";
import ContainerMap from "./ContainerMap";

export class Subscribe extends React.PureComponent<SubscribeProps> {
  private instances: Container[] = [];

  public componentWillUnmount() {
    this.instances.forEach((container) => {
      container.unsubscribe(this.handleUpdate);
    });
  }

  private handleUpdate() {
    return new Promise((resolve) => {
        this.forceUpdate(resolve);
    });
  }

  private createInstances(map: ContainerMap, containers: ContainerType[]): Container[] {
    if (map === null) {
      throw new Error("You must wrap your <Subscribe> components with a <Provider>");
    }

    this.unsubscribe();

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
