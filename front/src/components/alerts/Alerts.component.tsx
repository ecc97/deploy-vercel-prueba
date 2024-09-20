import Swal from "sweetalert2";

export const alertSuccess = (title: string, message: string) => {
    Swal.fire({
        title: title,
        text: message,
        icon: "success",
        confirmButtonText: "Aceptar",
    });
}