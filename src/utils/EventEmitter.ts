const EventPrefix = "TuvalEvents";

export default class EventEmitter {
  static Emit<T = unknown>(name: string, payload?: T): void {
    const event = new CustomEvent(`${EventPrefix}.${name}`, {
      detail: payload,
    });

    window.dispatchEvent(event);
  }

  static On(name: string, callback: (payload: unknown) => void): void {
    window.addEventListener(`${EventPrefix}.${name}`, ((
      payload: CustomEvent
    ) => {
      callback(payload.detail);
    }) as EventListener);
  }

  static RemoveListener(
    name: string,
    callback: (payload: unknown) => void
  ): void {
    window.removeEventListener(`${EventPrefix}.${name}`, callback);
  }
}
