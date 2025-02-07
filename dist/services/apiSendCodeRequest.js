import axios from 'axios';
async function sendCodeRequest(url, userPhone) {
    const data = {
        phone: userPhone
    };
    try {
        console.log(`Пробуем отправить POST с ${data.phone} по API url ${url}`);
        const response = await axios.post(url, data, { timeout: 15000 });
        console.log('Server response:', response.data);
        return { success: true, message: 'Код подтверждения отправлен в WhatsApp' };
    }
    catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            console.error('Server error response:', error.response?.data);
            switch (error.response?.status) {
                case 400:
                    message = 'Неверный формат номера телефона';
                    break;
                default:
                    message = `Ошибка отправки запроса: ${error.message}`;
            }
        }
        else {
            console.error('Unknown error:', error);
            message = `Ошибка отправки запроса: ${error.message}`;
        }
        return { success: false, message };
    }
}
export { sendCodeRequest };
