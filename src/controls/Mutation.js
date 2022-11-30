export function mutationObs(observer, target) {
    const targetNode = document.querySelector(`${target}`);
    observer.observe(targetNode, {
        childList: true,
        subtree: true,
        characterDataOldValue: true
    });
}
