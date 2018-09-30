import React from "react";
import StateContext from "./StateContext";
import Container from "./Container";
import Listener from "./Listener";

interface SubscribeProps<Containers extends Container[]> {
  to: Containers;
  children(...instances: Containers): React.ReactNode;
}

export class Subscribe<Containers extends Container[]> extends React.PureComponent<SubscribeProps<Containers>> {
  private instances: Containers = [];
  private unmounted = false;

  private unsubscribe() {
    this.instances.forEach((container) => {
      container.unsubscribe(this.onUpdate);
    });
  }

  public componentDidUnmount() {
    this.unmounted = true;
    this.unsubscribe();
  }

  onUpdate: Listener = () => {
    return new Promise(resolve => {
      if (!this.unmounted) {
        this.setState(DUMMY_STATE, resolve);
      } else {
        resolve();
      }
    });
  };

  private createInstances(
    map: ContainerMapType | null,
    containers: ContainersType
  ): Array<ContainerType> {
    this.unsubscribe();

    if (map === null) {
      throw new Error(
        'You must wrap your <Subscribe> components with a <Provider>'
      );
    }

    let safeMap = map;
    let instances = containers.map(ContainerItem => {
      let instance;

      if (
        typeof ContainerItem === 'object' &&
        ContainerItem instanceof Container
      ) {
        instance = ContainerItem;
      } else {
        instance = safeMap.get(ContainerItem);

        if (!instance) {
          instance = new ContainerItem();
          safeMap.set(ContainerItem, instance);
        }
      }

      instance.unsubscribe(this.onUpdate);
      instance.subscribe(this.onUpdate);

      return instance;
    });

    this.instances = instances;
    return instances;
  }

  render() {
    return (
      <StateContext.Consumer>
        {(map) =>
          this.props.children.apply(
            null,
            this.createInstances(map, this.props.to),
          )
        }
      </StateContext.Consumer>
    );
  }
}

export default Subscribe;
