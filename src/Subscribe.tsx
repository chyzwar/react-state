import React from "react";
import StateContext from "./StateContext";
import ContainerType from "./ContainerType";
import Container from "./Container";

interface SubscribeProps {
  to: ContainerType[];
  children(...instances: Container[]): React.ReactNode;
}

type ContainerMap = Map<ContainerType, Container>;

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

    instance.unsubscribe(this.onUpdate);
    instance.subscribe(this.onUpdate);

    return instance;
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
