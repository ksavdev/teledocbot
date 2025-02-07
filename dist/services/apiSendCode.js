import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;
const API_SEND_CODE = process.env.API_SEND_CODE;
const apiUrl = `${API_BASE_URL}/${API_SEND_CODE}`;
export async function sendCode(userPhone) {
    const data = {
        phone: userPhone
    };
    try {
        console.log(`Отправка POST-запроса ${data.phone}, по URL: ${apiUrl}`);
        const response = await axios.post(apiUrl, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('Ответ от сервера:', response.data);
        return response.data;
    }
    catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const statusCode = error.response.status;
                switch (statusCode) {
                    case 403:
                        message = 'Ошибка, попробуйте еще раз';
                        console.error('Ошибка 403', error.message);
                        break;
                    case 404:
                        message = 'Ошибка, попробуйте еще раз';
                        console.error('Ошибка 404', error.message);
                        break;
                    case 500:
                        message = 'Внутренняя ошибка сервера. Повторите позже.';
                        console.error('Ошибка 500: Внутренняя ошибка сервера.', error.message);
                        break;
                    case 400:
                        message = 'Ошибка, попробуйте еще раз';
                        console.error('Ошибка 400', error.message);
                        break;
                    default:
                        message = `Ошибка ${statusCode}: ${error.response.data}`;
                        break;
                }
            }
            else if (error.request) {
                message = `Запрос не был отправлен: ${error.request}`;
            }
            else {
                message = `Ошибка настройки запроса: ${error.message}`;
            }
        }
        else {
            message = 'Неизвестная ошибка';
        }
        return message;
    }
}
