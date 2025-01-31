import axios from 'axios';

interface SendCodeRequestResult {
    success: boolean;
    message: string;
}

async function sendCodeRequest(url: string, userPhone: string): Promise<SendCodeRequestResult> {
    const data = {
        phone: userPhone
    };

    try {
        const response = await axios.post(url, data, { timeout: 15000 });
        console.log('Server response:', response.data);
        return { success: true, message: 'Код подтверждения отправлен в WhatsApp' };
    } catch (error: unknown) {
        let message = '';
        // Проверяем, является ли ошибка экземпляром AxiosError
        if (axios.isAxiosError(error)) {
            console.error('Server error response:', error.response?.data);
            switch (error.response?.status) {
                case 400:
                    message = 'Неверный формат номера телефона';
                    break;
                case 401:
                    message = 'Требуется аутентификация';
                    break;
                case 403:
                    message = 'Ошибка авторизации, нет доступа';
                    break;
                case 404:
                    message = 'Пользователь не найден';
                    break;
                case 500:
                    message = 'Сервер перегружен, попробуйте позже';
                    break;
                case 502:
                    message = 'Плохой шлюз';
                    break;
                case 503:
                    message = 'Сервис временно недоступен, попробуйте позже';
                    break;
                case 504:
                    message = 'Время ожидания шлюза истекло';
                    break;
                default:
                    message = `Ошибка отправки запроса: ${error.message}`;
            }
        } else {
            // Обработка неизвестной ошибки
            console.error('Unknown error:', error);
            message = `Ошибка отправки запроса: ${(error as Error).message}`;
        }
        return { success: false, message };
    }
}

export { sendCodeRequest, SendCodeRequestResult };