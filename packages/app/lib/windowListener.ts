class WindowListener {
  onLeaving(cb: (e: BeforeUnloadEvent) => void) {
    addEventListener("beforeunload", cb);

    return () => {
      removeEventListener("beforeunload", cb);
    };
  }
}

export const windowListener = new WindowListener();
