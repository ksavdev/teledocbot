import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_BASE_URL = process.env.API_BASE_URL;
const API_TG_AUTH = process.env.API_TG_AUTH;
const apiUrl = `${API_BASE_URL}/${API_TG_AUTH}`;
export async function checkRoleByPhone(userPhone) {
    const data = {
        userPhone: userPhone
    };
    try {
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
                        message = 'Доступ запрещен. Возможно, вы не доктор.';
                        console.error('Ошибка 403: Доступ запрещен. Пользователь не доктор.');
                        break;
                    case 404:
                        message = 'Ошибка 404: Страница не найдена.';
                        break;
                    case 500:
                        message = 'Внутренняя ошибка сервера. Повторите позже.';
                        console.error('Ошибка 500: Внутренняя ошибка сервера.');
                        break;
                    case 400:
                        message = 'Неверный запрос. Проверьте данные.';
                        console.error('Ошибка 400: Пользователь не найден');
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
