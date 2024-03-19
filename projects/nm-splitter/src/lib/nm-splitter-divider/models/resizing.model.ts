export interface Resizing {
    mousePos: number;
    isResizing: boolean;
    dividerIndex: number;
}

export function getEmpty() {
    return {
        mousePos: 0,
        isResizing: false,
        dividerIndex: 0,
    }
}