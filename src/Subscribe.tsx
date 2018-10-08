import React from "react";
import StateContext from "./StateContext";
import ContainerClass from "./ContainerClass";
import ContainerType from "./ContainerType";

interface SubscribeProps {
  to: ContainerType[];
  children(...instances: ContainerClass[]): React.ReactNode;
}

type ContainerMap = Map<ContainerType, ContainerClass>;

export class Subscribe extends React.PureComponent<SubscribeProps> {
  private instances: Container[] = [];
  private unmounted = false;

  private unsubscribe() {
    this.instances.forEach((container) => {
      container.unsubscribe(this.onUpdate);
    });
  }

  public componentDidUnmount() {
    this.unsubscribe();
  }

  private onUpdate() {
    return new Promise((resolve) => {
      if (this.unmounted === false) {
        this.forceUpdate(resolve);
      } else {
        resolve();
      }
    });
  }

  private createInstances(map: ContainerMap, containers: ContainerType[]): ContainerClass[] {
    if (map === null) {
      throw new Error("You must wrap your <Subscribe> components with a <Provider>");
    }

    this.unsubscribe();

    this.instances = containers.map((ContainerItem) => {
      const instance = map.get(ContainerItem);

      if (instance === undefined) {
        const instance = new ContainerItem();

        instance.unsubscribe(this.onUpdate);
        instance.subscribe(this.onUpdate);
      }
    });

    return this.instances;
  }

  public render() {
    return (
      <StateContext.Consumer>
        {(map) => this.props.children(...this.createInstances(map, this.props.to))}
      </StateContext.Consumer>
    );
  }
}

export default Subscribe;
