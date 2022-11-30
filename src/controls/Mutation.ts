export function mutationObs (observer, target: string): void {
    const targetNode: Node = document.querySelector(`${target}`);

    observer.observe(targetNode, {
        childList: true,
        subtree: true,
        characterDataOldValue: true
    });
}