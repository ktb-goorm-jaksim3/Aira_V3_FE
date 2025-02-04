// utils.js
import Swal from 'sweetalert2';

export const showAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: '확인',
  });
};