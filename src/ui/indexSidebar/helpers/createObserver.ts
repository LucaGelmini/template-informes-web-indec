function createObserver(
    target: HTMLElement,
    onVisible: CallableFunction,
    fallBack: CallableFunction
) {
    function callback(
        entries: Array<IntersectionObserverEntry>,
        observer: IntersectionObserver
    ) {
        entries.forEach((entry) =>
            entry.isIntersecting ? onVisible() : fallBack()
        );
    }
    const options = {
        root: null,
        threshold: 0.3,
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
}

export default createObserver;
