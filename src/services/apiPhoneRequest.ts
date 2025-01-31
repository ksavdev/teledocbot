import axios from 'axios';

interface PhoneRequestResult {
    success: boolean;
    message: string;
}

async function sendPhoneRequest(url: string, userPhone: string): Promise<PhoneRequestResult> {
    const data = {
        phone: userPhone
    };

    try {
        
        const response = await axios.post(url, data, { timeout: 15000 });
        console.log('Server response:', response.data);
        return { success: true, message: 'Вы успешно авторизовались' };

    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            switch (error.response?.status) {
                case 400:
                    message = 'Неверный формат номера телефона';
                    console.log(error.response?.status)
                    break;
                case 404:
                    message = 'Пользователь не найден';
                    break;
                case 403:
                    message = 'Ошибка авторизации, нет доступа';
                    break;
                case 500:
                    message = 'Сервер перегружен, попробуйте позже';
                    break;
                default:
                    message = `Ошибка отправки запроса: ${(error as Error).message}`;
            }
        } else {
            message = `Ошибка отправки запроса: ${(error as Error).message}`;
        }
        return { success: false, message };
    }
}

export { sendPhoneRequest, PhoneRequestResult };
