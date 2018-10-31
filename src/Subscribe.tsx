import React from "react";
import Constructor from "@hyper/generic-types/lib/Constructor";
import StateContext from "./StateContext";
import Container from "./Container";
import SubscribeProps from "./SubscribeProps";

class Subscribe<Containers extends Array<Constructor<Container>>> extends React.PureComponent<SubscribeProps<Containers>>{
  /**
   * Use StateContext as context
   */
  public static contextType = StateContext;

  /**
   * Container instances that are subscribed
   */
  private instances: Container[] = [];

  /**
   * Unsubscrobe from all containers before unmount
   * Assume that handle update will not race with unmount.
   */
  public componentWillUnmount() {
    this.instances.forEach((container) => {
      container.unsubscribe(this.handleUpdate);
    });
  }

  /**
   * Force re-render if state changed in container.
   * Promise is needed to track if all subscribers updated.
   */
  private handleUpdate = () => new Promise((resolve) => {
    this.forceUpdate(resolve);
  })

  /**
   *
   */
  private createInstances(containers: Containers): Container[] {
    return this.instances = containers.map(
      (ContainerItem) => {
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
  public render() {
    return (
      this.props.children(...this.createInstances(this.props.to))
    );
  }
}

export default Subscribe;
