import type { PropsWithChildren } from "react";
import type EventEmitter from "../../utils/EventEmitter";

export interface MediatorContextValue {
  eventEmitter: EventEmitter;
}

export type MediatorContextProviderProps = PropsWithChildren;
