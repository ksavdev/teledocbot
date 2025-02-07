import axios from 'axios';
async function sendPhoneRequest(url, userPhone) {
    const data = {
        userPhone: userPhone
    };
    try {
        const response = await axios.post(url, data, { timeout: 15000 });
        console.log('Server response:', response.data);
        return { success: true, message: 'Вы успешно авторизовались' };
    }
    catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            switch (error.response?.status) {
                case 400:
                    message = 'Вы не являетесь доктором';
                    console.log(error.response?.status);
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
                    message = `Ошибка отправки запроса: ${error.message}`;
            }
        }
        else {
            message = `Ошибка отправки запроса: ${error.message}`;
        }
        return { success: false, message };
    }
}
export { sendPhoneRequest };
