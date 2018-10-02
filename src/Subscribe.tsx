import React from "react";
import StateContext from "./StateContext";
import Container from "./Container";
import Listener from "./Listener";
import ContainerType from "./ContainerType";

interface SubscribeProps<Containers extends Container[]> {
  to: ContainerType[];
  children(...instances: Containers): React.ReactNode;
}

type ContainerMap = Map<ContainerType, Container>;

export class Subscribe<Containers extends ContainerType[]> extends React.PureComponent<SubscribeProps<Containers>> {
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

  private createInstances(map: ContainerMap, containers: ContainerType[]): Containers {
    if (map === null) {
      throw new Error("You must wrap your <Subscribe> components with a <Provider>");
    }

    this.unsubscribe();

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
