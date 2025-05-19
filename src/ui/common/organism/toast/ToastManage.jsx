import { createRoot } from "react-dom/client";
import Toast from "./Toast";

export class ToastManager {
    constructor() {
        const body = document.getElementsByTagName("body")[0];
        const toastContainer = document.createElement("div");
        toastContainer.id = "toast-container-main";
        body.insertAdjacentElement("beforeend", toastContainer);
        this.containerRef = toastContainer;
        this.toasts = [];
        this.root = createRoot(this.containerRef); // Initialize the root for concurrent mode
    }

    show(options) {
        const toastId = Math.random().toString(36).substring(2, 9);
        const toast = {
            id: toastId,
            ...options, // if id is passed within options, it will overwrite the auto-generated one
            destroy: () => this.destroy(options.id ?? toastId),
        };
        this.toasts = [toast, ...this.toasts];
        this.render();
    }

    destroy(id) {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
        this.render();
    }

    render() {
        const toastsList = this.toasts.map((toastProps) => (
            <Toast key={toastProps.id} {...toastProps} />
        ));
        this.root.render(toastsList);
    }
}

export const toast = new ToastManager();
