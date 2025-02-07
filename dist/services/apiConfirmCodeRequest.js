import axios from 'axios';
async function confirmCodeRequest(url, code, phone) {
    const data = {
        code: code,
        phone: phone
    };
    try {
        const response = await axios.post(url, data, { timeout: 15000 });
        console.log(`Отправляем JSON ${data.code}, ${data.phone} по адресу ${url}`);
        console.log('Server response:', response.data);
        return { success: true, message: 'Код подтвержден' };
    }
    catch (error) {
        let message = '';
        // Проверяем, является ли ошибка экземпляром AxiosError
        if (axios.isAxiosError(error)) {
            console.error('Server error response:', error.response?.data);
            switch (error.response?.status) {
                case 400:
                    message = 'Неверный код';
                    break;
                default:
                    message = `Ошибка отправки запроса: ${error.message}`;
            }
        }
        else {
            // Обработка неизвестной ошибки
            console.error('Unknown error:', error);
            message = `Ошибка отправки запроса: ${error.message}`;
        }
        return { success: false, message };
    }
}
export { confirmCodeRequest };
