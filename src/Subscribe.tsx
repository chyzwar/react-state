import React from "react";
import StateContext from "./StateContext";
import Container from "./Container";
import SubscribeProps from "./SubscribeProps";
import ContainerMap from "./ContainerMap";
import Class from "@hyper/generic-types/lib/Class";

type ContainerTypes = Array<Class<Container>>>

export class Subscribe<Containers extends ContainerTypes> extends React.PureComponent<SubscribeProps<Containers>> {
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
    if (map.size === 0) {
      throw new Error("You must wrap your <Subscribe> components with a <Provider>");
    }

    this.instances = containers.map((ContainerItem: Class<Container>) => {
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
