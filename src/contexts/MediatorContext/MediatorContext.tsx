/** Dependencies */
import React, { createContext, useContext, useMemo } from "react";
import EventEmitter from "../../utils/EventEmitter";

/** Types */
import type {
  MediatorContextValue,
  MediatorContextProviderProps,
} from "./MediatorContext.types";

const mediatorContextValue: MediatorContextValue = {
  eventEmitter: new EventEmitter(),
};

const MediatorContext =
  createContext<MediatorContextValue>(mediatorContextValue);

function MediatorContextProvider(
  props: MediatorContextProviderProps,
): React.ReactElement {
  const { children } = props;

  const eventEmitter = new EventEmitter();

  const value = useMemo(
    () => ({
      eventEmitter,
    }),
    [],
  );

  return (
    <MediatorContext.Provider value={value}>
      {children}
    </MediatorContext.Provider>
  );
}

export function withMediatorContext<Props extends object>(
  WrappedComponent: React.ComponentType<Props>,
): React.ComponentType<Props> {
  const displayName =
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function MediatorWrapperComponent(props: Props): React.ReactElement {
    return (
      <MediatorContextProvider>
        <MediatorContext.Consumer>
          {(value) => <WrappedComponent {...props} {...value} />}
        </MediatorContext.Consumer>
      </MediatorContextProvider>
    );
  }

  MediatorWrapperComponent.displayName = `withTheme(${displayName})`;

  return MediatorWrapperComponent;
}

export function useMediatorContext(): MediatorContextValue {
  return useContext(MediatorContext);
}
