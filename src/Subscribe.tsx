import React from "react";
import Constructor from "@hyper/generic-types/lib/Constructor";
import Container from "./Container";
import SubscribeProps from "./SubscribeProps";
import ContainerMap from "./ContainerMap";
import StateContext from "./StateContext";

class Subscribe<Containers extends Constructor<Container>[]> extends React.PureComponent<SubscribeProps<Containers>> {
  /**
   * Container instances that are subscribed
   */
  private instances: Container[] = [];

  /**
   * Unsubscribe from all containers before unmount
   * Assume that handle update will not race with unmount.
   */
  public componentWillUnmount(): void {
    this.instances.forEach((container) => {
      container.unsubscribe(this.handleUpdate);
    });
  }

  /**
   * Force re-render if state changed in container.
   * Promise is needed to track if all subscribers updated.
   */
  private readonly handleUpdate = () => new Promise<void>((resolve) => {
    this.forceUpdate(resolve);
  });

  /**
   *
   */
  private createInstances(map: ContainerMap, containers: Containers): Container[] {
    return this.instances = containers.map(
      (ContainerItem) => {
        let instance = map.get(ContainerItem);

        if (!instance) {

          instance = new ContainerItem();
          map.set(ContainerItem, instance);
        }

        instance.subscribe(this.handleUpdate);

        return instance;
      });
  }

  /**
   * Use render as props function to re-render on state update
   */
  public render() {
    return (
      <StateContext.Consumer>
        {(map) => this.props.children(...this.createInstances(map, this.props.to))}
      </StateContext.Consumer>
    );
  }
}

export default Subscribe;
